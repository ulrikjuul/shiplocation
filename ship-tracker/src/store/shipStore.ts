import { create } from 'zustand';
import { Ship, Notification } from '../types/Ship';

interface ShipStore {
  ships: Ship[];
  notifications: Notification[];
  selectedShip: Ship | null;
  filter: {
    status: string;
    destination: string;
  };
  
  // Actions
  setShips: (ships: Ship[]) => void;
  updateShip: (id: string, updates: Partial<Ship>) => void;
  selectShip: (ship: Ship | null) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  setFilter: (filter: Partial<ShipStore['filter']>) => void;
  updateShipProgress: (id: string) => void;
}

export const useShipStore = create<ShipStore>((set, get) => ({
  ships: [],
  notifications: [],
  selectedShip: null,
  filter: {
    status: 'all',
    destination: 'all',
  },
  
  setShips: (ships) => set({ ships }),
  
  updateShip: (id, updates) => set((state) => ({
    ships: state.ships.map((ship) =>
      ship.id === id ? { ...ship, ...updates } : ship
    ),
  })),
  
  selectShip: (ship) => set({ selectedShip: ship }),
  
  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        ...notification,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        read: false,
      },
      ...state.notifications,
    ],
  })),
  
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    ),
  })),
  
  clearNotifications: () => set({ notifications: [] }),
  
  setFilter: (filter) => set((state) => ({
    filter: { ...state.filter, ...filter },
  })),
  
  updateShipProgress: (id) => set((state) => {
    const ship = state.ships.find((s) => s.id === id);
    if (!ship || !ship.departureTime || !ship.estimatedArrival) return state;
    
    const now = new Date().getTime();
    const departure = new Date(ship.departureTime).getTime();
    const arrival = new Date(ship.estimatedArrival).getTime();
    const totalDuration = arrival - departure;
    const elapsed = now - departure;
    const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    
    return {
      ships: state.ships.map((s) =>
        s.id === id ? { ...s, progress } : s
      ),
    };
  }),
}));