import React from 'react';
import ContactInfo from './ContactInfo';
import facebook_image from '../../../public/facebook_image.png';
import instagram_image from '../../../public/instagram_image.png';
import twitter_image from '../../../public/twitter_image.png';
import cashapp_image from '../../../public/cashapp_image.png';
import paypal_image from '../../../public/paypal_image.png';
import linkedin_image from '../../../public/linkedin_image.png';
import customLink_image from '../../../public/customLink_image.png';
import discord_image from '../../../public/discord_image.png';
import openSea from '../../../public/openSea.png';
import GappedTableList from './GappedTableList';

type ProfileDetailsPropType = {
  isTeamComp: boolean;
};

const HeadingTitles = ({ label }: { label: string }) => {
  return <h2 className="text-xl font-extrabold my-4">{label}</h2>;
};

const SOCIAL_MEDIA_LIST = [
  {
    icon: instagram_image,
    name: 'Instagram',
  },
  {
    icon: facebook_image,
    name: 'Facebook',
  },
  {
    icon: linkedin_image,
    name: 'LinkedIn',
  },
  {
    icon: twitter_image,
    name: 'Twiter',
  },
];

const PAYMENTS_LIST = [
  {
    icon: paypal_image,
    name: 'Paypal',
  },
  {
    icon: cashapp_image,
    name: 'Cash App',
  },
];

const MORE_LIST = [
  {
    icon: customLink_image,
    name: 'Custom Link',
  },
  {
    icon: discord_image,
    name: 'Discord',
  },
  {
    icon: openSea,
    name: 'OpenSea',
  },
];

const ProfileDetails = ({ isTeamComp }: ProfileDetailsPropType) => {
  return (
    <div className="w-full">
      {!isTeamComp && <HeadingTitles label={'Contact Info'} />}
      <ContactInfo />
      <HeadingTitles label={'Social Media'} />
      <GappedTableList list={SOCIAL_MEDIA_LIST} />
      <HeadingTitles label={'Payments'} />
      <GappedTableList list={PAYMENTS_LIST} />
      <HeadingTitles label={'More'} />
      <GappedTableList list={MORE_LIST} />
    </div>
  );
};

export default ProfileDetails;
