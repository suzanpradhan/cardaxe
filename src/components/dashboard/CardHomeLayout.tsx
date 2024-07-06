import React from 'react';

const CardHomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-52 lg:h-60 2xl:h-72 rounded-md bg-slate-700 p-5 text-white flex flex-col shadow-zinc-300 shadow-lg">
      {children}
    </div>
  );
};

export default CardHomeLayout;
