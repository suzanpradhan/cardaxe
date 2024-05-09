'use client';
import AppBar from '@/components/dashboard/AppBar';
import PreviewSection from '@/components/myCards/PreviewSection';
import SideBarMyCards from '@/components/myCards/SideBarMyCards';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');

  return (
    <div className="p-6 flex flex-col gap-6">
      {<AppBar cardId={cardId} />}
      <div className="flex gap-6">
        <SideBarMyCards cardId={cardId} />
        <div className="basis-2/5 min-w-[100px]">{children}</div>
        <PreviewSection />
      </div>
    </div>
  );
};

export default BuilderLayout;
