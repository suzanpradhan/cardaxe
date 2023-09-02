import clsx from 'clsx';
import { BoxAdd, Colorfilter, DocumentText1, Grid7 } from 'iconsax-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type SideBarElementProps = {
  icon: React.JSX.Element;
  name: string;
  link: string;
};

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

const SideBarMyCards = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [toggleTab, setToggleTab] = useState<number>(0);
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
    item: SideBarElementProps
  ) => {
    router.push(`/dashboard/myCards/builder/${item.link}`);
    setToggleTab(index);
  };

  useEffect(() => {
    if (pathName.endsWith('/dashboard/myCards/builder')) {
      setToggleTab(0);
    } else if (pathName.endsWith('/dashboard/myCards/builder/contents')) {
      setToggleTab(1);
    } else if (pathName.endsWith('/dashboard/myCards/builder/designs')) {
      setToggleTab(2);
    } else if (pathName.endsWith('/dashboard/myCards/builder/infos')) {
      setToggleTab(3);
    }
  }, [pathName]);

  return (
    <div className="w-28 flex flex-col gap-4 h-full text-slate-600">
      {MY_APP_SIDE_BAR_ELEMENTS.map((item, index) => (
        <button
          key={index}
          onClick={(e) => handleClick(e, index, item)}
          className={clsx(
            'flex flex-col items-center h-24 justify-center rounded-md hover:text-blue-600',
            toggleTab !== index ? 'text-slate-600' : 'text-blue-700 bg-blue-200'
          )}
        >
          {item.icon}
          <p>{item.name}</p>
        </button>
      ))}
    </div>
  );
};

export default SideBarMyCards;
