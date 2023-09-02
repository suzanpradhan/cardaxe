import React from 'react';
import FormWrapper from '../FormWrapper';
import facebook_image from '../../../public/facebook_image.png';
import instagram_image from '../../../public/instagram_image.png';
import linkedin_image from '../../../public/linkedin_image.png';
import twitter_image from '../../../public/twitter_image.png';
import SocialMediaForm from './SocialMediaForm';

const SOCIAL_MEDIA_FEILDS = [
  {
    socialLinkName: 'instagram',
    socialLinkTitle: 'Instagram',
    socialLinkLogo: instagram_image,
    placeholder: '@',
  },
  {
    socialLinkName: 'facebook',
    socialLinkTitle: 'Facebook',
    socialLinkLogo: facebook_image,
    placeholder: 'facebook.com/',
  },
  {
    socialLinkName: 'linkedin',
    socialLinkTitle: 'Linkedin',
    socialLinkLogo: linkedin_image,
    placeholder: 'linkedin.com/in/',
  },
  {
    socialLinkName: 'twitter',
    socialLinkTitle: 'Twitter',
    socialLinkLogo: twitter_image,
    placeholder: '@',
  },
];

const SocialMedia = () => {
  return (
    <FormWrapper>
      {SOCIAL_MEDIA_FEILDS.map((item, index) => (
        <SocialMediaForm
          socialLinkName={item.socialLinkName}
          socialLinkTitle={item.socialLinkTitle}
          socialLinkLogo={item.socialLinkLogo}
          placeholder={item.placeholder}
        />
      ))}
    </FormWrapper>
  );
};

export default SocialMedia;
