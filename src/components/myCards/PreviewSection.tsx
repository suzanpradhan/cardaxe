'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import {
  CardTemplatesType,
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
  InfosFormsUpdateSchemaType,
} from '@/module/cards/cardsType';
import { UserType } from '@/module/user/userType';
import { useEffect } from 'react';
import CardLayouts, { VariableValueType } from '../CardLayouts.server';
import FormWrapper from '../FormWrapper';
import ProfileDescription from './ProfileDescription';
import ProfileDetails from './ProfileDetails';

// export type PreviewVariablesTypes = {
//   cardTitle: string;
//   contentTitle: string;
//   prefix: string;
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   suffix: string;
//   bio: string;
//   phone: string;
//   website: string;
//   email: string;
//   address: string;
//   designation: string;
//   department: string;
//   company: string;
//   backgroundColor: string;
//   backgroundImage: string;
//   logo: string;

// }

const PreviewSection = ({
  user,
  layout,
  variableValues,
  socialValues,
}: {
  layout: number;
  variableValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType;
  socialValues?: InfosFormsUpdateSchemaType;
  user?: UserType;
}) => {
  console.log('layout', layout);
  const dispatch = useAppDispatch();

  // try {
  //   response = await fetch(
  //     `${apiPaths.baseUrl}${apiPaths.getCardTemplatesUrl}${layout}`,
  //     {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     }
  //   );
  // } catch (err) {
  //   console.log(err);
  // }

  const cardTemplate = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCardTemmplate-${layout}`]
        ?.data as CardTemplatesType
  );

  useEffect(() => {
    dispatch(cardsApi.endpoints.getCardTemmplate.initiate(layout.toString()));
  }, [dispatch, layout]);

  console.log('variableValues', variableValues);

  return (
    <FormWrapper className="">
      <div className="flex flex-col gap-4">
        {cardTemplate?.htmlCode && (
          <CardLayouts
            htmlSource={cardTemplate.htmlCode}
            variableValues={variableValues}
          />
        )}
        <ProfileDescription variableValues={variableValues} user={user} />
        {socialValues ? (
          <ProfileDetails
            cardValues={variableValues}
            isTeamComp={false}
            socialValues={socialValues}
          />
        ) : (
          <></>
        )}
      </div>
    </FormWrapper>
  );
};

export default PreviewSection;
