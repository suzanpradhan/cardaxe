import React from 'react';

const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full h-60 rounded-lg p-6 grid grid-cols-2 mx-auto relative bg-transparent 2xl:h-72 2xl:w-130">
      {children}
    </div>
  );
};

export default CardLayout;
