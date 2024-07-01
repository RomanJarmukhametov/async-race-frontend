'use client';

import { useState, useEffect, useCallback } from 'react';
import StartIcon from '@/components/custom/StartIcon';
import StopIcon from '@/components/custom/StopIcon';
import CarEngine from '@/types/CarEngine';
import { startEngine, stopEngine, setDriveMode } from '@/lib/api/engine';
import Toast from '@/components/custom/Toast';
import BodyText from '@/components/custom/BodyText';

/*  
  This component is used to control the engine of a car and to display the velocity, drive mode, and time in seconds.
  It uses the local storage to save the state of the engine and to persist it between page refreshes.
*/
function EngineControl({ carId, name }: CarEngine) {
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
  const [isLoading, setIsLoading] = useState(false);

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
  const toggleEngine = async () => {
    setIsStarted((prevIsStarted) => !prevIsStarted);
    if (!isStarted) {
      try {
        const { velocity: newVelocity, distance: newDistance } =
          await startEngine(carId);
        setVelocity(newVelocity);
        setToastMessage(`Engine started for ${name}`);
        const timeInMs = newDistance / newVelocity;
        const timeInSec = timeInMs / 1000;
        setTimeInSeconds(parseFloat(timeInSec.toFixed(2)));
      } catch (error) {
        console.error('Failed to start engine:', error);
        setToastMessage('Failed to start engine');
      }
    } else {
      try {
        await stopEngine(carId);
        setVelocity(0);
        setTimeInSeconds(0);
        setToastMessage(`Engine stopped for ${name}`);
      } catch (error) {
        console.error('Failed to stop engine:', error);
        setToastMessage('Failed to stop engine');
      }
    }
  };

  // Toggle the drive mode
  const toggleDriveMode = async () => {
    if (isStarted) {
      setIsLoading(true);
      try {
        const { success } = await setDriveMode(carId);
        if (success) {
          setCarDriveMode((prevDriveMode) => !prevDriveMode);
          setToastMessage(
            `Drive mode ${!carDriveMode ? 'started' : 'stopped'} for ${name}`
          );
        }
      } catch (error) {
        setCarDriveMode(false);
        console.error(
          `Failed to ${!carDriveMode ? 'start' : 'stop'} drive mode:`,
          error
        );
        setToastMessage(`Drive mode stopped for ${name}`);
      }
      setIsLoading(false);
    }
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
        {isStarted ? <StopIcon /> : <StartIcon />}
      </div>
      <BodyText size="small">Velocity: {velocity}</BodyText>
      <div className="flex items-center gap-2">
        <BodyText size="small">Drive mode:</BodyText>
        <input
          className="w-4 h-4 border border-gray-300 rounded disabled:cursor-not-allowed disabled:opacity-70"
          checked={carDriveMode}
          type="checkbox"
          id={carId.toString()}
          onChange={toggleDriveMode}
          disabled={!isStarted || isLoading}
        />
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
