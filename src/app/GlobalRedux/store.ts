'use client';

import { configureStore } from '@reduxjs/toolkit';
import cardSlice from './Features/cardSlice';

export const store = configureStore({
  reducer: {
    card: cardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
