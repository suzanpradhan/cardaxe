import { CardState } from '@/module/cards/cardsType';
import { BoxAdd, Colorfilter, DocumentText1, Grid7 } from 'iconsax-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type SideBarElementProps = {
  icon: React.JSX.Element;
  name: string;
  link: string;
  formName?: string;
};

interface SideBarMyCardsProps {
  cardId: string | null;
  cardAction: string | null;
  cardState: CardState<string>;
}

const MY_APP_SIDE_BAR_ELEMENTS: SideBarElementProps[] = [
  {
    icon: <DocumentText1 variant="Bulk" size={'auto'} />,
    name: 'Layouts',
    link: '',
  },
  {
    icon: <Grid7 variant="Bulk" size={'auto'} />,
    formName: 'cardFields',
    name: 'Content',
    link: 'contents',
  },
  {
    icon: <Colorfilter variant="Bulk" size={'auto'} />,
    formName: 'cardDesign',
    name: 'Design',
    link: 'designs',
  },
  {
    icon: <BoxAdd variant="Bulk" size={'auto'} />,
    formName: 'cardInfos',
    name: 'Infos',
    link: 'infos',
  },
];

const SideBarMyCards = ({
  cardId,
  cardAction,
  cardState,
}: SideBarMyCardsProps) => {
  const pathName = usePathname();

  const [toggleTab, setToggleTab] = useState<number>(0);

  const myAppSideBarElements = MY_APP_SIDE_BAR_ELEMENTS.map(
    (item, index) => item
  );

  useEffect(() => {
    if (pathName.endsWith(`/builder`)) {
      setToggleTab(0);
    } else if (pathName.endsWith(`/builder/contents`)) {
      setToggleTab(1);
    } else if (pathName.endsWith(`/builder/designs`)) {
      setToggleTab(2);
    } else if (pathName.endsWith(`/builder/infos`)) {
      setToggleTab(3);
    }
  }, [pathName]);

  return (
    <div className="flex justify-between text-sm text-slate-600 lg:flex-col lg:justify-start lg:gap-4 lg:text-base">
      {myAppSideBarElements.map((item, index) => {
        const error = item.formName
          ? Object.keys(
              (cardState[item.formName! as keyof CardState<string>] as any)
                ?.errors
            ).length !== 0
          : undefined;

        return (
          // <div key={index} className="relative aspect-square w-full">
          //   {error && (
          //     <InfoCircle
          //       size="20"
          //       variant="Bold"
          //       className="absolute -left-1 -top-1 text-rose-500 lg:right-1"
          //     />
          //   )}
          //   <Link
          //     href={`/dashboard/builder/${item.link}${
          //       cardId && `/?cardId=${cardId}&action=${cardAction}`
          //     }`}
          //     className={clsx(
          //       'flex basis-20 items-center justify-center rounded-md border px-2 py-3 text-xs max-md:grow sm:flex-row md:basis-auto md:flex-col md:px-5 md:py-5',
          //       toggleTab !== index
          //         ? 'hover:border-text-grayfont text-grayfont'
          //         : error
          //           ? 'text-red-500 hover:border-rose-300 hover:text-red-600'
          //           : 'border-blueTheme/60 bg-blueBg/60 text-blueTheme hover:border-blueTheme/80',
          //       error
          //         ? 'border-rose-200 text-red-500 hover:border-rose-300 hover:text-red-600'
          //         : 'border-transparent hover:border-blueTheme hover:text-blueTheme'
          //     )}
          //   >
          //     <span className="h-5 w-5 lg:h-8 lg:w-8">{item.icon}</span>
          //     <p className="hidden text-xs font-medium sm:block md:text-sm">
          //       {item.name}
          //     </p>
          //   </Link>
          // </div>
          <Link
            key={index}
            href={`/dashboard/builder/${item.link}${
              cardId && `/?cardId=${cardId}&action=${cardAction}`
            }`}
            className={`flex aspect-rectangle flex-grow flex-col items-center justify-center rounded-lg max-lg:py-1 xs:flex-row lg:aspect-square lg:flex-col ${
              toggleTab !== index
                ? 'hover:border-text-grayfont text-grayfont'
                : error
                  ? 'text-red-500 hover:border-rose-300 hover:text-red-600'
                  : 'border-blueTheme/60 bg-blueBg/60 text-blueTheme hover:border-blueTheme/80'
            } ${
              error
                ? 'border-rose-200 text-red-500 hover:border-rose-300 hover:text-red-600'
                : 'border-transparent hover:border-blueTheme hover:text-blueTheme'
            }`}
          >
            <span className="h-7 w-7">{item.icon}</span>
            <p className="text-xs font-medium md:text-sm">{item.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBarMyCards;
