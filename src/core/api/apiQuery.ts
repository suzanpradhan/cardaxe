import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPaths } from '../api/apiConstants';
import { setHeaders } from './apiClient';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiPaths.baseUrl}`,
    prepareHeaders: async (headers) => await setHeaders(headers),
  }),
  tagTypes: ['Countries', 'Posts', 'CommentLikes', 'PostLikes', 'Signup', 'PopularPosts'],
  endpoints: () => ({}),

});

