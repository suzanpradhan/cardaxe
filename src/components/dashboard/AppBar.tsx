interface AppBarProps {
  children: React.ReactNode;
  appBarLabel: string;
}

const AppBar = ({ children, appBarLabel }: AppBarProps) => {
  return (
    <div className="flex max-md:flex-col w-full gap-3 h-auto my-4">
      <div className="shrink-0 flex items-center gap-2 flex-grow h-10 bg-zinc-100 rounded-md px-4">
        <p className="text-grayfont inline-block text-sm">Label:</p>
        <h2 className="inline-block font-bold text-sm">{appBarLabel}</h2>
      </div>
      <div className="flex items-center gap-2 max-md:grow justify-between">
        {children}
      </div>
    </div>
    // <div className="col-span-12 my-4">
    //   <div className="flex items-center gap-2 flex-grow h-10 bg-zinc-100 rounded-md px-4">
    //     <p className="text-grayfont inline-block text-sm">Label:</p>
    //     <h2 className="inline-block font-bold text-sm">{appBarLabel}</h2>
    //   </div>
    // </div>
  );
};

export default AppBar;
