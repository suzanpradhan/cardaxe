import React from 'react';
import BuilderLayout from './(components)/BuilderLayout';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <BuilderLayout>{children}</BuilderLayout>
    </div>
  );
};

export default layout;
