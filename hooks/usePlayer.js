import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { useSocket } from '@/context/socket';

const usePlayer = (myId, roomId, peer) => {
  const socket = useSocket();
  const [players, setPlayers] = useState({});
  const [nonHighlightedPlayers, setNonHighlightedPlayers] = useState({});

  useEffect(() => {
    if (!socket) return;

    const handleUserLeave = (userId) => {
      // Handle user leave logic
    };

    const handleToggleAudio = (userId) => {
      // Handle toggle audio logic
    };

    const handleToggleVideo = (userId) => {
      // Handle toggle video logic
    };

    socket.on('user-leave', handleUserLeave);
    socket.on('user-toggle-audio', handleToggleAudio);
    socket.on('user-toggle-video', handleToggleVideo);

    return () => {
      socket.off('user-leave', handleUserLeave);
      socket.off('user-toggle-audio', handleToggleAudio);
      socket.off('user-toggle-video', handleToggleVideo);
    };
  }, [socket, players, nonHighlightedPlayers]);

  // Other custom hook logic...

  return {
    players,
    setPlayers,
    nonHighlightedPlayers,
    setNonHighlightedPlayers,
  };
};

export default usePlayer;
