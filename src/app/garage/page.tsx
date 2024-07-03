'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { RaceProvider } from '@/context/RaceContext';
import useSWR from 'swr';
import Wrapper from '@/components/custom/Wrapper';
import Heading from '@/components/custom/Heading';
import BodyText from '@/components/custom/BodyText';
import GarageCarList from '@/components/custom/GarageCarList';
import PaginationComponent from '@/components/custom/PaginationComponent';
import GenerateCars from '@/components/custom/GenerateCars';
import StartRace from '@/components/custom/StartRace';
import ResetRace from '@/components/custom/ResetRace';
import { getCars } from '@/lib/api/garage';
import CarProps from '@/types/CarProps';

const CARS_PER_PAGE = 7;

const fetcher = (page: number) => getCars(page, CARS_PER_PAGE);

/* GaragePage is a component that is used to display the garage page */
function GaragePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect is used to set the current page based on the search params
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(page);
  }, [searchParams]);

  // useSWR is used to fetch the cars from the server
  const { data, error, isLoading } = useSWR<{
    data: CarProps[];
    totalCount: number;
  }>(`/garage?page=${currentPage}`, () => fetcher(currentPage), {
    refreshInterval: 1000,
  });

  // handlePageChange is used to handle the page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/garage?page=${page}`);
  };

  // if the data is not available, show a loading spinner
  if (!data) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
        <div className="animate-spin h-12 w-12 border-t-4 border-gray-600 rounded-full" />
      </div>
    );
  }

  // if the data is not available, show a loading spinner
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
        <div className="animate-spin h-12 w-12 border-t-4 border-gray-600 rounded-full" />
      </div>
    );
  }

  // if there is an error, show the error message
  if (error) {
    return <div>{error.message}</div>;
  }

  // calculate the total pages
  const totalPages = Math.ceil(data.totalCount / CARS_PER_PAGE);

  return (
    <RaceProvider>
      <Wrapper as="section">
        <Heading level="1">Garage</Heading>
        <div className="flex flex-row items-center justify-between">
          <BodyText size="large">Total cars: {data.totalCount}</BodyText>
          <div className="flex flex-row items-center justify-between gap-4">
            <GenerateCars />
            <ResetRace />
            <StartRace />
          </div>
        </div>

        <GarageCarList cars={data.data} />
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Wrapper>
    </RaceProvider>
  );
}

export default GaragePage;
