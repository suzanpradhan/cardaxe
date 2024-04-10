'use client';

import { configureStore } from '@reduxjs/toolkit';
import cardSlice from '../../app/GlobalRedux/Features/cardSlice';
import { baseApi } from '../api/apiQuery';
import { rtkQueryErrorLogger } from '../api/apiMiddleWare';


export const store = configureStore({
  reducer: {
    baseApi:baseApi.reducer,
    // [cardApi.reducerPath]: cardApi.reducer,
    card: cardSlice,

  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(baseApi.middleware).concat(rtkQueryErrorLogger);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
