'use client';
import CardTemplate from '@/components/myCards/CardTemplate';
import { signOut } from 'next-auth/react';
import React from 'react';

const page = () => {
  return (
    <div className="p-4 ">
      <CardTemplate />
      <button onClick={() => signOut()}>signout</button>
    </div>
  );
};

export default page;
