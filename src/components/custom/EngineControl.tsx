'use client';

import { useState } from 'react';
import StartIcon from '@/components/custom/StartIcon';
import StopIcon from '@/components/custom/StopIcon';
import CarEngine from '@/types/CarEngine';
import { startEngine, stopEngine } from '@/lib/api/engine';
import Toast from '@/components/custom/Toast';

/* The `EngineControl` function is a React component that controls the engine of a car. Here's a
breakdown of what it does: */
function EngineControl({ carId, name }: CarEngine) {
  const [isStarted, setIsStarted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleEngine = () => {
    setIsStarted(!isStarted);
    if (!isStarted) {
      startEngine(carId);
      setToastMessage(`Engine started for ${name}`);
    } else {
      stopEngine(carId);
      setToastMessage(`Engine stopped for ${name}`);
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
