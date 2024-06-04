'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, store } from './store';

interface Props {
  children: ReactNode;
}

function Providers({ children }: Props) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = store();
  }
  return (
    <Provider store={storeRef.current}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
}

export default Providers;
