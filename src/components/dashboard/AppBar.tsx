import React from 'react';

const appBarLabel = 'My Personal Card';

const AppBar = () => {
  return (
    <div className="flex w-full gap-3 h-14 ">
      <div className="px-2 grow h-full bg-componentBgGrey rounded-lg flex items-center gap-2">
        <p className="inline text-slate-500">Label:</p>
        <h2 className="inline font-extrabold">{appBarLabel}</h2>
      </div>
      <button className="w-28 bg-input rounded-lg p-2  ring-1 ring-gray-300">
        Save Draft
      </button>
      <button className="w-28 bg-blue-500 text-white  rounded-lg shadow-lg shadow-blue-300">
        Publish
      </button>
    </div>
  );
};

export default AppBar;
