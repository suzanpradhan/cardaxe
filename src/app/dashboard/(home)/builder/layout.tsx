import React from 'react';
import BuilderLayout from './(components)/BuilderLayout copy';

const layout = ({ children }: { children: React.ReactNode }) => {
  return <BuilderLayout>{children}</BuilderLayout>;
};

export default layout;
