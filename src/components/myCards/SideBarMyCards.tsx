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
    icon: <DocumentText1 size="40" variant="Bulk" />,
    name: 'Layouts',
    link: '',
  },
  {
    icon: <Grid7 size="40" variant="Bulk" />,
    name: 'Contents',
    link: 'contents',
  },
  {
    icon: <Colorfilter size="40" variant="Bulk" />,
    name: 'Designs',
    link: 'designs',
  },
  {
    icon: <BoxAdd size="40" variant="Bulk" />,
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
    <div className="flex flex-col gap-4 h-full text-slate-600">
      {MY_APP_SIDE_BAR_ELEMENTS.map((item, index) => (
        <Link
          href={`/dashboard/builder/${item.link}${
            cardId && `/?cardId=${cardId}&action=${cardAction}`
          }`}
          key={index}
          // onClick={(e) => handleClick(e)}
          className={clsx(
            'flex flex-col items-center h-24 justify-center rounded-md hover:text-blueTheme',
            toggleTab !== index ? 'text-grayfont' : 'text-blueTheme bg-blueBg'
          )}
        >
          {item.icon}
          <p>{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default SideBarMyCards;
