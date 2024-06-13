import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { SocialMediaInfo } from '@/module/cards/cardsType';
import { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import x_image from '../../../public/X_logo.png';
import facebook_image from '../../../public/facebook_image.png';
import instagram_image from '../../../public/instagram_image.png';
import linkedin_image from '../../../public/linkedin_image.png';
import FormWrapper from '../FormWrapper';
import SocialMediaForm from './SocialMediaForm';

export interface SocialMediaInfoType {
  socialLinkSchemaName: string;
  socialLinkLogo: StaticImageData;
  placeholder: string;
}

const SOCIAL_MEDIA_FEILDS: Record<string, SocialMediaInfoType> = {
  Instagram: {
    socialLinkSchemaName: 'instagram',
    socialLinkLogo: instagram_image,
    placeholder: '@',
  },
  Facebook: {
    socialLinkSchemaName: 'facebook',
    socialLinkLogo: facebook_image,
    placeholder: 'facebook.com/',
  },
  LinkedIn: {
    socialLinkSchemaName: 'linkedin',
    socialLinkLogo: linkedin_image,
    placeholder: 'linkedin.com/in/',
  },
  X: {
    socialLinkSchemaName: 'x',
    socialLinkLogo: x_image,
    placeholder: '@',
  },
  Paypal: {
    socialLinkSchemaName: 'paypal',
    socialLinkLogo: x_image,
    placeholder: '@',
  },
  'Cash App': {
    socialLinkSchemaName: 'cashApp',
    socialLinkLogo: x_image,
    placeholder: '@',
  },
  'Custom Link': {
    socialLinkSchemaName: 'customLink',
    socialLinkLogo: x_image,
    placeholder: '@',
  },
  Discord: {
    socialLinkSchemaName: 'discord',
    socialLinkLogo: x_image,
    placeholder: '@',
  },
};

const SocialMedia = () => {
  const dispatch = useAppDispatch();
  const [socialMediaFields, setSocialMediaFields] =
    useState(SOCIAL_MEDIA_FEILDS);

  const linksInfo = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getSocialInfos`]?.data as Array<SocialMediaInfo>
  );
  useEffect(() => {
    dispatch(cardsApi.endpoints.getSocialInfos.initiate());
  }, [dispatch]);

  const socialMediaInfo = linksInfo?.filter(
    (info) => info.categoryName === 'Social Media'
  );

  console.log(
    socialMediaFields[socialMediaInfo?.[0].name]?.socialLinkSchemaName
  );

  return (
    <FormWrapper>
      <></>
      {socialMediaInfo &&
        socialMediaInfo.map((item, index) => (
          <SocialMediaForm
            key={index}
            socialLinkName={
              SOCIAL_MEDIA_FEILDS[item.name]?.socialLinkSchemaName
            }
            socialLinkTitle={item.name}
            socialLinkLogo={SOCIAL_MEDIA_FEILDS[item.name]?.socialLinkLogo}
            placeholder={SOCIAL_MEDIA_FEILDS[item.name]?.placeholder}
          />
        ))}
    </FormWrapper>
  );
};

export default SocialMedia;
