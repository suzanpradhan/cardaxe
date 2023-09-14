import clsx from 'clsx';
import { useState } from 'react';

// interface TabWrapperProps {
//   className?: string;
// }

const TAB_ELEMENTS = ['Profile', 'Analytics', 'Access Control', 'Setings'];

const Tabwrapper = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <ul className="flex ">
      {TAB_ELEMENTS.map((item, index) => (
        <li
          onClick={() => setActiveTab(index)}
          key={index}
          className={clsx(
            'pb-1 border-b-2',
            activeTab === index && 'border-b-4 border-blue-700'
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
