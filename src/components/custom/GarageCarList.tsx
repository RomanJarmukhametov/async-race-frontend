import React from 'react';

import CarIcon from '@/components/custom/CarIcon';
import CarDelete from '@/components/custom/CarDelete';
import CarEdit from '@/components/custom/CarEdit';
import EngineControl from '@/components/custom/EngineControl';
import CarProps from '@/types/CarProps';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/custom/Table';

interface GarageCarListProps {
  cars: CarProps[];
}

/* The `GarageCarList` function is a React functional component that takes in a prop object `cars` of
type `GarageCarListProps`. Inside the function, it returns JSX code that iterates over the `cars`
array using the `map` function to create a list of car elements. */
function GarageCarList({ cars }: GarageCarListProps) {
  return (
    <div className="mt-6 space-y-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell isHeader>Car ID</TableCell>
            <TableCell isHeader>Car Name</TableCell>
            <TableCell isHeader>Actions</TableCell>
            <TableCell isHeader>Engine Control</TableCell>
            <TableCell isHeader>Car Display</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>{car.id}</TableCell>
              <TableCell>{car.name}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <CarDelete
                    carId={car.id}
                    name={car.name}
                  />
                  <CarEdit
                    carId={car.id}
                    name={car.name}
                    color={car.color}
                  />
                </div>
              </TableCell>
              <TableCell>
                <EngineControl
                  carId={car.id}
                  name={car.name}
                />
              </TableCell>
              <TableCell>
                <CarIcon color={car.color} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default GarageCarList;
