'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const page = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/dashboard/myCards/builder/`);
  };
  return (
    <div>
      my cards
      <button onClick={() => handleClick()}>edit</button>
    </div>
  );
};

export default page;
