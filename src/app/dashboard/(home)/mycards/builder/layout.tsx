'use client';
import AppBar from '@/components/dashboard/AppBar';
import SideBarMyCards from '@/components/myCards/SideBarMyCards';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <AppBar />
      <div className="flex gap-6">
        <SideBarMyCards />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default layout;
