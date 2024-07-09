'use client';

import { useState, useEffect, useCallback } from 'react';
import StartIcon from '@/components/custom/StartIcon';
import StopIcon from '@/components/custom/StopIcon';
import CarEngine from '@/types/CarEngine';
import Toast from '@/components/custom/Toast';
import BodyText from '@/components/custom/BodyText';
import { toggleEngine as toggleEngineUtil } from '@/lib/toggleEngine';

interface EngineControlProps extends CarEngine {
  onDriveModeChange: (carId: number, isInDriveMode: boolean) => void;
}

function EngineControl({ carId, name, onDriveModeChange }: EngineControlProps) {
  const [isStarted, setIsStarted] = useState<boolean>(() => {
    const savedStatus = localStorage.getItem(`${carId}-engineStatus`);
    return savedStatus ? JSON.parse(savedStatus) : false;
  });
  const [velocity, setVelocity] = useState<number>(() => {
    const savedVelocity = localStorage.getItem(`${carId}-engineVelocity`);
    return savedVelocity ? JSON.parse(savedVelocity) : 0;
  });
  const [timeInSeconds, setTimeInSeconds] = useState<number>(() => {
    const savedTime = localStorage.getItem(`${carId}-timeInSeconds`);
    return savedTime ? JSON.parse(savedTime) : 0;
  });
  const [carDriveMode, setCarDriveMode] = useState<boolean>(() => {
    const savedDriveMode = localStorage.getItem(`${carId}-driveMode`);
    return savedDriveMode ? JSON.parse(savedDriveMode) : false;
  });
  const [toastMessage, setToastMessage] = useState('');

  // Save the state of the engine to local storage
  useEffect(() => {
    localStorage.setItem(`${carId}-engineStatus`, JSON.stringify(isStarted));
    localStorage.setItem(`${carId}-engineVelocity`, JSON.stringify(velocity));
    localStorage.setItem(`${carId}-driveMode`, JSON.stringify(carDriveMode));
    localStorage.setItem(
      `${carId}-timeInSeconds`,
      JSON.stringify(timeInSeconds)
    );
  }, [isStarted, velocity, carId, carDriveMode, timeInSeconds]);

  // Listen for changes in local storage
  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event.key === `${carId}-engineStatus`) {
        setIsStarted(JSON.parse(event.newValue || 'false'));
      }
      if (event.key === `${carId}-engineVelocity`) {
        setVelocity(JSON.parse(event.newValue || '0'));
      }
      if (event.key === `${carId}-driveMode`) {
        setCarDriveMode(JSON.parse(event.newValue || 'false'));
      }
      if (event.key === `${carId}-timeInSeconds`) {
        setTimeInSeconds(JSON.parse(event.newValue || '0'));
      }
    },
    [carId]
  );

  // Add an event listener for storage changes
  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleStorageChange]);

  // Toggle the engine start/stop
  const toggleEngine = () => {
    toggleEngineUtil({
      carId,
      name: name || '',
      isStarted,
      setIsStarted,
      setVelocity,
      setTimeInSeconds,
      setCarDriveMode,
      setToastMessage,
      onDriveModeChange,
    });
  };

  return (
    <div>
      <div
        className="flex flex-col items-start justify-center gap-2 mb-2"
        onClick={toggleEngine}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleEngine();
        }}
        tabIndex={0}
        role="button"
      >
        <div className="flex flex-row gap-2 items-center mb-3">
          {isStarted ? (
            <BodyText size="small">Stop engine</BodyText>
          ) : (
            <BodyText size="small">Start engine</BodyText>
          )}
          {isStarted ? <StopIcon /> : <StartIcon />}
        </div>
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
