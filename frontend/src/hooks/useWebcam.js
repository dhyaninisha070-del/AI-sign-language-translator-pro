import { useState, useCallback, useRef, useEffect } from 'react';

export const useWebcam = () => {
  const [isStreamReady, setIsStreamReady] = useState(false);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState('user');
  const [isCameraOn, setIsCameraOn] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode,
  };

  const handleUserMedia = useCallback(() => {
    setIsStreamReady(true);
    setIsCameraOn(true);
    setError(null);
  }, []);

  const handleUserMediaError = useCallback((err) => {
    setError(err);
    setIsStreamReady(false);
    setIsCameraOn(false);
    console.error('Webcam error:', err);
  }, []);

  const startCamera = useCallback(() => {
    setIsCameraOn(true);
    setError(null);
  }, []);

  const stopCamera = useCallback(() => {
    if (webcamRef.current && webcamRef.current.stream) {
      const tracks = webcamRef.current.stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsStreamReady(false);
    setIsCameraOn(false);
  }, []);

  const captureFrame = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      return imageSrc;
    }
    return null;
  }, []);

  const switchCamera = useCallback(() => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    webcamRef,
    isStreamReady,
    isCameraOn,
    error,
    videoConstraints,
    captureFrame,
    switchCamera,
    startCamera,
    stopCamera,
    handleUserMedia,
    handleUserMediaError,
  };
};
