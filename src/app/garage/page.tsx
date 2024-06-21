'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/custom/Wrapper';
import Heading from '@/components/custom/Heading';
import BodyText from '@/components/custom/BodyText';
import GarageCarList from '@/components/custom/GarageCarList';
import { getCars } from '@/lib/api/garage';
import CarProps from '@/types/CarProps';

function GaragePage() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setCars(data.data);
        setTotalCount(data.totalCount);
      } catch (err) {
        setError('Failed to fetch cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
        <div className="animate-spin h-12 w-12 border-t-4 border-gray-600 rounded-full" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Wrapper as="section">
      <Heading level="1">Garage</Heading>
      <BodyText size="large">Total cars: {totalCount}</BodyText>
      <GarageCarList cars={cars} />
    </Wrapper>
  );
}

export default GaragePage;
