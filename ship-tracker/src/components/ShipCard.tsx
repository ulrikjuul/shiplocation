import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  DirectionsBoat,
  Schedule,
  Speed,
  NotificationsActive,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Ship } from '../types/Ship';
import { useShipStore } from '../store/shipStore';

interface ShipCardProps {
  ship: Ship;
  onClick?: () => void;
}

const getStatusColor = (status: Ship['status']) => {
  switch (status) {
    case 'docked':
      return 'default';
    case 'departing':
      return 'warning';
    case 'at-sea':
      return 'info';
    case 'arriving':
      return 'success';
    default:
      return 'default';
  }
};

const formatTime = (date?: Date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const ShipCard: React.FC<ShipCardProps> = ({ ship, onClick }) => {
  const { addNotification } = useShipStore();

  const handleNotification = (e: React.MouseEvent) => {
    e.stopPropagation();
    addNotification({
      shipId: ship.id,
      type: 'update',
      message: `You will be notified when ${ship.name} arrives`,
      read: false,
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Card
        sx={{
          cursor: 'pointer',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
        onClick={onClick}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <DirectionsBoat />
              <Typography variant="h6" fontWeight="bold">
                {ship.name}
              </Typography>
            </Box>
            <Tooltip title="Get notifications">
              <IconButton size="small" onClick={handleNotification} sx={{ color: 'white' }}>
                <NotificationsActive />
              </IconButton>
            </Tooltip>
          </Box>

          <Box display="flex" gap={1} mb={2}>
            <Chip
              label={ship.status.replace('-', ' ').toUpperCase()}
              color={getStatusColor(ship.status)}
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
            <Chip
              label={ship.type.toUpperCase()}
              size="small"
              variant="outlined"
              sx={{ borderColor: 'white', color: 'white' }}
            />
          </Box>

          <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
            {ship.origin} → {ship.destination}
          </Typography>

          {ship.cargo && (
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Cargo: {ship.cargo}
            </Typography>
          )}

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Schedule fontSize="small" />
            <Typography variant="body2">
              Departure: {formatTime(ship.departureTime)}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Schedule fontSize="small" />
            <Typography variant="body2">
              ETA: {formatTime(ship.estimatedArrival)}
            </Typography>
          </Box>

          {ship.status === 'at-sea' && (
            <>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Speed fontSize="small" />
                <Typography variant="body2">{ship.speed} knots</Typography>
              </Box>

              <Box mt={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Journey Progress</Typography>
                  <Typography variant="body2">{Math.round(ship.progress)}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={ship.progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'white',
                    },
                  }}
                />
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};