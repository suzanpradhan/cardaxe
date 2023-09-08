'use client';
import CardTemplate from '@/components/myCards/CardTemplate';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const page = () => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push('./changeCurrentPassword');
  };
  return (
    <div className="p-4 ">
      <CardTemplate />
      <button onClick={(e) => handleClick(e)}>Change password</button>
      <button onClick={() => signOut()}>signout</button>
    </div>
  );
};

export default page;
