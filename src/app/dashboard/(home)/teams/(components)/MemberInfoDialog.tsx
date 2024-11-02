'use client';

import CardLayouts from '@/components/CardLayouts';
import ProfileDescription from '@/components/myCards/ProfileDescription';
import ProfileDetails from '@/components/myCards/ProfileDetails';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { cn } from '@/lib/utils';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import { useEffect, useState } from 'react';

const tabElements = ['Profile', 'Analytics', 'Access Control', 'Settings'];

export default function MemberInfoDialog({
  userSlug,
  key,
}: {
  userSlug: string;
  key: number;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userApi.endpoints.getPublicProfile.initiate(userSlug));
  }, [dispatch, userSlug, key]);

  const userProfile = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPublicProfile-${userSlug}`]?.data as UserType
  );

  const defaultCard = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getDefaultCard-${userSlug}`]
        ?.data as CardResponseType<CardTemplatesType>
  );

  useEffect(() => {
    dispatch(cardsApi.endpoints.getDefaultCard.initiate(userSlug));
  }, [dispatch, userSlug, key]);

  const variableValues = {
    ...defaultCard?.cardFields,
    ...defaultCard?.cardDesign,
    logoUrl: `${apiPaths.serverUrl}${defaultCard?.cardDesign.logo}`,
    backgroundUrl: `${apiPaths.serverUrl}${defaultCard?.cardDesign.backgroundImage}`,
  };

  const socialsValues = defaultCard
    ? Object.fromEntries(
        defaultCard?.cardInfos.map((obj: any) => [
          obj.cardInfo,
          { ...obj, cardInfoId: obj.cardInfo },
        ])
      )
    : undefined;

  return (
    <div className="flex max-w-xl flex-col gap-2 p-4">
      <h2 className="w-full font-bold">{userProfile?.fullname}</h2>
      <ul className="flex w-full border-b-2">
        {tabElements.map((item, index) => (
          <li
            key={index}
            className={cn(
              'pb-1',
              activeTab === index && '-my-[2.5px] border-b-4 border-blue-700'
            )}
          >
            <button
              onClick={() => setActiveTab(index)}
              className={cn(
                'w-full rounded-md px-3 py-2 hover:text-blue-700',
                activeTab === index && 'bg-blue-200'
              )}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4">
        {defaultCard?.cardTemplate.htmlCode ? (
          <CardLayouts
            htmlSource={defaultCard?.cardTemplate.htmlCode}
            variableValues={variableValues}
          />
        ) : (
          <></>
        )}
        <ProfileDescription
          values={{
            address: variableValues.address ?? '',
            designation: variableValues.designation ?? '',
            company: variableValues.company ?? '',
            bio: variableValues.bio ?? '',
          }}
          user={userProfile}
        />
        {socialsValues ? (
          <ProfileDetails
            cardValues={variableValues}
            isTeamComp={false}
            socialValues={socialsValues}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
