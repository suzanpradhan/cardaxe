'use client';

import { configureStore } from '@reduxjs/toolkit';
import cardSlice from '../../module/cards/cardSlice';
import { rtkQueryErrorLogger } from '../api/apiMiddleWare';
import { baseApi } from '../api/apiQuery';


export const store = configureStore({
  reducer: {
    baseApi: baseApi.reducer,
    // [cardApi.reducerPath]: cardApi.reducer,
    card: cardSlice,

  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(baseApi.middleware).concat(rtkQueryErrorLogger);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
