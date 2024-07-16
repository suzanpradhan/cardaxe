interface AppBarProps {
  children: React.ReactNode;
  appBarLabel: string;
}

const AppBar = ({ children, appBarLabel }: AppBarProps) => {
  return (
    <div className="mx-auto mt-5 flex h-auto w-full max-w-sm flex-col gap-3 lg:max-w-none lg:flex-row">
      <div className="flex h-10 min-w-max flex-grow items-center gap-2 rounded-md bg-zinc-100 px-4">
        <p className="text-sm text-grayfont">Label:</p>
        <h2 className="text-sm font-bold">{appBarLabel}</h2>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};

export default AppBar;
