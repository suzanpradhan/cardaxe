'use client';

import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState<Boolean>(false);
  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error) {
        router.push('/login');
        return;
      }
      setIsSuccess(true);
    })();
  }, []);

  if (!isSuccess) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <header>Navigation</header>
      {children}
    </main>
  );
}

async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get('/api/auth/getUser');
    console.log(data);
    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;
    return {
      user: null,
      error,
    };
  }
}
