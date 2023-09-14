'use client';

import { configureStore } from '@reduxjs/toolkit';
import cardSlice from './Features/cardSlice';
import { cardApi } from '../api/redux/api';

export const store = configureStore({
  reducer: {
    
    [cardApi.reducerPath]: cardApi.reducer,
    card: cardSlice,

  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(cardApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
