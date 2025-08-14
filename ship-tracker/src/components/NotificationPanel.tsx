import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  IconButton,
  Badge,
  Divider,
  Button,
} from '@mui/material';
import {
  Notifications,
  NotificationsOff,
  DirectionsBoat,
  Clear,
  Delete,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useShipStore } from '../store/shipStore';

export const NotificationPanel: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { notifications, markNotificationRead, clearNotifications } = useShipStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string) => {
    markNotificationRead(id);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(date).toLocaleDateString();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'departure':
        return <DirectionsBoat color="primary" />;
      case 'arrival':
        return <DirectionsBoat color="success" />;
      case 'delay':
        return <DirectionsBoat color="warning" />;
      default:
        return <DirectionsBoat />;
    }
  };

  return (
    <>
      <Box position="fixed" top={20} right={20} zIndex={1000}>
        <motion.div whileTap={{ scale: 0.95 }}>
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 3,
              '&:hover': { bgcolor: 'background.paper' },
            }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>
        </motion.div>
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 350 } }}
      >
        <Box p={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Notifications
            </Typography>
            <Box>
              {notifications.length > 0 && (
                <IconButton onClick={clearNotifications} size="small">
                  <Delete />
                </IconButton>
              )}
              <IconButton onClick={() => setOpen(false)} size="small">
                <Clear />
              </IconButton>
            </Box>
          </Box>

          <Divider />

          {notifications.length === 0 ? (
            <Box py={4} textAlign="center">
              <NotificationsOff color="disabled" sx={{ fontSize: 48 }} />
              <Typography color="text.secondary" mt={2}>
                No notifications yet
              </Typography>
            </Box>
          ) : (
            <List>
              <AnimatePresence>
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ListItem
                      button
                      onClick={() => handleNotificationClick(notification.id)}
                      sx={{
                        bgcolor: notification.read ? 'transparent' : 'action.hover',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemIcon>
                        {getNotificationIcon(notification.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={notification.message}
                        secondary={formatTime(notification.timestamp)}
                        primaryTypographyProps={{
                          fontWeight: notification.read ? 'normal' : 'bold',
                        }}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
};