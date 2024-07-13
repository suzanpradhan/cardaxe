interface AppBarProps {
  children: React.ReactNode;
  appBarLabel: string;
}

const AppBar = ({ children, appBarLabel }: AppBarProps) => {
  return (
    <div className="my-4 flex h-auto w-full gap-3 max-md:flex-col">
      <div className="flex h-10 shrink-0 flex-grow items-center gap-2 rounded-md bg-zinc-100 px-4">
        <p className="inline-block text-sm text-grayfont">Label:</p>
        <h2 className="inline-block text-sm font-bold">{appBarLabel}</h2>
      </div>
      <div className="flex items-center justify-between gap-2 max-md:grow">
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
