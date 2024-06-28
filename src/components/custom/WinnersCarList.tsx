import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/custom/Table';

import GetWinnersParams from '@/types/GetWinnersParams';

function WinnersCarList({ winners }: { winners: GetWinnersParams[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell isHeader>Car ID</TableCell>
          <TableCell isHeader>Total Wins</TableCell>
          <TableCell isHeader>Time</TableCell>
          <TableCell isHeader>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {winners.map((winner) => (
          <TableRow key={winner.id}>
            <TableCell>{winner.id}</TableCell>
            <TableCell>{winner.wins}</TableCell>
            <TableCell>{winner.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default WinnersCarList;
