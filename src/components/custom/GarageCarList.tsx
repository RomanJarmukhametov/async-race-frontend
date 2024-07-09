'use client';

import React, { useState, useEffect } from 'react';

import CarDelete from '@/components/custom/CarDelete';
import CarEdit from '@/components/custom/CarEdit';
import EngineControl from '@/components/custom/EngineControl';
import CarProps from '@/types/CarProps';
import BodyText from '@/components/custom/BodyText';
// import { getCarsInDriveMode } from '@/lib/getCarsInDriveMode';

interface GarageCarListProps {
  cars: CarProps[];
}

/* The `GarageCarList` function is a React functional component that takes in a prop object `cars` of
type `GarageCarListProps`. Inside the function, it returns JSX code that iterates over the `cars`
array using the `map` function to create a list of car elements. */
function GarageCarList({ cars }: GarageCarListProps) {
  const [driveModes, setDriveModes] = useState<{ [key: number]: boolean }>({});
  const [durations, setDurations] = useState<{ [key: number]: number }>({});

  // Initialize driveModes from local storage
  useEffect(() => {
    const loadDriveModesAndDurations = () => {
      const initialDriveModes: { [key: number]: boolean } = {};
      const initialDurations: { [key: number]: number } = {};
      Object.keys(localStorage).forEach((key) => {
        if (key.endsWith('-driveMode')) {
          const carId = parseInt(key.split('-')[0], 10);
          const isInDriveMode = localStorage.getItem(key) === 'true';
          initialDriveModes[carId] = isInDriveMode;
        } else if (key.endsWith('-timeInSeconds')) {
          const carId = parseInt(key.split('-')[0], 10);
          const timeInSeconds = parseFloat(localStorage.getItem(key) || '0');
          initialDurations[carId] = timeInSeconds * 1000; // Convert to milliseconds
        }
      });
      setDriveModes(initialDriveModes);
      setDurations(initialDurations);
    };

    loadDriveModesAndDurations();

    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key &&
        (event.key.endsWith('-driveMode') ||
          event.key.endsWith('-timeInSeconds'))
      ) {
        loadDriveModesAndDurations();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleDriveModeChange = (carId: number, isInDriveMode: boolean) => {
    setDriveModes((prev) => ({ ...prev, [carId]: isInDriveMode }));
    localStorage.setItem(`${carId}-driveMode`, isInDriveMode.toString());
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col">
        {cars.map((car) => {
          const duration = durations[car.id] ? durations[car.id] + 5000 : 3000; // Add 5000ms for smoothness, default to 3000ms if not set
          console.log('duration of ', car.id, duration);
          const durationClass = `duration-[${duration}ms]`;
          const shouldMove = driveModes[car.id];

          return (
            <div
              key={car.id}
              className="flex flex-row mb-3 w-full"
            >
              <div className="flex flex-col border border-gray-200 rounded-md p-4 w-full">
                <div className="flex - flex-row gap-3">
                  <div className="flex flex-row gap-2 mb-2">
                    <BodyText size="small">{car.id}</BodyText>
                    <BodyText size="small">{car.name}</BodyText>
                  </div>
                  <div className="flex flex-row gap-2 items-center mb-3">
                    <CarEdit
                      carId={car.id}
                      name={car.name}
                      color={car.color}
                    />
                    <CarDelete carId={car.id} />
                  </div>
                </div>

                <div className="flex flex-row gap-2 items-center mb-3">
                  <EngineControl
                    carId={car.id}
                    name={car.name}
                    onDriveModeChange={handleDriveModeChange}
                  />
                </div>

                <div className="w-full">
                  <p
                    className={`h-10 text-xl text-bold transition-transform text-gray-950 ${durationClass} ${
                      shouldMove ? 'translate-x-[calc(100%-2.5rem)]' : ''
                    }`}
                    style={{ color: car.color }}
                  >
                    CAR
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GarageCarList;
