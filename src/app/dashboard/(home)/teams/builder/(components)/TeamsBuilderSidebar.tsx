import { DocumentText1, Grid7 } from 'iconsax-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TeamsBuilderSidebarProps {
  cardId: string | null;
  cardAction?: string | null;
  //   cardState: CardState<string>;
}

const MY_APP_SIDE_BAR_ELEMENTS = [
  {
    icon: <DocumentText1 variant="Bulk" size={'auto'} />,
    name: 'Layouts',
    link: '',
  },
  {
    icon: <Grid7 variant="Bulk" size={'auto'} />,
    // formName: 'cardFields',
    name: 'Designs',
    link: 'design',
  },
];

const TeamsBuilderSidebar = ({
  cardId,
  cardAction,
  //   cardState,
}: TeamsBuilderSidebarProps) => {
  const [toggleTab, setToggleTab] = useState<number>(0);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName.endsWith(`/builder`)) {
      setToggleTab(0);
    } else if (pathName.endsWith(`/builder/design`)) {
      setToggleTab(1);
    }
  }, [pathName]);
  const sideBarElements = MY_APP_SIDE_BAR_ELEMENTS;
  return (
    <div className="flex justify-between text-sm text-slate-600 lg:flex-col lg:justify-start lg:gap-4 lg:text-base">
      {sideBarElements.map((item, index) => {
        // const error = item.formName
        //   ? Object.keys(
        //       (cardState[item.formName! as keyof CardState<string>] as any)
        //         ?.errors
        //     ).length !== 0
        //   : undefined;

        return (
          <Link
            key={index}
            href={`/dashboard/teams/builder/${item.link}`}
            className={`flex aspect-rectangle flex-grow flex-col items-center justify-center rounded-lg max-lg:py-1 xs:flex-row lg:aspect-square lg:flex-col ${
              toggleTab !== index
                ? 'hover:border-text-grayfont text-grayfont'
                : 'border-blueTheme/60 bg-blueBg/60 text-blueTheme hover:border-blueTheme/80'
            } `}
            // className={`flex aspect-rectangle flex-grow flex-col items-center justify-center rounded-lg max-lg:py-1 xs:flex-row lg:aspect-square lg:flex-col ${
            //   toggleTab !== index
            //     ? 'hover:border-text-grayfont text-grayfont'
            //     : error
            //       ? 'text-red-500 hover:border-rose-300 hover:text-red-600'
            //       : 'border-blueTheme/60 bg-blueBg/60 text-blueTheme hover:border-blueTheme/80'
            // } ${
            //   error
            //     ? 'border-rose-200 text-red-500 hover:border-rose-300 hover:text-red-600'
            //     : 'border-transparent hover:border-blueTheme hover:text-blueTheme'
            // }`}
          >
            <span className="h-7 w-7">{item.icon}</span>
            <p className="text-xs font-medium md:text-sm">{item.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default TeamsBuilderSidebar;
