export interface Ship {
  id: string;
  name: string;
  type: 'cargo' | 'container' | 'tanker' | 'passenger';
  status: 'docked' | 'departing' | 'at-sea' | 'arriving';
  origin: 'Curacao' | 'Bonaire';
  destination: 'Curacao' | 'Bonaire';
  departureTime?: Date;
  estimatedArrival?: Date;
  currentLocation: {
    lat: number;
    lng: number;
  };
  speed: number; // knots
  cargo?: string;
  capacity?: string;
  progress: number; // 0-100 percentage of journey complete
}

export interface Notification {
  id: string;
  shipId: string;
  type: 'departure' | 'arrival' | 'delay' | 'update';
  message: string;
  timestamp: Date;
  read: boolean;
}