'use client';

import { useState, useEffect } from 'react';
import StartIcon from '@/components/custom/StartIcon';
import StopIcon from '@/components/custom/StopIcon';
import CarEngine from '@/types/CarEngine';
import { startEngine, stopEngine, setDriveMode } from '@/lib/api/engine';
import Toast from '@/components/custom/Toast';
import BodyText from '@/components/custom/BodyText';

/* The `EngineControl` function is a React component that controls the engine of a car. Here's a
breakdown of what it does: */
function EngineControl({ carId, name }: CarEngine) {
  const [isStarted, setIsStarted] = useState<boolean>(() => {
    const savedStatus = localStorage.getItem(`${carId}-engineStatus`);
    return savedStatus ? JSON.parse(savedStatus) : false;
  });
  const [velocity, setVelocity] = useState<number>(() => {
    const savedVelocity = localStorage.getItem(`${carId}-engineVelocity`);
    return savedVelocity ? JSON.parse(savedVelocity) : 0;
  });
  const [carDriveMode, setCarDriveMode] = useState<boolean>(() => {
    const savedDriveMode = localStorage.getItem(`${carId}-driveMode`);
    return savedDriveMode ? JSON.parse(savedDriveMode) : false;
  });
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /* The `useEffect` hook in the `EngineControl` component is responsible for saving the state of the
  engine status, engine velocity, and drive mode of a car to the local storage whenever any of these
  values change. */
  useEffect(() => {
    localStorage.setItem(`${carId}-engineStatus`, JSON.stringify(isStarted));
    localStorage.setItem(`${carId}-engineVelocity`, JSON.stringify(velocity));
    localStorage.setItem(`${carId}-driveMode`, JSON.stringify(carDriveMode));
  }, [isStarted, velocity, carId, carDriveMode]);

  /**
   * The function `toggleEngine` asynchronously starts or stops the engine of a car based on its current
   * state.
   */
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

  /**
   * The function `toggleDriveMode` asynchronously toggles the drive mode of a car and handles success
   * and error cases.
   */
  const toggleDriveMode = async () => {
    if (isStarted) {
      setIsLoading(true);
      try {
        const { success } = await setDriveMode(carId);
        if (success) {
          setCarDriveMode(!carDriveMode);
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

  const icon = isStarted ? <StopIcon /> : <StartIcon />;

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
        {/* Toggle between start and stop icons on click */}
        {icon}
      </div>
      <BodyText size="small">Velocity: {velocity}</BodyText>
      <div className="flex items-center gap-2">
        <BodyText size="small">Drive mode:</BodyText>
        <input
          className="w-4 h-4 border border-gray-300 rounded disabled:cursor-not-allowed disabled:opacity-70"
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
