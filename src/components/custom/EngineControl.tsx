'use client';

import { useState, useEffect } from 'react';
import StartIcon from '@/components/custom/StartIcon';
import StopIcon from '@/components/custom/StopIcon';
import CarEngine from '@/types/CarEngine';
import { startEngine, stopEngine } from '@/lib/api/engine';

// Simple Toast Component
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000); // Hide toast after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-20 right-5 bg-black text-white p-2 rounded">
      {message}
    </div>
  );
}

function EngineControl({ carId, name }: CarEngine) {
  const [isStarted, setIsStarted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleEngine = () => {
    setIsStarted(!isStarted);
    if (!isStarted) {
      startEngine(carId);
      setToastMessage(`Engine started for ${name}`);
      console.log('started');
    } else {
      stopEngine(carId);
      setToastMessage(`Engine stopped for ${name}`);
      console.log('stopped');
    }
  };
  const icon = isStarted ? <StopIcon /> : <StartIcon />;
  return (
    <div>
      <div
        onClick={toggleEngine}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleEngine();
        }}
        tabIndex={0}
        role="button"
      >
        {/* Toggle between start and stop icons on click */}
        {icon}
      </div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  );
}

export default EngineControl;
