import { startEngine, stopEngine, setDriveMode } from '@/lib/api/engine';

interface ToggleEngineParams {
  carId: number;
  name: string;
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setVelocity: React.Dispatch<React.SetStateAction<number>>;
  setTimeInSeconds: React.Dispatch<React.SetStateAction<number>>;
  setCarDriveMode: React.Dispatch<React.SetStateAction<boolean>>;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
  onDriveModeChange: (carId: number, isInDriveMode: boolean) => void;
  onEngineStatusChange: (
    carId: number,
    isEngineStarted: boolean,
    velocity: number
  ) => void;
}

/**
 * Toggles the engine start/stop and sets the drive mode
 * @param {ToggleEngineParams} - The parameters to toggle the engine
 */
export const toggleEngine = async ({
  carId,
  name,
  isStarted,
  setIsStarted,
  setVelocity,
  setTimeInSeconds,
  setCarDriveMode,
  setToastMessage,
  onDriveModeChange,
  onEngineStatusChange,
}: ToggleEngineParams) => {
  const newIsStarted = !isStarted;
  setIsStarted(newIsStarted);

  if (newIsStarted) {
    try {
      const { velocity: newVelocity, distance: newDistance } =
        await startEngine(carId);
      setVelocity(newVelocity);
      setToastMessage(`Engine started for ${name}`);

      const timeInMs = newDistance / newVelocity;
      const timeInSec = timeInMs / 1000;
      setTimeInSeconds(parseFloat(timeInSec.toFixed(2)));

      // Notify parent component about engine status change
      onEngineStatusChange(carId, true, newVelocity);

      // Set drive mode when engine is started
      const { success } = await setDriveMode(carId);
      if (success) {
        setCarDriveMode(true);
        onDriveModeChange(carId, true);
        setToastMessage(`Drive mode started for ${name}`);
      } else {
        setToastMessage('Failed to start drive mode');
      }
    } catch (error) {
      console.error('Failed to start engine:', error);
      setToastMessage('Car is broken and cannot be set to drive mode');
      onEngineStatusChange(carId, false, 0); // Reset engine status if failed to start
    }
  } else {
    try {
      await stopEngine(carId);
      setVelocity(0);
      setTimeInSeconds(0);
      setCarDriveMode(false); // Reset drive mode when engine is stopped
      onDriveModeChange(carId, false);
      setToastMessage(`Engine stopped for ${name}`);
      onEngineStatusChange(carId, false, 0);
    } catch (error) {
      console.error('Failed to stop engine:', error);
      setToastMessage('Failed to stop engine');
    }
  }
};
