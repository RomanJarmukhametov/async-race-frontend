// Function to get cars with driveMode set to true
export function getCarsInDriveMode(): {
  id: number;
  time: number;
}[] {
  const carsInDriveMode: { id: number; time: number }[] = [];

  // Loop through local storage keys
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key && key.endsWith('-driveMode')) {
      const id = parseInt(key.split('-')[0], 10); // Convert id to number
      const driveMode = localStorage.getItem(key) === 'true';
      const timeInSecondsKey = `${id}-timeInSeconds`;
      const time = parseFloat(localStorage.getItem(timeInSecondsKey) || '0');

      console.log(`Key: ${key}, DriveMode: ${driveMode}, Time: ${time}`); // Debugging

      if (driveMode) {
        carsInDriveMode.push({ id, time });
      }
    }
  }

  return carsInDriveMode;
}
