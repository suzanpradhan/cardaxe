import React, { useState } from 'react';
import Tabwrapper from '../TabWrapper';
import ManageMemberTabComps from './ManageMemberTabComps';

const TAB_ELEMENTS = ['Profile', 'Analytics', 'Access Control', 'Settings'];

const ManageMemberDialog = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const changeTab = (index: number) => setActiveTab(TAB_ELEMENTS[index]);

  return (
    <div
      className="max-h-120 px-5 py-3 grid gap-2 overflow-hidden hover:overflow-auto justify-start hover:pr-[19px]"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="font-bold">Sujan Pradhan</h2>
      <Tabwrapper
        tabElements={TAB_ELEMENTS}
        triggerComp={'dialog'}
        changeTab={changeTab}
      />
      <ManageMemberTabComps activeTab={activeTab} />
    </div>
  );
};

export default ManageMemberDialog;
