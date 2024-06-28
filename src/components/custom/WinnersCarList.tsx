'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/custom/Table';

import CarIcon from '@/components/custom/CarIcon';

import WinnerDelete from '@/components/custom/WinnerDelete';

import { getCarById } from '@/lib/api/garage';

import GetWinnersParams from '@/types/GetWinnersParams';

function WinnersCarList({ winners }: { winners: GetWinnersParams[] }) {
  const [carNames, setCarNames] = useState<{ [key: number]: string }>({});
  const [carColors, setCarColors] = useState<{ [key: number]: string }>({});

  // Fetch car names and colors from the garage
  useEffect(() => {
    const fetchCarNamesAndColors = async () => {
      const carNamesMap: { [key: number]: string } = {};
      const carColorsMap: { [key: number]: string } = {};
      const fetchPromises = winners.map(async (winner) => {
        try {
          const car = await getCarById(winner.id);
          carNamesMap[winner.id] = car.name;
          carColorsMap[winner.id] = car.color;
        } catch (error) {
          carNamesMap[winner.id] = 'Unknown';
          carColorsMap[winner.id] = 'gray';
        }
      });
      await Promise.all(fetchPromises);
      setCarNames(carNamesMap);
      setCarColors(carColorsMap);
    };

    fetchCarNamesAndColors();
  }, [winners]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell isHeader>Car ID</TableCell>
          <TableCell isHeader>Car Name</TableCell>
          <TableCell isHeader>Total Wins</TableCell>
          <TableCell isHeader>Time</TableCell>
          <TableCell isHeader>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {winners.map((winner) => (
          <TableRow key={winner.id}>
            <TableCell>{winner.id}</TableCell>
            <TableCell>
              <CarIcon color={carColors[winner.id]} />
              {carNames[winner.id] || 'Loading...'}
            </TableCell>
            <TableCell>{winner.wins}</TableCell>
            <TableCell>{winner.time}</TableCell>
            <TableCell>
              <WinnerDelete carId={winner.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default WinnersCarList;
