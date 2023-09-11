import { CardTemplatesType, SnakeCardContentType } from '@/types/appTypes';
import { apiPaths } from '../apiConstants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiPaths.baseUrl}`,
  }),
  endpoints: (builder) => ({
    getCards: builder.query<CardTemplatesType[], string>({
      query: () => `${apiPaths.getCardTemplates}`,
    }),

    updateContents: builder.mutation<
      SnakeCardContentType,
      SnakeCardContentType
    >({
      query: ({ id, ...cardDesign }) => ({
        url: `${apiPaths.updateContent}${id}/`,
        method: 'PUT',
        body: cardDesign,
      }),
      transformResponse: (response: { data: SnakeCardContentType }) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number }
        // meta,
        // arg
      ) => response.status,
    }),
  }),
});

export const { useGetCardsQuery, useUpdateContentsMutation } = cardApi;
