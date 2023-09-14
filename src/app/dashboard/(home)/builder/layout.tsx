'use client';
import AppBar from '@/components/dashboard/AppBar';
import PreviewSection from '@/components/myCards/PreviewSection';
import SideBarMyCards from '@/components/myCards/SideBarMyCards';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <AppBar />
      <div className="flex gap-6">
        <SideBarMyCards />
        <div className="basis-2/5 min-w-[100px]">{children}</div>
        <PreviewSection />
      </div>
    </div>
  );
};

export default layout;
