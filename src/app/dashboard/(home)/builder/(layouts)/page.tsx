'use client';

import { useGetCardsQuery } from '@/core/redux/api';
import Parser from 'react-html-parser';

import React from 'react';

const LayoutPage = () => {
  const { isLoading, isError, isSuccess, data, error } = useGetCardsQuery('');

  return (
    <div>
      {isSuccess && data && Parser(data[0].html_code)}
      {isLoading && 'Loading...'}
      {isError && error && 'Error...'}
    </div>
  );
};

export default LayoutPage;
