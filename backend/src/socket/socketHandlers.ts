import { Server } from 'socket.io';

export function initializeSocketIO(io: Server) {
  io.on('connection', (socket) => {
    console.log('🔌 User connected:', socket.id);

    // Join user to their personal room
    socket.on('join-user', (userId) => {
      socket.join(`user-${userId}`);
      console.log(`User ${userId} joined personal room`);
    });

    // Join task room for chat
    socket.on('join-task', (taskId) => {
      socket.join(`task-${taskId}`);
      console.log(`User joined task ${taskId} room`);
    });

    // Handle sending messages
    socket.on('send-message', (data) => {
      const { taskId, message, senderId, receiverId } = data;
      
      // Emit to task room
      socket.to(`task-${taskId}`).emit('new-message', {
        message,
        senderId,
        receiverId,
        timestamp: new Date().toISOString()
      });
    });

    // Handle helper location updates
    socket.on('update-location', (data) => {
      const { userId, latitude, longitude } = data;
      
      // Broadcast to all users looking for helpers
      socket.broadcast.emit('helper-location-updated', {
        userId,
        latitude,
        longitude
      });
    });

    // Handle task notifications
    socket.on('task-notification', (data) => {
      const { userId, notification } = data;
      
      // Send to specific user
      io.to(`user-${userId}`).emit('notification', notification);
    });

    // Handle bid notifications
    socket.on('bid-submitted', (data) => {
      const { seekerId, bid } = data;
      
      // Notify task owner
      io.to(`user-${seekerId}`).emit('new-bid', bid);
    });

    socket.on('disconnect', () => {
      console.log('🔌 User disconnected:', socket.id);
    });
  });
}