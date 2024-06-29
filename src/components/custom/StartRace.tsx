'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Toast from '@/components/custom/Toast';

// Function to get cars with driveMode set to true
function getCarsInDriveMode(): {
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

      if (driveMode) {
        carsInDriveMode.push({ id, time });
      }
    }
  }

  return carsInDriveMode;
}

function StartRace() {
  const [toastMessage, setToastMessage] = useState('');

  const handleStartRace = () => {
    const cars = getCarsInDriveMode();

    if (cars.length === 0) {
      setToastMessage('No cars in drive mode');
    } else if (cars.length === 1) {
      setToastMessage('At least two cars are required to start a race');
    } else {
      setToastMessage('Race started');
    }
    console.log(cars);
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
