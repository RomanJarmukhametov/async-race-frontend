'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Toast from '@/components/custom/Toast';
import {
  createWinner,
  updateWinner,
  getWinnerByCarId,
} from '@/lib/api/winners';
import { getCarsInDriveMode } from '@/lib/getCarsInDriveMode';
import { useRace } from '@/context/RaceContext';

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

    if (winner) {
      setToastMessage(
        `Winner is a car with id ${winner.id} with a time of ${winner.time}`
      );
    }

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
          duration={
            toastMessage.includes('Winner is a car with id') ? 6000 : 3000
          }
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
