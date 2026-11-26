import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';
import { generateSimulatedTelemetry } from '@/lib/gps-simulator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if client requested simulator tick
    if (body.simulate) {
      const truck = (body.truckIdentifier === 'Truck 02') ? 'Truck 02' : 'Truck 01';
      const telemetry = await generateSimulatedTelemetry(truck);
      return successResponse(telemetry, `Simulated telemetry generated for ${truck}`);
    }

    // Ingest physical GPS hardware telemetry (AIS-140 / Traccar / GT06)
    let imei: string | undefined = body.imei || body.uniqueId;
    let latitude: number | undefined = body.latitude;
    let longitude: number | undefined = body.longitude;
    let speed: number | undefined = body.speed;
    let heading: number | undefined = body.heading || body.course;
    let accuracyMeters: number | undefined = body.accuracy;
    let batteryLevel: number | undefined = body.battery;
    let recordedAt = body.timestamp ? new Date(body.timestamp) : new Date();

    // Handle Traccar standard webhook format
    if (body.position && body.device) {
      imei = body.device.uniqueId;
      latitude = body.position.latitude;
      longitude = body.position.longitude;
      speed = body.position.speed ? body.position.speed * 1.852 : 0; // knots to km/h
      heading = body.position.course;
      accuracyMeters = body.position.accuracy;
      if (body.position.deviceTime) recordedAt = new Date(body.position.deviceTime);
    }

    if (!imei || latitude === undefined || longitude === undefined) {
      return errorResponse('Missing required telemetry fields: imei, latitude, longitude', 400);
    }

    // Lookup GPS Device by IMEI
    const gpsDevice = await prisma.gpsDevice.findUnique({
      where: { imei: String(imei) },
      include: {
        vehicle: {
          include: {
            tripAssignments: {
              where: { assignmentStatus: 'ACTIVE' },
              include: { trip: true, driver: true },
            },
          },
        },
      },
    });

    if (!gpsDevice) {
      return errorResponse(`Unregistered GPS Device with IMEI: ${imei}`, 404);
    }

    const vehicle = gpsDevice.vehicle;
    const activeAssignment = vehicle.tripAssignments[0];
    const tripId = activeAssignment?.tripId || null;
    const driverId = activeAssignment?.driverId || null;

    // Record telemetry point
    const record = await prisma.trackingLocation.create({
      data: {
        tripId,
        driverId,
        vehicleId: vehicle.id,
        gpsDeviceId: gpsDevice.id,
        latitude: parseFloat(String(latitude)),
        longitude: parseFloat(String(longitude)),
        accuracyMeters: accuracyMeters ? parseFloat(String(accuracyMeters)) : null,
        speed: speed !== undefined ? parseFloat(String(speed)) : null,
        heading: heading !== undefined ? parseFloat(String(heading)) : null,
        batteryLevel: batteryLevel ? parseFloat(String(batteryLevel)) : gpsDevice.batteryPercentage,
        source: 'PHYSICAL_GPS',
        isSimulated: false,
        recordedAt,
      },
    });

    // Update GPS Device state
    await prisma.gpsDevice.update({
      where: { id: gpsDevice.id },
      data: {
        lastCommunicationAt: new Date(),
        deviceStatus: 'ONLINE',
        batteryPercentage: batteryLevel || gpsDevice.batteryPercentage,
      },
    });

    return successResponse(record, 'Hardware telemetry ingested successfully', 201);
  } catch (err: any) {
    console.error('Error ingesting telemetry:', err);
    return errorResponse(err.message || 'Internal server error', 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tick = searchParams.get('tick') === 'true';
    const truck = searchParams.get('truck') as 'Truck 01' | 'Truck 02' | null;
    const tripId = searchParams.get('tripId') ? parseInt(searchParams.get('tripId')!) : null;

    if (tick) {
      const targetTruck = truck === 'Truck 02' ? 'Truck 02' : 'Truck 01';
      const simulated = await generateSimulatedTelemetry(targetTruck);
      return successResponse(simulated, `Telemetry tick executed for ${targetTruck}`);
    }

    // If tripId requested, return latest tracking location for that trip
    if (tripId) {
      const latest = await prisma.trackingLocation.findFirst({
        where: { tripId },
        orderBy: { recordedAt: 'desc' },
      });
      return successResponse(latest);
    }

    // Return current telemetry for all owned vehicles (Truck 01 & Truck 02)
    const vehicles = await prisma.vehicle.findMany({
      where: {
        truckIdentifier: { in: ['Truck 01', 'Truck 02'] },
      },
      include: {
        gpsDevice: true,
        tripAssignments: {
          where: { assignmentStatus: 'ACTIVE' },
          include: { trip: true, driver: { include: { user: true } } },
        },
      },
    });

    const fleetTelemetry = await Promise.all(
      vehicles.map(async (v) => {
        const latestPoint = await prisma.trackingLocation.findFirst({
          where: { vehicleId: v.id },
          orderBy: { recordedAt: 'desc' },
        });

        return {
          vehicleId: v.id,
          truckIdentifier: v.truckIdentifier,
          registrationNumber: v.registrationNumber,
          category: v.vehicleCategory,
          bodyType: v.bodyType,
          capacityKg: v.capacityKg,
          vehicleStatus: v.vehicleStatus,
          gpsDevice: v.gpsDevice,
          activeTrip: v.tripAssignments[0]?.trip || null,
          driver: v.tripAssignments[0]?.driver?.user?.fullName || null,
          latestLocation: latestPoint || null,
        };
      })
    );

    return successResponse(fleetTelemetry, 'Fleet telemetry fetched successfully');
  } catch (err: any) {
    console.error('Error fetching telemetry:', err);
    return errorResponse(err.message || 'Internal server error', 500);
  }
}
