import clsx from 'clsx';
import { useState } from 'react';

// interface TabWrapperProps {
//   className?: string;
// }

type TabWrappersPropsType = {
  tabElements: string[];
};

const Tabwrapper = ({ tabElements }: TabWrappersPropsType) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <ul className="flex w-full border-b-2">
      {tabElements.map((item, index) => (
        <li
          onClick={() => setActiveTab(index)}
          key={index}
          className={clsx(
            'pb-1 ',
            activeTab === index && 'border-b-4 border-blue-700 -my-[2.5px]'
          )}
        >
          <button
            className={clsx(
              ' p-3 rounded-md  hover:text-blue-700',
              activeTab === index && ' bg-blue-200'
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
