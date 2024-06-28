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

const WINNERS_PER_PAGE = 10;

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'wins' | 'time' | undefined>(
    undefined
  );
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | undefined>(
    undefined
  );

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(page);
  }, [searchParams]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/winners?page=${page}`);
  };

  const handleSortChange = (field: 'wins' | 'time') => {
    const newOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortField(field);
    setSortOrder(newOrder);
  };

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
    return <div>{error.message}</div>;
  }

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
