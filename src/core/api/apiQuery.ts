import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPaths } from '../api/apiConstants';
import { setHeaders } from './apiClient';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiPaths.baseUrl}`,
    prepareHeaders: async (headers: Headers) => await setHeaders(headers),
  }),
  tagTypes: ['CardsList', 'Card', 'CardLayout', 'CardLayoutList', 'User', 'MyCardList', 'Connections'],
  endpoints: () => ({}),

});

