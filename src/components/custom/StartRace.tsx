'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Toast from '@/components/custom/Toast';
import {
  createWinner,
  updateWinner,
  getWinnerByCarId,
} from '@/lib/api/winners';
import { useRace } from '@/context/RaceContext';

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
  const { setRaceStarted, setCars } = useRace(); // Use the context

  const handleStartRace = async () => {
    const cars = getCarsInDriveMode();

    if (cars.length === 0) {
      setToastMessage('No cars in drive mode');
    } else if (cars.length === 1) {
      setToastMessage('At least two cars are required to start a race');
    } else {
      setToastMessage('Race started');
      setCars(cars); // Update the cars in context
      setRaceStarted(true); // Update the raceStarted state in context
    }
    // Find the car with the minimal time
    const winner = cars.reduce(
      (min, car) => (car.time < min.time ? car : min),
      cars[0]
    );

    /**
     * This block of code is handling the logic for updating the winner of the race.
     * Here's a breakdown of what it does:
     */
    try {
      await createWinner({ id: winner.id, wins: 1, time: winner.time });
    } catch {
      try {
        const existingWinner = await getWinnerByCarId(winner.id);
        const updatedWins = existingWinner.wins + 1;
        const bestTime = Math.min(existingWinner.time, winner.time);
        await updateWinner({
          id: winner.id,
          wins: updatedWins,
          time: bestTime,
        });
      } catch (error) {
        console.error('Error updating winner:', error);
      }
    }

    console.log(winner);
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
