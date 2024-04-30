import { useState, useEffect } from 'react';

const useMediaStream = () => {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
        setStream(mediaStream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    getMediaStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return { stream };
};

export default useMediaStream;
