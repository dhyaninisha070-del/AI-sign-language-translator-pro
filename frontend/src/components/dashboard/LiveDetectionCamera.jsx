import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';
import { FiVideo, FiPlay, FiSquare, FiRefreshCw, FiCamera, FiWifi, FiServer, FiCpu } from 'react-icons/fi';
import { useWebcam } from '../../hooks/useWebcam';
import { useWebSocket } from '../../hooks/useWebSocket';

const StatusIndicator = ({ icon: Icon, label, status }) => {
  const statusColor = status === 'online' ? 'text-success' : status === 'connecting' ? 'text-warning' : 'text-danger';

  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-2">
      <Icon size={16} className={statusColor} />
      <span className="text-xs text-text-secondary">{label}</span>
      <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-success animate-pulse' : status === 'connecting' ? 'bg-warning animate-pulse' : 'bg-danger'}`} />
    </div>
  );
};

const LiveDetectionCamera = () => {
  const [isLive, setIsLive] = useState(false);
  const [backendStatus] = useState('online');
  const [websocketStatus, setWebsocketStatus] = useState('connecting');
  const [cameraStatus, setCameraStatus] = useState('offline');
  const [modelStatus] = useState('online');

  const { 
    webcamRef, 
    isStreamReady, 
    error: webcamError, 
    videoConstraints, 
    captureFrame, 
    startCamera,
    stopCamera,
    handleUserMedia, 
    handleUserMediaError 
  } = useWebcam();
  const { isConnected } = useWebSocket('ws://127.0.0.1:8000/ws/predict');

  useEffect(() => {
    setWebsocketStatus(isConnected ? 'online' : 'connecting');
  }, [isConnected]);

  useEffect(() => {
    setCameraStatus(isStreamReady ? 'online' : 'offline');
  }, [isStreamReady]);

  const handleStartDetection = () => {
    setIsLive(true);
    startCamera();
  };

  const handleStopDetection = () => {
    setIsLive(false);
    stopCamera();
  };

  const handleCapture = () => {
    const frame = captureFrame();
    if (frame) {
      console.log('Frame captured:', frame);
    }
  };

  const handleReconnect = () => {
    console.log('Reconnecting to camera...');
    stopCamera();
    setTimeout(() => startCamera(), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl border border-border p-6 shadow-glow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">AI Camera Preview</h3>
        {isLive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-danger/20 border border-danger/50"
          >
            <span className="w-3 h-3 rounded-full bg-danger animate-pulse" />
            <span className="text-danger text-sm font-semibold">LIVE</span>
          </motion.div>
        )}
      </div>

      {/* Status Indicators */}
      <div className="flex flex-wrap gap-2 mb-4">
        <StatusIndicator icon={FiServer} label="Backend" status={backendStatus} />
        <StatusIndicator icon={FiWifi} label="WebSocket" status={websocketStatus} />
        <StatusIndicator icon={FiVideo} label="Camera" status={cameraStatus} />
        <StatusIndicator icon={FiCpu} label="Model" status={modelStatus} />
      </div>

      {/* Camera Frame */}
      <div className="relative aspect-video bg-card rounded-2xl overflow-hidden border-2 border-border mb-4">
        {isLive && isStreamReady ? (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
              <FiVideo size={48} className="text-text-secondary" />
            </div>
            <p className="text-text-secondary text-lg mb-2">
              {webcamError ? 'Camera access denied' : 'Camera is currently off'}
            </p>
            <p className="text-text-secondary text-sm">Click "Start Detection" to begin</p>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {!isLive ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartDetection}
            className="flex-1 min-w-[200px] btn-primary py-4 rounded-xl text-white font-semibold flex items-center justify-center space-x-2"
          >
            <FiPlay size={20} />
            <span>Start Detection</span>
          </motion.button>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStopDetection}
              className="flex-1 min-w-[200px] bg-danger hover:bg-danger/90 py-4 rounded-xl text-white font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <FiSquare size={20} />
              <span>Stop Detection</span>
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReconnect}
              className="px-6 py-4 rounded-xl bg-card border border-border hover:border-primary transition-colors flex items-center space-x-2"
            >
              <FiRefreshCw size={20} />
              <span className="hidden sm:inline">Reconnect</span>
            </motion.button>
          </>
        )}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!isLive}
          onClick={handleCapture}
          className="px-6 py-4 rounded-xl bg-card border border-border hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <FiCamera size={20} />
          <span className="hidden sm:inline">Capture</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default React.memo(LiveDetectionCamera);
