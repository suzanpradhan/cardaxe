interface AppBarProps {
  children: React.ReactNode;
  appBarLabel: string;
}

const AppBar = ({ children, appBarLabel }: AppBarProps) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full gap-3 lg:h-[3.25rem] h-auto">
      <div className="px-2 grow h-full bg-componentBgGrey rounded-lg flex items-center py-2 gap-2 basis-10/12 lg:basis-auto">
        <p className=" text-grayfont inline">Label:</p>
        <h2 className="inline font-extrabold ">{appBarLabel}</h2>
      </div>
      {children}
    </div>
  );
};

export default AppBar;
