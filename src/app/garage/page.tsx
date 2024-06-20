'use client';

import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/custom/Wrapper';
import Heading from '@/components/custom/Heading';
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Wrapper as="section">
      <Heading level="1">Garage</Heading>
      <p>Total cars: {totalCount}</p>
      {/* Render a list of cars */}
      {cars.map((car) => (
        <div key={car.id}>
          <h2>{car.name}</h2>
          <p>{car.color}</p>
        </div>
      ))}
    </Wrapper>
  );
}

export default GaragePage;
