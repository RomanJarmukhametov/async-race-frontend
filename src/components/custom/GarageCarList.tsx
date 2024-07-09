'use client';

import React, { useState, useEffect } from 'react';

import CarDelete from '@/components/custom/CarDelete';
import CarEdit from '@/components/custom/CarEdit';
import EngineControl from '@/components/custom/EngineControl';
import CarProps from '@/types/CarProps';
import BodyText from '@/components/custom/BodyText';

interface GarageCarListProps {
  cars: CarProps[];
}

function GarageCarList({ cars }: GarageCarListProps) {
  const [statuses, setStatuses] = useState<{
    [key: number]: {
      engineStatus: boolean;
      velocity: number;
      driveMode: boolean;
    };
  }>({});

  // Initialize statuses from local storage
  useEffect(() => {
    const loadStatuses = () => {
      const initialStatuses: {
        [key: number]: {
          engineStatus: boolean;
          velocity: number;
          driveMode: boolean;
        };
      } = {};
      Object.keys(localStorage).forEach((key) => {
        const carId = parseInt(key.split('-')[0], 10);
        if (!initialStatuses[carId]) {
          initialStatuses[carId] = {
            engineStatus: false,
            velocity: 0,
            driveMode: false,
          };
        }
        if (key.endsWith('-engineStatus')) {
          initialStatuses[carId].engineStatus =
            localStorage.getItem(key) === 'true';
        } else if (key.endsWith('-engineVelocity')) {
          initialStatuses[carId].velocity = parseFloat(
            localStorage.getItem(key) || '0'
          );
        } else if (key.endsWith('-driveMode')) {
          initialStatuses[carId].driveMode =
            localStorage.getItem(key) === 'true';
        }
      });
      setStatuses(initialStatuses);
    };

    loadStatuses();

    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key &&
        (event.key.endsWith('-engineStatus') ||
          event.key.endsWith('-engineVelocity') ||
          event.key.endsWith('-driveMode'))
      ) {
        loadStatuses();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleDriveModeChange = (carId: number, isInDriveMode: boolean) => {
    setStatuses((prev) => ({
      ...prev,
      [carId]: { ...prev[carId], driveMode: isInDriveMode },
    }));
    localStorage.setItem(`${carId}-driveMode`, isInDriveMode.toString());
  };

  const handleEngineStatusChange = (
    carId: number,
    isEngineStarted: boolean,
    velocity: number
  ) => {
    setStatuses((prev) => ({
      ...prev,
      [carId]: { ...prev[carId], engineStatus: isEngineStarted, velocity },
    }));
    localStorage.setItem(`${carId}-engineStatus`, isEngineStarted.toString());
    localStorage.setItem(`${carId}-engineVelocity`, velocity.toString());
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col">
        {cars.map((car) => {
          const { engineStatus, velocity, driveMode } = statuses[car.id] || {
            engineStatus: false,
            velocity: 0,
            driveMode: false,
          };
          const durationMs = driveMode ? 3000 : velocity > 0 ? 5000 : 0; // Adjust duration based on engine status and drive mode
          const durationClass = `duration-[${durationMs}ms]`;

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
                    onEngineStatusChange={handleEngineStatusChange}
                  />
                </div>

                <div className="w-full">
                  <p
                    className={`h-10 text-xl text-bold transition-transform text-gray-950  ${
                      driveMode
                        ? `translate-x-[calc(100%-2.5rem)] duration-10000`
                        : engineStatus && velocity > 0
                        ? `translate-x-[calc(50%-2.5rem)] duration-14000`
                        : ''
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
