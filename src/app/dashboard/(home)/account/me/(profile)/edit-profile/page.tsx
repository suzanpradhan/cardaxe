import FeedbackOptions from '../../../(components)/FeedbackOptions';
import SettingOptions from '../../../(components)/SettingOptions';

const ProfilePage = () => {
  return (
    <section className="mx-auto h-screen max-w-3xl">
      {/* <MyProfileCard /> */}
      <div className="my-5 w-full border-b border-slate-200"></div>
      <SettingOptions />
      <div className="my-5 w-full border-b border-slate-200"></div>
      <FeedbackOptions />
    </section>
  );
};

export default ProfilePage;
