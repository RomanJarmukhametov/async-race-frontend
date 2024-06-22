import React from 'react';
import BodyText from '@/components/custom/BodyText';
import CarIcon from '@/components/custom/CarIcon';
import CarEdit from '@/components/custom/CarEdit';
import CarProps from '@/types/CarProps';

interface GarageCarListProps {
  cars: CarProps[];
}

/* The `GarageCarList` function is a React functional component that takes in a prop object `cars` of
type `GarageCarListProps`. Inside the function, it returns JSX code that iterates over the `cars`
array using the `map` function to create a list of car elements. */
function GarageCarList({ cars }: GarageCarListProps) {
  return (
    <div className="mt-6 space-y-4">
      {cars.map((car) => (
        <div
          key={car.id}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 items-center p-4 bg-gray-100 rounded-lg"
        >
          <div className="col-span-1">
            <BodyText size="medium">{car.id}</BodyText>
          </div>
          <div className="col-span-2">
            <div className="px-2 flex items-center lg:justify-between space-x-4">
              <BodyText size="medium">{car.name}</BodyText>
              <CarEdit
                carId={car.id}
                name={car.name}
                color={car.color}
              />
            </div>
          </div>
          <div className="col-span-1">
            <BodyText size="medium">controls</BodyText>
          </div>
          <div className="px-2 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-8 flex items-center justify-start space-x-4 border-l-2 border-r-2 border-gray-200">
            <CarIcon color={car.color} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default GarageCarList;
