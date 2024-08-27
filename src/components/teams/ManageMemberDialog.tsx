import { useState } from 'react';
import ManageMemberTabComps from './ManageMemberTabComps';

const TAB_ELEMENTS = ['Profile', 'Analytics', 'Access Control', 'Settings'];

const ManageMemberDialog = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const changeTab = (index: number) => setActiveTab(TAB_ELEMENTS[index]);

  return (
    <div
      className="grid max-h-120 justify-start gap-2 overflow-hidden px-5 py-3 hover:overflow-auto hover:pr-[19px]"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="font-bold">Sujan Pradhan</h2>
      {/* <Tabwrapper
        tabElements={TAB_ELEMENTS}
        triggerComp={'dialog'}
        changeTab={changeTab}
      /> */}
      <ManageMemberTabComps activeTab={activeTab} />
    </div>
  );
};

export default ManageMemberDialog;
