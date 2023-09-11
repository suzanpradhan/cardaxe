'use client';

import { useGetCardsQuery } from '@/app/api/redux/api';
import { convertStringToHTML } from '@/utils/generalFunctions';
import Parser from 'react-html-parser';

import React from 'react';

const layouts = () => {
  const { isLoading, isError, isSuccess, data, error } = useGetCardsQuery('');

  return <div>{data && Parser(data[0].html_code)}</div>;
};

export default layouts;
