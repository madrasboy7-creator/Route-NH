import { prisma } from './prisma';

export interface HighwayWaypoint {
  name: string;
  lat: number;
  lng: number;
  speedLimitKmH: number;
}

export const NH48_CORRIDOR: HighwayWaypoint[] = [
  { name: 'Chennai Central Port Hub', lat: 13.0827, lng: 80.2707, speedLimitKmH: 40 },
  { name: 'Sriperumbudur Industrial Hub', lat: 12.9675, lng: 79.9436, speedLimitKmH: 60 },
  { name: 'Kanchipuram Bypass', lat: 12.8342, lng: 79.7036, speedLimitKmH: 65 },
  { name: 'Vellore Golden Fort Toll Plaza', lat: 12.9165, lng: 79.1325, speedLimitKmH: 60 },
  { name: 'Ambur Leather Corridor', lat: 12.7904, lng: 78.7166, speedLimitKmH: 65 },
  { name: 'Krishnagiri Junction Toll', lat: 12.5266, lng: 78.2146, speedLimitKmH: 55 },
  { name: 'Hosur Industrial Border', lat: 12.7409, lng: 77.8253, speedLimitKmH: 50 },
  { name: 'Electronic City Tollway, Bengaluru', lat: 12.8452, lng: 77.6602, speedLimitKmH: 45 },
  { name: 'Nelamangala Logistics Hub, Bengaluru', lat: 13.0991, lng: 77.3831, speedLimitKmH: 60 },
  { name: 'Tumkur Highway Toll', lat: 13.3379, lng: 77.1010, speedLimitKmH: 65 },
  { name: 'Chitradurga Fort Viewpoint', lat: 14.2251, lng: 76.3980, speedLimitKmH: 65 },
  { name: 'Davanagere Bypass', lat: 14.4644, lng: 75.9218, speedLimitKmH: 65 },
  { name: 'Hubbali Logistics Junction', lat: 15.3647, lng: 75.1240, speedLimitKmH: 60 },
  { name: 'Belagavi National Highway Exit', lat: 15.8497, lng: 74.4977, speedLimitKmH: 60 },
  { name: 'Kolhapur Shiroli MIDC', lat: 16.7050, lng: 74.2433, speedLimitKmH: 55 },
  { name: 'Satara Ghat Section', lat: 17.6805, lng: 74.0183, speedLimitKmH: 45 },
  { name: 'Pune Pimpri Logistics Hub', lat: 18.6298, lng: 73.7997, speedLimitKmH: 50 },
  { name: 'Navi Mumbai Taloja MIDC', lat: 19.0330, lng: 73.0297, speedLimitKmH: 50 },
  { name: 'JNPT Port Container Terminal, Mumbai', lat: 18.9498, lng: 72.9515, speedLimitKmH: 40 },
];

export const NH44_CORRIDOR: HighwayWaypoint[] = [
  { name: 'Delhi Sanjay Gandhi Transport Nagar', lat: 28.7495, lng: 77.1422, speedLimitKmH: 40 },
  { name: 'Faridabad Industrial Bypass', lat: 28.4089, lng: 77.3178, speedLimitKmH: 55 },
  { name: 'Palwal Tollway', lat: 28.1487, lng: 77.3260, speedLimitKmH: 65 },
  { name: 'Mathura Refinery Highway', lat: 27.4924, lng: 77.6737, speedLimitKmH: 60 },
  { name: 'Agra Kuberpur Expressway Junction', lat: 27.1767, lng: 78.0081, speedLimitKmH: 55 },
  { name: 'Gwalior Bypass Toll', lat: 26.2183, lng: 78.1828, speedLimitKmH: 60 },
  { name: 'Jhansi North-South Crossway', lat: 25.4484, lng: 78.5685, speedLimitKmH: 60 },
  { name: 'Lalitpur Border Checkpost', lat: 24.6888, lng: 78.4144, speedLimitKmH: 65 },
  { name: 'Sagar Logistics Hub', lat: 23.8388, lng: 78.7378, speedLimitKmH: 65 },
  { name: 'Nagpur Zero Mile Logistic Center', lat: 21.1458, lng: 79.0882, speedLimitKmH: 55 },
  { name: 'Adilabad NH 44 Bypass', lat: 19.6641, lng: 78.5320, speedLimitKmH: 65 },
  { name: 'Nizamabad Highway Crossing', lat: 18.6725, lng: 78.0941, speedLimitKmH: 60 },
  { name: 'Hyderabad Outer Ring Road / Shamshabad', lat: 17.2403, lng: 78.4294, speedLimitKmH: 60 },
  { name: 'Kurnool Tungabhadra Bridge', lat: 15.8281, lng: 78.0373, speedLimitKmH: 60 },
  { name: 'Anantapur Highway Junction', lat: 14.6819, lng: 77.6006, speedLimitKmH: 65 },
  { name: 'Devanahalli Airport Logistics, Bengaluru', lat: 13.1986, lng: 77.7066, speedLimitKmH: 55 },
];

function calculateHeading(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const dLng = toRad(lng2 - lng1);
  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);

  const y = Math.sin(dLng) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLng);

  let brng = toDeg(Math.atan2(y, x));
  return (brng + 360) % 360;
}

/**
 * Simulates a continuous GPS tick along the designated Indian Highway Corridor.
 * If active trip is provided, binds the simulated point to the trip.
 */
export async function generateSimulatedTelemetry(truckIdentifier: 'Truck 01' | 'Truck 02') {
  const isTruck1 = truckIdentifier === 'Truck 01';
  const corridor = isTruck1 ? NH48_CORRIDOR : NH44_CORRIDOR;

  const vehicle = await prisma.vehicle.findFirst({
    where: { truckIdentifier },
    include: {
      gpsDevice: true,
      tripAssignments: {
        where: { assignmentStatus: 'ACTIVE' },
        include: { trip: true, driver: true },
      },
    },
  });

  if (!vehicle) {
    throw new Error(`Vehicle ${truckIdentifier} not found`);
  }

  // Find latest tracking location
  const latestLocation = await prisma.trackingLocation.findFirst({
    where: { vehicleId: vehicle.id },
    orderBy: { recordedAt: 'desc' },
  });

  let nextLat: number;
  let nextLng: number;
  let speed: number;
  let heading: number;

  const activeAssignment = vehicle.tripAssignments[0];
  const tripId = activeAssignment?.tripId || null;
  const driverId = activeAssignment?.driverId || null;

  if (!latestLocation) {
    // Start at initial waypoint
    const start = corridor[0];
    nextLat = start.lat;
    nextLng = start.lng;
    speed = 0;
    heading = 0;
  } else {
    // Find closest waypoint index
    let closestIdx = 0;
    let minDist = Infinity;
    corridor.forEach((wp, idx) => {
      const d = Math.hypot(wp.lat - latestLocation.latitude, wp.lng - latestLocation.longitude);
      if (d < minDist) {
        minDist = d;
        closestIdx = idx;
      }
    });

    const targetIdx = (closestIdx + 1) % corridor.length;
    const currentWp = corridor[closestIdx];
    const targetWp = corridor[targetIdx];

    // Step slightly towards target waypoint
    const stepRatio = 0.08 + Math.random() * 0.04;
    nextLat = latestLocation.latitude + (targetWp.lat - latestLocation.latitude) * stepRatio;
    nextLng = latestLocation.longitude + (targetWp.lng - latestLocation.longitude) * stepRatio;

    // Add tiny GPS sensor jitter (within ~5 meters)
    nextLat += (Math.random() - 0.5) * 0.0001;
    nextLng += (Math.random() - 0.5) * 0.0001;

    speed = targetWp.speedLimitKmH * (0.85 + Math.random() * 0.25);
    heading = calculateHeading(latestLocation.latitude, latestLocation.longitude, targetWp.lat, targetWp.lng);
  }

  // Save new simulated tracking point
  const recorded = await prisma.trackingLocation.create({
    data: {
      tripId,
      driverId,
      vehicleId: vehicle.id,
      gpsDeviceId: vehicle.gpsDevice?.id,
      latitude: parseFloat(nextLat.toFixed(6)),
      longitude: parseFloat(nextLng.toFixed(6)),
      accuracyMeters: 4.0 + Math.random() * 3.5,
      speed: parseFloat(speed.toFixed(1)),
      heading: parseFloat(heading.toFixed(1)),
      source: 'SIMULATOR',
      isSimulated: true,
      batteryLevel: vehicle.gpsDevice?.batteryPercentage || 98.0,
      recordedAt: new Date(),
    },
  });

  // Update GpsDevice status
  if (vehicle.gpsDevice) {
    await prisma.gpsDevice.update({
      where: { id: vehicle.gpsDevice.id },
      data: {
        lastCommunicationAt: new Date(),
        deviceStatus: 'ONLINE',
      },
    });
  }

  return recorded;
}
