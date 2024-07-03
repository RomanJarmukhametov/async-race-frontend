'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import Wrapper from '@/components/custom/Wrapper';
import Heading from '@/components/custom/Heading';
import BodyText from '@/components/custom/BodyText';
import WinnersCarList from '@/components/custom/WinnersCarList';
import PaginationComponent from '@/components/custom/PaginationComponent';
import { getWinners } from '@/lib/api/winners';
import GetWinnersParams from '@/types/GetWinnersParams';

// WINNERS_PER_PAGE is the number of winners per page
const WINNERS_PER_PAGE = 10;

// fetcher is used to fetch the winners from the server
const fetcher = (page: number) => {
  const params: GetWinnersParams = {
    page,
    limit: WINNERS_PER_PAGE,
    id: 0,
    wins: 0,
    time: 0,
  };
  return getWinners(params);
};

function Winners() {
  // useRouter is used to navigate to the winners page
  const router = useRouter();
  // useSearchParams is used to get the search params
  const searchParams = useSearchParams();
  // currentPage is the current page
  const [currentPage, setCurrentPage] = useState(1);
  // sortField is the field to sort the winners by
  const [sortField, setSortField] = useState<'wins' | 'time' | undefined>(
    undefined
  );
  // sortOrder is the order to sort the winners by
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | undefined>(
    undefined
  );

  // useEffect is used to set the current page based on the search params
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(page);
  }, [searchParams]);

  // useSWR is used to fetch the winners from the server
  const { data, error, isLoading } = useSWR<{
    data: GetWinnersParams[];
    totalCount: number;
  }>(
    `/winners?page=${currentPage}&sort=${sortField}&order=${sortOrder}`,
    () => fetcher(currentPage),
    {
      refreshInterval: 5000,
    }
  );

  // handlePageChange is used to handle the page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/winners?page=${page}`);
  };

  // handleSortChange is used to handle the sort change
  const handleSortChange = (field: 'wins' | 'time') => {
    const newOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortField(field);
    setSortOrder(newOrder);
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
  const totalPages = Math.ceil(data.totalCount / WINNERS_PER_PAGE);

  return (
    <Wrapper as="section">
      <Heading level="1">Winners</Heading>
      <div className="flex flex-row items-center justify-between">
        <BodyText size="large">Total winners: {data.totalCount}</BodyText>
      </div>
      <WinnersCarList
        winners={data.data}
        onSortChange={handleSortChange}
        sortField={sortField}
        sortOrder={sortOrder}
      />

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Wrapper>
  );
}

export default Winners;
