'use client';

import SocialMediaForm, {
  SocialMediaValueType,
} from '@/components/myCards/SocialMediaForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { useTimeoutDispatch } from '@/hooks/useTimeoutDispatch';
import { updateInfosForm } from '@/module/cards/cardSlice';
import cardsApi from '@/module/cards/cardsApi';
import { CardState, SocialMediaInfo } from '@/module/cards/cardsType';
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
    placeholder: 'https://instagram.com/thecardaxe',
  },
  Facebook: {
    socialLinkSchemaName: 'facebook',
    socialLinkLogo: facebookImage,
    placeholder: 'https://facebook.com/cardaxe',
  },
  LinkedIn: {
    socialLinkSchemaName: 'linkedIn',
    socialLinkLogo: linkedInImage,
    placeholder: 'https://linkedIn.com/cardaxe',
  },
  X: {
    socialLinkSchemaName: 'x',
    socialLinkLogo: xImage,
    placeholder: 'https://x.com/cardaxe',
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

  console.log(linksInfo);

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

    dispatch(updateInfosForm(updateFormState));
    console.log('updateFormState', updateFormState, cardState.cardInfos.values);
  };

  return (
    <div className="h-[calc(100vh-17rem)] overflow-y-scroll lg:h-[calc(100vh-6rem)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-4"
      >
        <Card className="pb-4 shadow-none">
          <CardHeader className="pb-2 font-bold">Social Media Info</CardHeader>
          <CardContent>
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
                  socialLinkLogo={
                    SOCIAL_MEDIA_FEILDS[item.name]?.socialLinkLogo
                  }
                  placeholder={SOCIAL_MEDIA_FEILDS[item.name]?.placeholder}
                />
              );
            })}
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CardInfosFormPage;
