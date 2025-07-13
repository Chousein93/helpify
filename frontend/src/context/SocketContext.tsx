import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinUserRoom: (userId: string) => void;
  joinTaskRoom: (taskId: string) => void;
  sendMessage: (data: MessageData) => void;
  updateLocation: (data: LocationData) => void;
}

interface MessageData {
  taskId: string;
  message: string;
  senderId: string;
  receiverId: string;
}

interface LocationData {
  userId: string;
  latitude: number;
  longitude: number;
}

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Initialize socket connection when user is authenticated
      const newSocket = io(SOCKET_URL, {
        auth: {
          userId: user.id,
        },
      });

      newSocket.on('connect', () => {
        console.log('🔌 Connected to server');
        setIsConnected(true);
        
        // Join user's personal room
        newSocket.emit('join-user', user.id);
      });

      newSocket.on('disconnect', () => {
        console.log('🔌 Disconnected from server');
        setIsConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('🔌 Connection error:', error);
        setIsConnected(false);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else {
      // Clean up socket when user logs out
      if (socket) {
        socket.close();
        setSocket(null);
        setIsConnected(false);
      }
    }
  }, [user]);

  const joinUserRoom = (userId: string) => {
    if (socket) {
      socket.emit('join-user', userId);
    }
  };

  const joinTaskRoom = (taskId: string) => {
    if (socket) {
      socket.emit('join-task', taskId);
    }
  };

  const sendMessage = (data: MessageData) => {
    if (socket) {
      socket.emit('send-message', data);
    }
  };

  const updateLocation = (data: LocationData) => {
    if (socket) {
      socket.emit('update-location', data);
    }
  };

  const value: SocketContextType = {
    socket,
    isConnected,
    joinUserRoom,
    joinTaskRoom,
    sendMessage,
    updateLocation,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};