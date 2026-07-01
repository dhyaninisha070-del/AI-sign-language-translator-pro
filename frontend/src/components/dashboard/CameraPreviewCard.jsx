import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiVideo, FiVideoOff, FiPlay, FiSquare } from 'react-icons/fi';
import Webcam from 'react-webcam';
import { useWebcam } from '../../hooks/useWebcam';

const CameraPreviewCard = () => {
  const [isLive, setIsLive] = useState(false);
  const { 
    webcamRef, 
    isStreamReady, 
    isCameraOn,
    error,
    videoConstraints,
    startCamera, 
    stopCamera,
    handleUserMedia,
    handleUserMediaError 
  } = useWebcam();

  const handleToggle = () => {
    if (!isLive) {
      // Start detection
      startCamera();
      setIsLive(true);
    } else {
      // Stop detection
      stopCamera();
      setIsLive(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 border border-border"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Camera Preview</h3>
        {isLive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center space-x-2 px-3 py-1 rounded-full bg-danger/20 border border-danger/50"
          >
            <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
            <span className="text-danger text-sm font-medium">LIVE</span>
          </motion.div>
        )}
      </div>

      {/* Camera Frame */}
      <div className="relative aspect-video bg-card rounded-xl overflow-hidden border-2 border-border mb-4">
        {!isLive ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
              <FiVideo size={40} className="text-text-secondary" />
            </div>
            <p className="text-text-secondary">Camera is currently off</p>
          </div>
        ) : (
          <>
            {error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-danger/10">
                <p className="text-danger mb-2">Camera Error</p>
                <p className="text-text-secondary text-sm">{error}</p>
              </div>
            ) : (
              <Webcam
                ref={webcamRef}
                audio={false}
                videoConstraints={videoConstraints}
                onUserMedia={handleUserMedia}
                onUserMediaError={handleUserMediaError}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
            )}
            {isStreamReady && (
              <div className="absolute bottom-4 left-4 flex items-center space-x-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-white text-xs font-medium">AI Detection Active</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-3">
        {!isLive ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleToggle}
            className="flex-1 btn-primary py-3 rounded-xl text-white font-semibold flex items-center justify-center space-x-2"
            aria-label="Start detection"
          >
            <FiPlay size={20} />
            <span>Start Detection</span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleToggle}
            className="flex-1 bg-danger hover:bg-danger/90 py-3 rounded-xl text-white font-semibold flex items-center justify-center space-x-2 transition-colors"
            aria-label="Stop detection"
          >
            <FiSquare size={20} />
            <span>Stop Detection</span>
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!isLive}
          onClick={handleToggle}
          className="px-6 py-3 rounded-xl bg-card border border-border hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Toggle camera"
        >
          <FiVideoOff size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default React.memo(CameraPreviewCard);
