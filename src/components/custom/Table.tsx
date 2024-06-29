import React from 'react';
import {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
} from '@/types/TableProps';

export function Table({ children }: TableProps): JSX.Element {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-base text-left rtl:text-right text-gray-500">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: TableHeadProps): JSX.Element {
  return (
    <thead className="text-base text-gray-500 uppercase bg-gray-50">
      {children}
    </thead>
  );
}

export function TableBody({ children }: TableBodyProps): JSX.Element {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: TableRowProps): JSX.Element {
  return <tr className="bg-white border-b">{children}</tr>;
}

export function TableCell({
  children,
  isHeader = false,
  onClick,
  width,
  className,
}: TableCellProps): JSX.Element {
  const style = width ? { width } : {};

  if (isHeader) {
    return (
      <th
        scope="col"
        className="px-6 py-3 font-medium text-gray-500 whitespace-nowrap border-[1px] border-gray-200"
        onClick={onClick}
        style={style} // Apply width style
      >
        {children}
      </th>
    );
  }
  return (
    <td
      className={`px-6 py-4 ${className}`}
      style={style}
    >
      {children}
    </td>
  );
}
