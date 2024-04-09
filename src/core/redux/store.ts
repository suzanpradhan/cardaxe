'use client';

import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../../modules/card/cardReducer';

import { rtkQueryErrorLogger } from '../api/apiMiddleware';
import { cardaxeApi } from '../api/apiQuery';

export const store = configureStore({
  reducer: {
    cardaxeApi: cardaxeApi.reducer,
    // [cardaxeApi.reducerPath]: cardaxeApi.reducer,
    card: cardReducer,

  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(cardaxeApi.middleware).concat(rtkQueryErrorLogger);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
