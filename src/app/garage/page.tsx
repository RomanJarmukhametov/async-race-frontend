'use client';

import React from 'react';
import useSWR from 'swr';
import Wrapper from '@/components/custom/Wrapper';
import Heading from '@/components/custom/Heading';
import BodyText from '@/components/custom/BodyText';
import GarageCarList from '@/components/custom/GarageCarList';
import { getCars } from '@/lib/api/garage';
import CarProps from '@/types/CarProps';

const fetcher = () => getCars();

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
    </Wrapper>
  );
}

export default GaragePage;
