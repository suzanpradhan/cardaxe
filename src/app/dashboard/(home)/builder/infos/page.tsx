'use client';

import FormWrapper from '@/components/FormWrapper';
import SocialMediaForm, {
  SocialMediaValueType,
} from '@/components/myCards/SocialMediaForm';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { useTimeoutDispatch } from '@/hooks/useTimeoutDispatch';
import { updateInfosForm } from '@/module/cards/cardSlice';
import cardsApi from '@/module/cards/cardsApi';
import {
  CardState,
  InfosFormsUpdateSchemaType,
  SocialMediaInfo,
} from '@/module/cards/cardsType';
import { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import xImage from '../../../../../../public/X_logo.png';
import facebookImage from '../../../../../../public/facebook_image.png';
import instagramImage from '../../../../../../public/instagram_image.png';
import linkedInImage from '../../../../../../public/linkedin_image.png';

export interface SocialMediaInfoType {
  socialLinkSchemaName: string;
  socialLinkLogo: StaticImageData;
  placeholder: string;
}

const SOCIAL_MEDIA_FEILDS: Record<string, SocialMediaInfoType> = {
  Instagram: {
    socialLinkSchemaName: 'instagram',
    socialLinkLogo: instagramImage,
    placeholder: '@',
  },
  Facebook: {
    socialLinkSchemaName: 'facebook',
    socialLinkLogo: facebookImage,
    placeholder: 'facebook.com/',
  },
  LinkedIn: {
    socialLinkSchemaName: 'linkedIn',
    socialLinkLogo: linkedInImage,
    placeholder: 'linkedIn.com/',
  },
  X: {
    socialLinkSchemaName: 'x',
    socialLinkLogo: xImage,
    placeholder: '@',
  },
  Paypal: {
    socialLinkSchemaName: 'paypal',
    socialLinkLogo: xImage,
    placeholder: '@',
  },
  'Cash App': {
    socialLinkSchemaName: 'cashApp',
    socialLinkLogo: xImage,
    placeholder: '@',
  },
  'Custom Link': {
    socialLinkSchemaName: 'customLink',
    socialLinkLogo: xImage,
    placeholder: '@',
  },
  Discord: {
    socialLinkSchemaName: 'discord',
    socialLinkLogo: xImage,
    placeholder: '@',
  },
};

const CardInfosFormPage = () => {
  const timeout = useTimeoutDispatch();
  const dispatch = useAppDispatch();
  const cardState = useAppSelector((state: RootState) => state.card);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    categoryId: string
  ) => {
    const { name, value } = e.target;
    const updateFormState: CardState<string>['cardInfos']['values'] = {
      ...cardState.cardInfos.values,
      [categoryId]: {
        ...cardState.cardInfos.values[categoryId],
        cardInfoId: categoryId,
        [name]: value,
      },
    };
    timeout<InfosFormsUpdateSchemaType>(updateInfosForm, updateFormState);
    // const result =
    //   InfoSchema.shape[name as keyof InfoSchemaType].safeParse(value);
    // const result = InfosFormsUpdateSchema[categoryId as keyof InfosFormsUpdateSchemaType].;
  };

  return (
    <FormWrapper>
      {socialMediaInfo?.map((item, index) => {
        const socialMediaErr0rs =
          cardState.cardInfos.errors[item.id] != null
            ? cardState.cardInfos.errors[item.id]
            : undefined;
        const socialMediaValue =
          cardState.cardInfos.values[item.id] != null
            ? cardState.cardInfos.values[item.id]
            : undefined;
        return (
          <SocialMediaForm
            error={socialMediaErr0rs as SocialMediaValueType}
            handleChange={handleChange}
            socialMedialValue={socialMediaValue}
            key={index}
            categoryId={item.id}
            socialLinkName={
              SOCIAL_MEDIA_FEILDS[item.name]?.socialLinkSchemaName
            }
            socialLinkTitle={item.name}
            socialLinkLogo={SOCIAL_MEDIA_FEILDS[item.name]?.socialLinkLogo}
            placeholder={SOCIAL_MEDIA_FEILDS[item.name]?.placeholder}
          />
        );
      })}
    </FormWrapper>
  );
};

export default CardInfosFormPage;
