import FeedbackOptions from './(components)/FeedbackOptions';
import MyProfileCard from './(components)/MyProfileCard';
import SettingOptions from './(components)/SettingOptions';

const ProfilePage = () => {
  return (
    <section className="max-w-3xl mx-auto mb-20">
      <MyProfileCard />
      <div className="border-b border-slate-200 my-5 w-full"></div>
      <SettingOptions />
      <div className="border-b border-slate-200 my-5 w-full"></div>
      <FeedbackOptions />
    </section>
  );
};

export default ProfilePage;
