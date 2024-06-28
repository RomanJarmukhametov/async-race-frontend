import React, { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

interface TableHeadProps {
  children: ReactNode;
}

interface TableBodyProps {
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
}

interface TableCellProps {
  children: ReactNode;
  isHeader?: boolean;
}

export function Table({ children }: TableProps): JSX.Element {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: TableHeadProps): JSX.Element {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      {children}
    </thead>
  );
}

export function TableBody({ children }: TableBodyProps): JSX.Element {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: TableRowProps): JSX.Element {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  isHeader = false,
}: TableCellProps): JSX.Element {
  if (isHeader) {
    return (
      <th
        scope="col"
        className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {children}
      </th>
    );
  }
  return <td className="px-6 py-4">{children}</td>;
}
