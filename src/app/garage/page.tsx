'use client';

import React from 'react';
import useSWR from 'swr';
import Wrapper from '@/components/custom/Wrapper';
import Heading from '@/components/custom/Heading';
import BodyText from '@/components/custom/BodyText';
import GarageCarList from '@/components/custom/GarageCarList';
import { getCars } from '@/lib/api/garage';
import CarProps from '@/types/CarProps';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const fetcher = () => getCars(2);

function GaragePage() {
  const { data, error, isLoading } = useSWR<{
    data: CarProps[];
    totalCount: number;
  }>('/garage', fetcher, {
    refreshInterval: 1000,
  });

  if (!data) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
        <div className="animate-spin h-12 w-12 border-t-4 border-gray-600 rounded-full" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
        <div className="animate-spin h-12 w-12 border-t-4 border-gray-600 rounded-full" />
      </div>
    );
  }

  if (error) {
    return <div>Failed to fetch cars</div>;
  }

  return (
    <Wrapper as="section">
      <Heading level="1">Garage</Heading>
      <BodyText size="large">Total cars: {data.totalCount}</BodyText>
      <GarageCarList cars={data.data} />

      <div className="fixed bottom-5 left-0 right-0 bg-white">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Wrapper>
  );
}

export default GaragePage;
