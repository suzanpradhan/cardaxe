import { CardState } from '@/module/cards/cardsType';
import clsx from 'clsx';
import {
  BoxAdd,
  Colorfilter,
  DocumentText1,
  Grid7,
  InfoCircle,
} from 'iconsax-react';
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
    name: 'Contents',
    link: 'contents',
  },
  {
    icon: <Colorfilter variant="Bulk" size={'auto'} />,
    formName: 'cardDesign',
    name: 'Designs',
    link: 'designs',
  },
  {
    icon: <BoxAdd variant="Bulk" size={'auto'} />,
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
    <div className="flex flex-row lg:flex-col text-sm lg:text-base lg:justify-start justify-between lg:gap-4 h-full text-slate-600">
      {myAppSideBarElements.map((item, index) => {
        const error = item.formName
          ? Object.keys(
              (cardState[item.formName! as keyof CardState<string>] as any)
                ?.errors
            ).length !== 0
          : undefined;

        return (
          <div key={index} className="relative">
            {error && (
              <InfoCircle
                size="20"
                variant="Bold"
                className="absolute lg:right-1 -top-1 -left-1 text-rose-500"
              />
            )}
            <Link
              href={`/dashboard/builder/${item.link}${
                cardId && `/?cardId=${cardId}&action=${cardAction}`
              }`}
              // onClick={(e) => handleClick(e)}
              className={clsx(
                'flex flex-col sm:flex-row lg:flex-col items-center basis-20 max-lg:grow lg:basis-auto justify-center rounded-md text-xs p-2 border ',
                toggleTab !== index
                  ? 'text-grayfont hover:border-text-grayfont'
                  : error
                    ? 'hover:border-rose-300 hover:text-red-600 text-red-500'
                    : 'border-blueTheme/60 hover:border-blueTheme/80 text-blueTheme bg-blueBg/60 ',
                error
                  ? 'border-rose-200 hover:border-rose-300 hover:text-red-600 text-red-500 '
                  : 'border-transparent hover:text-blueTheme hover:border-blueTheme '
              )}
            >
              <span className="lg:w-7 lg:h-7 w-5 h-5">{item.icon}</span>
              <p className="pl-2 lg:pl-0">{item.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SideBarMyCards;
