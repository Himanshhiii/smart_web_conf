import React from 'react';
import { useSocket } from '@/context/socket';
import { useRouter } from 'next/router';
import useMediaStream from './useMediaStream';
import usePeer from './usePeer';
import usePlayer from './usePlayer';

const VideoConferencingComponent = () => {
  const socket = useSocket();
  const router = useRouter();
  const { stream } = useMediaStream();
  const { peer, myId } = usePeer();
  const { players, toggleAudio, toggleVideo, leaveRoom } = usePlayer(myId, router.query.roomId, peer);

  // Emit stream to other participants
  if (peer && stream) {
    peer.on('open', id => {
      const myPlayerInfo = {
        id,
        stream,
        muted: false,
        playing: true
      };
      socket.emit('user-stream', myId, myPlayerInfo);
    });

    peer.on('call', call => {
      call.answer(stream);
      call.on('stream', remoteStream => {
        // Handle incoming remote streams
      });
    });
  }

  return (
    <div>
      {/* Display local video stream */}
      {stream && <video srcObject={stream} autoPlay muted />}
      
      {/* Display remote video streams */}
      {Object.values(players).map(player => (
        <video key={player.id} srcObject={player.stream} autoPlay />
      ))}

      {/* Toggle audio/video buttons */}
      <button onClick={toggleAudio}>Toggle Audio</button>
      <button onClick={toggleVideo}>Toggle Video</button>

      {/* Leave room button */}
      <button onClick={leaveRoom}>Leave Room</button>
    </div>
  );
};

export default VideoConferencingComponent;
