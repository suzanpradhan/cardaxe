import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if ((action.payload as any)?.status == 401) {
      // toast.error('Unauthorized');
      signOut({ callbackUrl: '/login', redirect: true });
    }
  }

  return next(action);
};
