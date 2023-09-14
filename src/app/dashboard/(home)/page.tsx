'use client';
import CardTemplate from '@/components/myCards/CardTemplate';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const DashboardPage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('./changeCurrentPassword');
  };
  return (
    <div className="p-4 ">
      <CardTemplate />
      <button onClick={() => handleClick()}>Change password</button>
      <button onClick={() => signOut()}>signout</button>
    </div>
  );
};

export default DashboardPage;
