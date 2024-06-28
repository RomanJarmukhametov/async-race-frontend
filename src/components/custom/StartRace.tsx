'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Toast from '@/components/custom/Toast';

// Function to get cars with driveMode set to true
function getCarsInDriveMode(): { id: number; velocity: number }[] {
  const carsInDriveMode: { id: number; velocity: number }[] = [];

  // Loop through local storage keys
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key && key.endsWith('-driveMode')) {
      const id = parseInt(key.split('-')[0], 10); // Convert id to number
      const driveMode = localStorage.getItem(key) === 'true';
      const velocityKey = `${id}-engineVelocity`;
      const velocity = parseInt(localStorage.getItem(velocityKey) || '0', 10);

      if (driveMode) {
        carsInDriveMode.push({ id, velocity });
      }
    }
  }

  return carsInDriveMode;
}

function StartRace() {
  const [carsInDriveMode, setCarsInDriveMode] = useState<
    { id: number; velocity: number }[]
  >([]);

  const [toastMessage, setToastMessage] = useState('');

  const handleStartRace = () => {
    const cars = getCarsInDriveMode();
    setCarsInDriveMode(cars);
    if (cars.length === 0) {
      setToastMessage('No cars in drive mode');
    } else {
      setToastMessage('Race started');
    }
    console.log(cars); // This will log the array of cars in drive mode to the console
    // You can add more logic here to start the race using the cars array
  };

  return (
    <>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}
      <Button
        variant="outline"
        onClick={handleStartRace}
      >
        Start Race
      </Button>
    </>
  );
}

export default StartRace;
