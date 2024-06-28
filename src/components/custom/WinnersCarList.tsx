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

interface WinnersCarListProps {
  winners: GetWinnersParams[];
  onSortChange: (field: 'wins' | 'time') => void;
  sortField?: 'wins' | 'time';
  sortOrder?: 'ASC' | 'DESC';
}

/**
 * The `WinnersCarList` component is a table that displays a list of winners with their car names and colors.
 * It uses the `useEffect` hook to fetch the car names and colors from the garage for each winner.
 * The `sortedWinners` function sorts the `winners` array based on the `sortField` and `sortOrder`
 * parameters.
 */
function WinnersCarList({
  winners,
  onSortChange,
  sortField,
  sortOrder,
}: WinnersCarListProps) {
  const [carNames, setCarNames] = useState<{ [key: number]: string }>({});
  const [carColors, setCarColors] = useState<{ [key: number]: string }>({});

  /**
   * The `useEffect` hook is used to fetch the car names and colors from the garage for each winner
   * in the `winners` array.
   */
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

  /**
   * The function `sortedWinners` sorts the `winners` array based on the `sortField` and `sortOrder`
   * parameters.
   * @returns The function `sortedWinners` returns a sorted array of `winners` based on the `sortField`
   * and `sortOrder` parameters.
   */
  const sortedWinners = [...winners].sort((a, b) => {
    if (sortField) {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      if (sortOrder === 'ASC') {
        return fieldA > fieldB ? 1 : -1;
      }
      return fieldA < fieldB ? 1 : -1;
    }
    return 0;
  });

  /**
   * The function `renderSortIcon` returns an arrow icon ('↑' or '↓') based on the sorting field and
   * order.
   * @param {'wins' | 'time'} field - The `field` parameter in the `renderSortIcon` function can have a
   * value of either `'wins'` or `'time'`.
   * @returns The function `renderSortIcon` returns either '↑' or '↓' if the `sortField` is equal to the
   * `field` parameter and the `sortOrder` is 'ASC', otherwise it returns an empty string.
   */
  const renderSortIcon = (field: 'wins' | 'time') => {
    if (sortField === field) {
      return sortOrder === 'ASC' ? '↑' : '↓';
    }
    return '↕'; // Default icon indicating sortable field
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell isHeader>Car ID</TableCell>
          <TableCell isHeader>Car Name</TableCell>
          <TableCell
            isHeader
            onClick={() => onSortChange('wins')}
          >
            <div className="cursor-pointer">
              Total Wins
              <span className="ml-2">{renderSortIcon('wins')}</span>
            </div>
          </TableCell>
          <TableCell
            isHeader
            onClick={() => onSortChange('time')}
          >
            <div className="cursor-pointer">
              Time
              <span className="ml-2">{renderSortIcon('time')}</span>
            </div>
          </TableCell>
          <TableCell isHeader>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedWinners.map((winner) => (
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
