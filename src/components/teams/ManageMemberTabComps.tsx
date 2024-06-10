import CardTempSide from '../dashboard/HomeCardTemplate';

type ManageMemberTabCompsPropsType = {
  activeTab: string;
};

const ProfileTabComp = () => {
  return (
    <div className="flex flex-col gap-2">
      <CardTempSide userId={1} />
      {/* <ProfileDescription />
      <ProfileDetails isTeamComp={false} /> */}
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
  switch (activeTab) {
    case 'Analytics':
      comp = <AnalyticsTabComp />;
      break;
    case 'Access Control':
      comp = <AccessControlTabComp />;
      break;
    case 'Settings':
      comp = <SettingsTabComp />;
      break;
    default:
      comp = <ProfileTabComp />;
  }
  return comp;
};

export default ManageMemberTabComps;
