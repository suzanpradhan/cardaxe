'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const MyCardsPage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/dashboard/builder/`);
  };
  return (
    <div>
      my cards
      <button onClick={() => handleClick()}>edit</button>
    </div>
  );
};

export default MyCardsPage;
