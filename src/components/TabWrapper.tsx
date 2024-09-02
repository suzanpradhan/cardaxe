import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// interface TabWrapperProps {
//   className?: string;
// }

type TabWrappersPropsType = {
  tabElements: Array<{ name: string; link: string }>;
  slug: string;
};

const Tabwrapper = ({
  tabElements,
  // changeRoute,
  slug,
}: TabWrappersPropsType) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<number>(0);
  useEffect(() => {
    if (pathname.endsWith(`/teams/${slug}`)) {
      setActiveTab(0);
    } else if (pathname.endsWith(`/teams/${slug}/members`)) {
      setActiveTab(1);
    } else if (pathname.endsWith(`/teams/${slug}/analytics`)) {
      setActiveTab(2);
    } else if (pathname.endsWith(`/teams/${slug}/security`)) {
      setActiveTab(3);
    } else if (pathname.endsWith(`/teams/${slug}/settings`)) {
      setActiveTab(4);
    }
  }, [pathname, slug]);

  return (
    <ul className="flex w-full border-b-2">
      {tabElements.map((item, index) => (
        <li
          key={index}
          className={clsx(
            'pb-2',
            activeTab === index && '-my-[2.5px] border-b-4 border-blue-700'
          )}
        >
          <Link
            href={`${slug}/${item.link}`}
            className={clsx(
              'mb-2 w-full rounded-md p-3 text-sm hover:text-blue-700',
              activeTab === index && 'bg-blue-200'
            )}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Tabwrapper;
