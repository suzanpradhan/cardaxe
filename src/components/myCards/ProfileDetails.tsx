import {
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
  InfosFormsUpdateSchemaType,
} from '@/module/cards/cardsType';
import x_image from '../../../public/X_logo.png';
import cashapp_image from '../../../public/cashapp_image.png';
import customLink_image from '../../../public/customLink_image.png';
import discord_image from '../../../public/discord_image.png';
import facebook_image from '../../../public/facebook_image.png';
import instagram_image from '../../../public/instagram_image.png';
import linkedin_image from '../../../public/linkedin_image.png';
import openSea from '../../../public/openSea.png';
import paypal_image from '../../../public/paypal_image.png';
import { VariableValueType } from '../CardLayouts';
import ContactInfo from './ContactInfo';
import GappedTableList from './GappedTableList';

type ProfileDetailsPropType = {
  isTeamComp: boolean;
  cardValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType;
  socialValues?: InfosFormsUpdateSchemaType;
};

const SOCIAL_MEDIA_LIST = [
  {
    id: 1,
    icon: instagram_image,
    name: 'Instagram',
  },
  {
    id: 2,
    icon: facebook_image,
    name: 'Facebook',
  },
  {
    id: 3,
    icon: linkedin_image,
    name: 'LinkedIn',
  },
  {
    id: 4,
    icon: x_image,
    name: 'X',
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

const OTHERS_LIST = [
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

const ProfileDetails = ({
  isTeamComp,
  cardValues,
  socialValues,
}: ProfileDetailsPropType) => {
  console.log('socialValues', socialValues);
  const socialMedialList =
    socialValues &&
    SOCIAL_MEDIA_LIST.filter((item) => {
      if (socialValues?.[item.id]?.cardInfoId)
        return item.id === parseInt(socialValues?.[item.id]?.cardInfoId!);
    });
  console.log(socialMedialList);
  return (
    <div className="w-full">
      <ContactInfo cardValues={cardValues} isTeamComp={isTeamComp} />
      {socialMedialList && Object.entries(socialMedialList).length !== 0 && (
        <GappedTableList list={socialMedialList} />
      )}
      {/* <GappedTableList list={PAYMENTS_LIST} />
      <GappedTableList list={MORE_LIST} /> */}
    </div>
  );
};

export default ProfileDetails;
