'use client';

import { useGetCardsQuery } from '@/app/api/redux/api';

import React from 'react';

const layouts = () => {
  const { isLoading, isError, isSuccess, data, error } = useGetCardsQuery('');
  
  return <div>{data && data[0].html_code}</div>;
};

export default layouts;
