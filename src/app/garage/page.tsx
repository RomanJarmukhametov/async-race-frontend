'use client';

import React, { useEffect, useState } from 'react';
import { getCars } from '@/lib/api/garage';
import CarProps from '@/types/CarProps';

function HomePage() {
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
    <div>
      <h1>Garage</h1>
      <p>Total cars: {totalCount}</p>
      {/* Render a list of cars */}
      {cars.map((car) => (
        <div key={car.id}>
          <h2>{car.name}</h2>
          <p>{car.color}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
