interface AppBarProps {
  children: React.ReactNode;
  appBarLabel: string;
}

const AppBar = ({ children, appBarLabel }: AppBarProps) => {
  return (
    <div className="flex w-full gap-3 h-[3.25rem] ">
      <div className="px-2 grow h-full bg-componentBgGrey rounded-lg flex items-center gap-2">
        <p className="inline text-grayfont">Label:</p>
        <h2 className="inline font-extrabold">{appBarLabel}</h2>
      </div>
      {children}
    </div>
  );
};

export default AppBar;
