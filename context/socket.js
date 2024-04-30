import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create a context for the socket instance
const SocketContext = createContext(null);

// Custom hook to use the socket instance
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

// SocketProvider component to initialize and provide the socket instance
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Update the URL to use your deployment WebSocket endpoint
    const socketUrl = 'wss://smart-web-conferencing.vercel.app';
    const connection = io(socketUrl);

    // Handle socket connection events
    connection.on('connect', () => {
      console.log('Socket connected');
    });

    connection.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    connection.on('connect_error', (error) => {
      console.error('Socket connection error:', error);

      // Handle reconnect logic here if needed
      // For example, attempt to reconnect after a delay
      setTimeout(() => {
        connection.connect();
      }, 3000); // Retry after 3 seconds
    });

    setSocket(connection);

    // Clean up the socket connection on component unmount
    return () => {
      if (connection) {
        connection.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
