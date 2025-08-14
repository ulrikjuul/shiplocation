import React from 'react';
import {
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { ShipCard } from './ShipCard';
import { useShipStore } from '../store/shipStore';

export const ShipList: React.FC = () => {
  const { ships, filter, setFilter, selectShip } = useShipStore();

  const filteredShips = ships.filter((ship) => {
    if (filter.status !== 'all' && ship.status !== filter.status) return false;
    if (filter.destination !== 'all' && ship.destination !== filter.destination) return false;
    return true;
  });

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Ship Tracker - Curacao ⇄ Bonaire
        </Typography>
        
        <Box display="flex" gap={2} mt={2}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filter.status}
              label="Status"
              onChange={(e) => setFilter({ status: e.target.value })}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="docked">Docked</MenuItem>
              <MenuItem value="departing">Departing</MenuItem>
              <MenuItem value="at-sea">At Sea</MenuItem>
              <MenuItem value="arriving">Arriving</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Destination</InputLabel>
            <Select
              value={filter.destination}
              label="Destination"
              onChange={(e) => setFilter({ destination: e.target.value })}
            >
              <MenuItem value="all">All Destinations</MenuItem>
              <MenuItem value="Bonaire">To Bonaire</MenuItem>
              <MenuItem value="Curacao">To Curacao</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <AnimatePresence>
          {filteredShips.map((ship, index) => (
            <Grid item xs={12} sm={6} md={4} key={ship.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <ShipCard
                  ship={ship}
                  onClick={() => selectShip(ship)}
                />
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {filteredShips.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No ships match your filter criteria
          </Typography>
        </Box>
      )}
    </Box>
  );
};