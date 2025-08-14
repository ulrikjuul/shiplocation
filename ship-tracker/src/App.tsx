import React, { useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
} from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { ShipList } from './components/ShipList';
import { ShipDetails } from './components/ShipDetails';
import { NotificationPanel } from './components/NotificationPanel';
import { useShipStore } from './store/shipStore';
import { mockShips } from './utils/mockData';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  const { setShips, selectedShip, selectShip, updateShipProgress, addNotification } = useShipStore();

  useEffect(() => {
    setShips(mockShips);

    // Simulate ship progress updates
    const interval = setInterval(() => {
      mockShips.forEach((ship) => {
        if (ship.status === 'at-sea') {
          updateShipProgress(ship.id);
        }
      });
    }, 10000); // Update every 10 seconds

    // Simulate notifications
    const notificationTimeout = setTimeout(() => {
      addNotification({
        shipId: '3',
        type: 'arrival',
        message: 'Bonaire Queen is arriving at Curacao port in 15 minutes',
        read: false,
      });
    }, 5000);

    const departureTimeout = setTimeout(() => {
      addNotification({
        shipId: '2',
        type: 'departure',
        message: 'Island Express is departing from Curacao in 30 minutes',
        read: false,
      });
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(notificationTimeout);
      clearTimeout(departureTimeout);
    };
  }, [setShips, updateShipProgress, addNotification]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          pt: 4,
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              bgcolor: 'background.default',
              borderRadius: 3,
              p: 3,
              minHeight: '80vh',
            }}
          >
            <ShipList />
            <AnimatePresence>
              {selectedShip && (
                <ShipDetails
                  ship={selectedShip}
                  onClose={() => selectShip(null)}
                />
              )}
            </AnimatePresence>
          </Box>
        </Container>
        <NotificationPanel />
      </Box>
    </ThemeProvider>
  );
}

export default App;