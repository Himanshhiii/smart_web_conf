import { useState, useEffect } from 'react';
import { useSocket } from '@/context/socket';
import { useRouter } from 'next/router';

const usePeer = () => {
  const socket = useSocket();
  const router = useRouter();
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState('');

  useEffect(() => {
    if (!socket) return;

    const createPeer = async () => {
      const Peer = (await import('peerjs')).default;
      const newPeer = new Peer();

      newPeer.on('open', id => {
        console.log(`Peer ID: ${id}`);
        setMyId(id);
        socket.emit('join-room', router.query.roomId, id);
      });

      setPeer(newPeer);
    };

    createPeer();

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [socket]);

  return { peer, myId };
};

export default usePeer;
