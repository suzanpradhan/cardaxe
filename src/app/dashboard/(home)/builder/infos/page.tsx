'use client';

import FormWrapper from '@/components/FormWrapper';
import SocialMediaForm from '@/components/myCards/SocialMediaForm';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { CardState, SocialMediaInfo } from '@/module/cards/cardsType';
import { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import x_image from '../../../../../../public/X_logo.png';
import facebook_image from '../../../../../../public/facebook_image.png';
import instagram_image from '../../../../../../public/instagram_image.png';

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

const CardInfosFormPage = () => {
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
    categoryId: number
  ) => {
    const { name, value } = e.target;
    const updateFormState: CardState<string>['cardInfos']['values'] = {
      ...cardState.cardInfos.values,
      [categoryId]: {
        id: categoryId,
      },
    };
    // timeout<InfosFormsSchemaType>(updateContentForm, updatedFormState);
    // const result =
    //   ContentFormSchema.shape[name as keyof ContentFormSchemaType].safeParse(
    //     value
    //   );

    // if (!result.success) {
    //   const error = result.error.format();
    //   dispatch(
    //     setErrors({
    //       formName: 'cardFields',
    //       error: { ...cardState.cardFields.errors, [name]: error._errors },
    //     })
    //   );
    // } else {
    //   const newError = Object.fromEntries(
    //     Object.entries(cardState.cardFields.errors).filter(
    //       ([key]) => key !== name
    //     )
    //   );
    //   dispatch(
    //     setErrors({
    //       formName: 'cardFields',
    //       error: newError,
    //     })
    //   );
    // }
  };

  return (
    <FormWrapper>
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

export default CardInfosFormPage;
function timeout<T>(
  updateContentForm: any,
  updatedFormState: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    id?: number | undefined;
    address?: string | null | undefined;
    prefix?: string | undefined;
    middleName?: string | null | undefined;
    suffix?: string | undefined;
    bio?: string | null | undefined;
    website?: string | null | undefined;
    designation?: string | undefined;
    department?: string | undefined;
    company?: string | undefined;
  }
) {
  throw new Error('Function not implemented.');
}
