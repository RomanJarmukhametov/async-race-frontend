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
import { getCars } from '@/lib/api/garage';
import { startEngine, setDriveMode } from '@/lib/api/engine';

function StartRace() {
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { setRaceStarted, setCars } = useRace(); // Use the context

  // Fetch all cars in a single request
  const fetchAllCars = async () => {
    // Fetch the first page to get the total count
    const { totalCount } = await getCars(1, 1);

    // Fetch all cars with totalCount as the limit
    const { data: allCars } = await getCars(1, totalCount);

    return allCars;
  };

  // Manually trigger the storage event
  const triggerStorageEvent = (key: string, value: string) => {
    const event = new StorageEvent('storage', {
      key,
      newValue: value,
      oldValue: null,
      storageArea: localStorage,
      url: window.location.href,
    });
    window.dispatchEvent(event);
  };

  // handleStartRace is used to handle the start race logic
  const handleStartRace = async () => {
    setLoading(true);
    const cars = await fetchAllCars();
    console.log(cars);

    if (cars.length === 0) {
      setToastMessage('No cars available');
    } else if (cars.length === 1) {
      setToastMessage('At least two cars are required to start a race');
    } else {
      setToastMessage('Race started');
      setCars(cars); // Update the cars in context
      setRaceStarted(true); // Update the raceStarted state in context
    }

    // Start engine and set drive mode for all cars concurrently
    const carsWithTime = await Promise.all(
      cars.map(async (car: any) => {
        try {
          const { velocity, distance } = await startEngine(car.id);
          const timeInMs = distance / velocity;
          const timeInSec = parseFloat((timeInMs / 1000).toFixed(2));
          console.log(timeInSec);

          // Save engine data to local storage
          localStorage.setItem(`${car.id}-engineStatus`, JSON.stringify(true));
          triggerStorageEvent(`${car.id}-engineStatus`, JSON.stringify(true));
          localStorage.setItem(
            `${car.id}-engineVelocity`,
            JSON.stringify(velocity)
          );
          triggerStorageEvent(
            `${car.id}-engineVelocity`,
            JSON.stringify(velocity)
          );
          localStorage.setItem(
            `${car.id}-timeInSeconds`,
            JSON.stringify(timeInSec)
          );
          triggerStorageEvent(
            `${car.id}-timeInSeconds`,
            JSON.stringify(timeInSec)
          );

          const { success } = await setDriveMode(car.id);
          if (success) {
            localStorage.setItem(`${car.id}-driveMode`, JSON.stringify(true));
            triggerStorageEvent(`${car.id}-driveMode`, JSON.stringify(true));
          } else {
            throw new Error('Failed to set drive mode');
          }

          return { ...car, time: timeInSec };
        } catch (error) {
          console.error(
            `Failed to start engine or set drive mode for car ${car.id}:`,
            error
          );
          setToastMessage(
            `Failed to start engine or set drive mode for car ${car.id}`
          );
          return { ...car, time: Infinity }; // Assign a high time to indicate failure
        }
      })
    );

    // Find the car with the minimal time
    const winner = carsWithTime.reduce(
      (min, car) => (car.time < min.time ? car : min),
      carsWithTime[0]
    );

    // if there is a winner, show the toast message
    if (winner) {
      setToastMessage(
        `Winner is a car with id ${winner.id} with a time of ${winner.time}`
      );
    }

    // create the winner if it does not exist or update the winner if it does exist
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
    setLoading(false);
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
      {loading ? (
        <Button
          variant="outline"
          disabled
        >
          Racing...
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={handleStartRace}
        >
          Start Race
        </Button>
      )}
    </>
  );
}

export default StartRace;
