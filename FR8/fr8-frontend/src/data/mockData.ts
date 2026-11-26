import { faker } from '@faker-js/faker';

// Use a fixed seed for consistent mock data across reloads
faker.seed(12345);

// ==========================================
// 1. Companies (50)
// ==========================================
export const companies = Array.from({ length: 50 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  industry: faker.helpers.arrayElement(["Manufacturing", "Retail", "Technology", "Agriculture", "Automotive"]),
  contactEmail: faker.internet.email(),
  phone: faker.phone.number(),
  address: `${faker.location.city()}, ${faker.location.stateAbbr()}`,
  rating: faker.number.float({ min: 3.5, max: 5.0, multipleOf: 0.1 }),
  joinedDate: faker.date.past({ years: 3 }).toISOString(),
}));

// ==========================================
// 2. Drivers (100)
// ==========================================
export const drivers = Array.from({ length: 100 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
  phone: faker.phone.number(),
  licenseNumber: faker.vehicle.vin(),
  rating: faker.number.float({ min: 4.0, max: 5.0, multipleOf: 0.1 }),
  completedTrips: faker.number.int({ min: 10, max: 500 }),
  onTimePercentage: faker.number.int({ min: 80, max: 100 }),
  status: faker.helpers.arrayElement(["Available", "In Transit", "Off Duty"]),
  joinedDate: faker.date.past({ years: 2 }).toISOString(),
}));

// ==========================================
// 3. Trucks / Vehicles (150)
// ==========================================
const truckTypes = ["Refrigerated", "Dry Van", "Flatbed", "Tanker", "Box Truck"];
export const trucks = Array.from({ length: 150 }).map(() => ({
  id: faker.string.uuid(),
  plateNumber: faker.vehicle.vrm(),
  make: faker.vehicle.manufacturer(),
  model: faker.vehicle.model(),
  type: faker.helpers.arrayElement(truckTypes),
  capacity: `${faker.number.int({ min: 10, max: 40 })} Tons`,
  location: `${faker.location.city()}, ${faker.location.stateAbbr()}`,
  status: faker.helpers.arrayElement(["Available", "In Transit", "Maintenance"]),
  assignedDriverId: faker.helpers.maybe(() => faker.helpers.arrayElement(drivers).id, { probability: 0.7 }) || null,
  lastService: faker.date.recent({ days: 120 }).toISOString(),
  insuranceExpiry: faker.date.future({ years: 1 }).toISOString(),
}));

// ==========================================
// 4. Shipments (500)
// ==========================================
const shipmentStatuses = ["Pending Assignment", "In Transit", "Delivered", "Delayed", "Cancelled"];
export const shipments = Array.from({ length: 500 }).map((_, i) => {
  const status = faker.helpers.arrayElement(shipmentStatuses);
  const company = faker.helpers.arrayElement(companies);
  
  let assignedDriver = null;
  let assignedTruck = null;
  
  if (status !== "Pending Assignment" && status !== "Cancelled") {
    assignedDriver = faker.helpers.arrayElement(drivers);
    assignedTruck = faker.helpers.arrayElement(trucks);
  }

  const pickupDate = faker.date.recent({ days: 30 });
  const deliveryDate = faker.date.soon({ days: 5, refDate: pickupDate });

  return {
    id: `SHP-${10000 + i}`,
    shipperId: company.id,
    shipperName: company.name,
    origin: `${faker.location.city()}, ${faker.location.stateAbbr()}`,
    destination: `${faker.location.city()}, ${faker.location.stateAbbr()}`,
    type: faker.helpers.arrayElement(truckTypes),
    weight: `${faker.number.int({ min: 1000, max: 40000 })} lbs`,
    price: faker.number.int({ min: 500, max: 8000 }),
    status,
    driver: assignedDriver ? assignedDriver.name : "Unassigned",
    truckPlate: assignedTruck ? assignedTruck.plateNumber : "-",
    pickupDate: pickupDate.toISOString(),
    deliveryDate: deliveryDate.toISOString(),
    createdDate: faker.date.recent({ days: 60 }).toISOString(),
  };
});

// ==========================================
// 5. Invoices (Related to Shipments)
// ==========================================
export const invoices = shipments.filter(s => s.status === 'Delivered').map(s => ({
  id: `INV-${s.id.split('-')[1]}`,
  shipmentId: s.id,
  amount: s.price,
  status: faker.helpers.arrayElement(["Paid", "Pending", "Overdue"]),
  dueDate: faker.date.soon({ days: 30 }).toISOString(),
  company: s.shipperName,
}));

// ==========================================
// 6. Global Stats & Reports Data
// ==========================================
export const dashboardStats = {
  totalRevenue: invoices.filter(i => i.status === 'Paid').reduce((acc, inv) => acc + inv.amount, 0),
  activeShipments: shipments.filter(s => s.status === 'In Transit').length,
  totalDrivers: drivers.length,
  availableTrucks: trucks.filter(t => t.status === 'Available').length,
};

export const monthlyRevenue = Array.from({ length: 12 }).map((_, i) => ({
  month: new Date(0, i).toLocaleString('default', { month: 'short' }),
  revenue: faker.number.int({ min: 20000, max: 150000 }),
  trips: faker.number.int({ min: 50, max: 400 }),
}));
