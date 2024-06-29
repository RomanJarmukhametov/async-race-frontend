import { ReactNode } from 'react';

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
  onClick?: () => void;
  width?: string;
  className?: string;
}

export type {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
};
