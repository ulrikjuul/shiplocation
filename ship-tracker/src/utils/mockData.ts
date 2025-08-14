import { Ship } from '../types/Ship';

export const mockShips: Ship[] = [
  {
    id: '1',
    name: 'Caribbean Star',
    type: 'cargo',
    status: 'at-sea',
    origin: 'Curacao',
    destination: 'Bonaire',
    departureTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    estimatedArrival: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    currentLocation: { lat: 12.2, lng: -68.9 },
    speed: 15,
    cargo: 'Construction Materials',
    capacity: '5000 tons',
    progress: 66,
  },
  {
    id: '2',
    name: 'Island Express',
    type: 'container',
    status: 'departing',
    origin: 'Curacao',
    destination: 'Bonaire',
    departureTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    estimatedArrival: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    currentLocation: { lat: 12.1, lng: -68.93 },
    speed: 0,
    cargo: 'Mixed Containers',
    capacity: '200 TEU',
    progress: 0,
  },
  {
    id: '3',
    name: 'Bonaire Queen',
    type: 'passenger',
    status: 'arriving',
    origin: 'Bonaire',
    destination: 'Curacao',
    departureTime: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    estimatedArrival: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    currentLocation: { lat: 12.08, lng: -68.88 },
    speed: 18,
    cargo: 'Passengers & Vehicles',
    capacity: '150 passengers',
    progress: 92,
  },
  {
    id: '4',
    name: 'Trade Wind',
    type: 'cargo',
    status: 'docked',
    origin: 'Bonaire',
    destination: 'Curacao',
    departureTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    estimatedArrival: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
    currentLocation: { lat: 12.15, lng: -68.28 },
    speed: 0,
    cargo: 'Food Supplies',
    capacity: '3000 tons',
    progress: 0,
  },
  {
    id: '5',
    name: 'Sea Hawk',
    type: 'tanker',
    status: 'at-sea',
    origin: 'Bonaire',
    destination: 'Curacao',
    departureTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    estimatedArrival: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    currentLocation: { lat: 12.12, lng: -68.5 },
    speed: 12,
    cargo: 'Fuel',
    capacity: '8000 barrels',
    progress: 33,
  },
];

export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Curacao coordinates: 12.1696° N, 68.9900° W
// Bonaire coordinates: 12.2019° N, 68.2624° W
export const CURACAO_COORDS = { lat: 12.1696, lng: -68.9900 };
export const BONAIRE_COORDS = { lat: 12.2019, lng: -68.2624 };