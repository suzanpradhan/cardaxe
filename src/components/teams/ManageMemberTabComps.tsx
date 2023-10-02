import React from 'react';
import CardTempSide from '../dashboard/CardTempSide';
import ProfileDescription from '../myCards/ProfileDescription';
import ProfileDetails from '../myCards/ProfileDetails';

type ManageMemberTabCompsPropsType = {
  activeTab: string;
};

const ProfileTabComp = () => {
  return (
    <div className="flex flex-col gap-2">
      <CardTempSide />
      <ProfileDescription />
      <ProfileDetails isTeamComp={false} />
    </div>
  );
};

const AnalyticsTabComp = () => {
  return <div>ManageMemberTabComps</div>;
};

const AccessControlTabComp = () => {
  return <div>ManageMemberTabComps</div>;
};

const SettingsTabComp = () => {
  return <div>ManageMemberTabComps</div>;
};

const ManageMemberTabComps = ({ activeTab }: ManageMemberTabCompsPropsType) => {
  let comp;
  console.log('>>not not', activeTab);
  switch (activeTab) {
    case 'Analytics':
      comp = <AnalyticsTabComp />;
      console.log(activeTab);
      break;
    case 'Access Control':
      comp = <AccessControlTabComp />;
      console.log(activeTab);
      break;
    case 'Settings':
      comp = <SettingsTabComp />;
      console.log(activeTab);
      break;
    default:
      comp = <ProfileTabComp />;
  }
  return comp;
};

export default ManageMemberTabComps;
