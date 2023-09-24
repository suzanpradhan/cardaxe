import React from 'react';

const CardHomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-120 rounded-xl bg-[#323647] p-4 text-white flex flex-col shadow-grayfont shadow-lg">
      {children}
    </div>
  );
};

export default CardHomeLayout;
