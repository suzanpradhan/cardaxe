interface AppBarProps {
  children: React.ReactNode;
  appBarLabel: string;
}

const AppBar = ({ children, appBarLabel }: AppBarProps) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full gap-3 h-auto">
      <div className="shrink-0 flex-grow flex items-center h-10 gap-2 bg-componentBgGrey rounded-md px-5">
        <p className="text-grayfont inline-block text-sm">Label:</p>
        <h2 className="inline-block font-bold text-sm">{appBarLabel}</h2>
      </div>
      <div className="flex gap-3">{children}</div>
    </div>
  );
};

export default AppBar;
