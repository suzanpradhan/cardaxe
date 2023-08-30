'use client';
import AppBar from '@/components/dashboard/AppBar';
import SideBarMyApp from '@/components/dashboard/SideBarMyApp';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 w-full flex flex-wrap gap-6">
      <AppBar />
      <SideBarMyApp />
      {children}
    </div>
  );
};

export default layout;
