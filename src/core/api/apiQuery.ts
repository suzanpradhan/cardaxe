import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPaths } from '../api/apiConstants';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiPaths.baseUrl}`,
  }),
  tagTypes: ['Countries', 'Posts', 'CommentLikes', 'PostLikes', 'Signup', 'PopularPosts'],
  endpoints: () => ({}),
//   endpoints: (builder) => ({
//     getCards: builder.query<CardTemplatesType[], string>({
//       query: () => `${apiPaths.getCardTemplates}`,
//     }),


//   }),
});

// export const { useGetCardsQuery, useUpdateContentsMutation } = cardApi;
