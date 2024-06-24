'use client';

import { useState, useEffect } from 'react';
import StartIcon from '@/components/custom/StartIcon';
import StopIcon from '@/components/custom/StopIcon';
import CarEngine from '@/types/CarEngine';
import { startEngine, stopEngine } from '@/lib/api/engine';
import Toast from '@/components/custom/Toast';
import BodyText from '@/components/custom/BodyText';

/* The `EngineControl` function is a React component that controls the engine of a car. Here's a
breakdown of what it does: */
function EngineControl({ carId, name }: CarEngine) {
  const [isStarted, setIsStarted] = useState<boolean>(() => {
    const savedStatus = localStorage.getItem(`engineStatus-${carId}`);
    return savedStatus ? JSON.parse(savedStatus) : false;
  });
  const [velocity, setVelocity] = useState<number>(() => {
    const savedVelocity = localStorage.getItem(`engineVelocity-${carId}`);
    return savedVelocity ? JSON.parse(savedVelocity) : 0;
  });
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    localStorage.setItem(`engineStatus-${carId}`, JSON.stringify(isStarted));
    localStorage.setItem(`engineVelocity-${carId}`, JSON.stringify(velocity));
  }, [isStarted, velocity, carId]);

  const toggleEngine = async () => {
    setIsStarted(!isStarted);
    if (!isStarted) {
      try {
        const { velocity: newVelocity } = await startEngine(carId);
        setVelocity(newVelocity);
        setToastMessage(`Engine started for ${name}`);
      } catch (error) {
        console.error('Failed to start engine:', error);
        setToastMessage('Failed to start engine');
      }
    } else {
      try {
        await stopEngine(carId);
        setVelocity(0);
        setToastMessage(`Engine stopped for ${name}`);
      } catch (error) {
        console.error('Failed to stop engine:', error);
        setToastMessage('Failed to stop engine');
      }
    }
  };

  const icon = isStarted ? <StopIcon /> : <StartIcon />;

  return (
    <div>
      <div
        className="flex flex-col items-start justify-center gap-2"
        onClick={toggleEngine}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleEngine();
        }}
        tabIndex={0}
        role="button"
      >
        {/* Toggle between start and stop icons on click */}
        {icon}
        <BodyText size="small">Velocity: {velocity}</BodyText>
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
