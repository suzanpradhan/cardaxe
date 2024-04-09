
import { CardTemplatesType, SnakeCardContentType } from '@/core/types/appTypes';
import { apiPaths } from './apiConstants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cardaxeApi = createApi({
  reducerPath: 'cardaxeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiPaths.baseUrl}`,
  }),
  tagTypes: [],
  endpoints: () => ({}),
  // endpoints: (builder) => ({
  //   getCards: builder.query<CardTemplatesType[], string>({
  //     query: () => `${apiPaths.getCardTemplates}`,
  //   }),

  //   updateContents: builder.mutation<Record<string, any>, Record<string, any>>({
  //     query: ({ id, ...cardDesign }) => ({
  //       url: `${apiPaths.updateContent}${id}/`,
  //       method: 'PUT',
  //       body: cardDesign,
  //     }),
  //     transformResponse: (response: { data: SnakeCardContentType }) =>
  //       response.data,
  //     transformErrorResponse: (
  //       response: { status: string | number }
  //       // meta,
  //       // arg
  //     ) => response.status,
  //   }),
  // }),
});

// export const { useGetCardsQuery, useUpdateContentsMutation } = cardApi;
