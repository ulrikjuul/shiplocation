import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  LinearProgress,
  Grid,
} from '@mui/material';
import {
  DirectionsBoat,
  Schedule,
  Speed,
  Navigation,
  LocalShipping,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Ship } from '../types/Ship';
import { CURACAO_COORDS, BONAIRE_COORDS, calculateDistance } from '../utils/mockData';

interface ShipDetailsProps {
  ship: Ship | null;
  onClose: () => void;
}

export const ShipDetails: React.FC<ShipDetailsProps> = ({ ship, onClose }) => {
  if (!ship) return null;

  const destinationCoords = ship.destination === 'Bonaire' ? BONAIRE_COORDS : CURACAO_COORDS;
  const distanceToDestination = calculateDistance(
    ship.currentLocation.lat,
    ship.currentLocation.lng,
    destinationCoords.lat,
    destinationCoords.lng
  );

  const formatDateTime = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeRemaining = (arrival?: Date) => {
    if (!arrival) return 'N/A';
    const now = new Date();
    const arrivalTime = new Date(arrival);
    const diff = arrivalTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <Dialog
      open={!!ship}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperComponent={motion.div}
      PaperProps={{
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { duration: 0.3 },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <DirectionsBoat />
          <Typography variant="h5" fontWeight="bold">
            {ship.name}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box mb={2}>
          <Chip
            label={ship.status.replace('-', ' ').toUpperCase()}
            color={ship.status === 'arriving' ? 'success' : 'primary'}
            sx={{ mr: 1 }}
          />
          <Chip label={ship.type.toUpperCase()} variant="outlined" />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Navigation fontSize="small" color="primary" />
              <Typography variant="body2" color="text.secondary">
                Route
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="medium">
              {ship.origin} → {ship.destination}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocalShipping fontSize="small" color="primary" />
              <Typography variant="body2" color="text.secondary">
                Cargo
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="medium">
              {ship.cargo || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Schedule fontSize="small" color="primary" />
              <Typography variant="body2" color="text.secondary">
                Departure
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="medium">
              {formatDateTime(ship.departureTime)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Schedule fontSize="small" color="primary" />
              <Typography variant="body2" color="text.secondary">
                ETA
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="medium">
              {formatDateTime(ship.estimatedArrival)}
            </Typography>
          </Grid>

          {ship.status === 'at-sea' && (
            <>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Speed fontSize="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    Speed
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight="medium">
                  {ship.speed} knots
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Navigation fontSize="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    Distance to {ship.destination}
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight="medium">
                  {distanceToDestination.toFixed(1)} km
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box mt={2}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Journey Progress
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {Math.round(ship.progress)}% - {getTimeRemaining(ship.estimatedArrival)} remaining
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={ship.progress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#e0e0e0',
                    }}
                  />
                </Box>
              </Grid>
            </>
          )}

          {ship.capacity && (
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <LocalShipping fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Capacity
                </Typography>
              </Box>
              <Typography variant="body1" fontWeight="medium">
                {ship.capacity}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Box mt={3} p={2} bgcolor="info.light" borderRadius={1}>
          <Typography variant="body2" color="info.dark">
            <strong>Current Location:</strong> {ship.currentLocation.lat.toFixed(4)}°N, {Math.abs(ship.currentLocation.lng).toFixed(4)}°W
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};