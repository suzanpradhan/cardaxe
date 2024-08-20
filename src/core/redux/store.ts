'use client';

import { configureStore } from '@reduxjs/toolkit';
import cardSlice from '../../module/cards/cardSlice';

import teamTemplateSlice from '@/module/teams/teamTemplateSlice';
import { rtkQueryErrorLogger } from '../api/apiMiddleWare';
import { baseApi } from '../api/apiQuery';


export const store = () => {
  return configureStore({
    reducer: {
      baseApi: baseApi.reducer,
      // [cardApi.reducerPath]: cardApi.reducer,
      card: cardSlice,
      teamTemplate: teamTemplateSlice
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(baseApi.middleware).concat(rtkQueryErrorLogger);
    },
  })
};

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
