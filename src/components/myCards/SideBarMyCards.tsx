import clsx from 'clsx';
import { BoxAdd, Colorfilter, DocumentText1, Grid7 } from 'iconsax-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type SideBarElementProps = {
  icon: React.JSX.Element;
  name: string;
  link: string;
};

interface SideBarMyCardsProps {
  cardId: string | null;
  cardAction: string | null;
}

const MY_APP_SIDE_BAR_ELEMENTS: SideBarElementProps[] = [
  {
    icon: <DocumentText1 variant="Bulk" size={'auto'} />,
    name: 'Layouts',
    link: '',
  },
  {
    icon: <Grid7 variant="Bulk" size={'auto'} />,
    name: 'Contents',
    link: 'contents',
  },
  {
    icon: <Colorfilter variant="Bulk" size={'auto'} />,
    name: 'Designs',
    link: 'designs',
  },
  {
    icon: <BoxAdd variant="Bulk" size={'auto'} />,
    name: 'Infos',
    link: 'infos',
  },
];

const SideBarMyCards = ({ cardId, cardAction }: SideBarMyCardsProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const [toggleTab, setToggleTab] = useState<number>(0);

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
      {MY_APP_SIDE_BAR_ELEMENTS.map((item, index) => (
        <Link
          href={`/dashboard/builder/${item.link}${
            cardId && `/?cardId=${cardId}&action=${cardAction}`
          }`}
          key={index}
          // onClick={(e) => handleClick(e)}
          className={clsx(
            'flex lg:flex-col items-center basis-20 sm:flex-row flex-col lg:basis-auto  px-1 lg:h-24 py-2 justify-center rounded-md hover:text-blueTheme ',
            toggleTab !== index ? 'text-grayfont' : 'text-blueTheme bg-blueBg '
          )}
        >
          <span className="lg:w-10 lg:h-10 w-8 h-8">{item.icon}</span>
          <p className="pl-2 lg:pl-0">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default SideBarMyCards;
