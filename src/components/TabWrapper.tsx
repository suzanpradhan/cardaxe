import clsx from 'clsx';
import { useState } from 'react';

// interface TabWrapperProps {
//   className?: string;
// }

type TabWrappersPropsType = {
  tabElements: string[];
  triggerComp?: string;
  changeRoute?: (index: number) => void;
  changeTab?: (index: number) => void;
};

const Tabwrapper = ({
  tabElements,
  changeRoute,
  changeTab,
  triggerComp,
}: TabWrappersPropsType) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleClick = (index: number) => (
    setActiveTab(index),
    triggerComp == 'dialog'
      ? changeTab && changeTab(index)
      : changeRoute && changeRoute(index)
  );
  return (
    <ul className="flex w-full border-b-2">
      {tabElements.map((item, index) => (
        <li
          onClick={() => handleClick(index)}
          key={index}
          className={clsx(
            'pb-1',
            activeTab === index && '-my-[2.5px] border-b-4 border-blue-700'
          )}
        >
          <button
            className={clsx(
              'rounded-md p-3 hover:text-blue-700',
              activeTab === index && 'bg-blue-200'
            )}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabwrapper;
