'use client';

import ButtonForm from '@/components/ButtonForm';
import { VariableValueType } from '@/components/CardLayouts.server';
import AppBar from '@/components/dashboard/AppBar';
import PreviewSection from '@/components/myCards/PreviewSection';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { updateContentForm, updateDesignForm } from '@/module/cards/cardSlice';
import {
  CardTemplatesType,
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
} from '@/module/cards/cardsType';
import teamsApi from '@/module/teams/teamApi';
import { Team } from '@/module/teams/teamTypes';
import { UserType } from '@/module/user/userType';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import TeamsBuilderSidebar from './(components)/TeamsBuilderSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isPreview, setIsPreview] = useState(false);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const teamId = searchParams.get('teamId');
  const user = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );
  const cardState = useAppSelector((state: RootState) => state.card);

  const cardTemplate = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCardTemmplate-${cardState.cardTemplate}`]
        ?.data as CardTemplatesType
  );

  const team = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getEachTeam-${teamId}`]?.data as Team
  );

  useEffect(() => {
    const updateCardState = () => {
      if (!team) return;
      dispatch(updateContentForm({ bio: team.bio, company: team.name }));
      dispatch(updateDesignForm({ logo: team.logo }));

      // dispatch(updateContentForm(card.cardFields));

      // switch (action) {
      //   case 'update':
      //     dispatch(updateContentForm(card.cardFields));
      //     dispatch(updateDesignForm(card.cardDesign));
      //     dispatch(updateInfosForm(cardInfoKeyValue));
      //     dispatch(updateCardTemplate(card.cardTemplate.id.toString()));
      //     dispatch(updateDefaultCard(card.isDefault));
      //     dispatch(updateCardTemplate(card.cardTemplate.id.toString()));
      //     dispatch(
      //       updateInfosForm(
      //         Object.fromEntries(
      //           card.cardInfos.map((obj) => [
      //             obj.cardInfo,
      //             { ...obj, cardInfoId: obj.cardInfo },
      //           ])
      //         )
      //       )
      //     );
      //     dispatch(validateForms('cardDesign'));
      //     dispatch(validateForms('cardFields'));
      //     break;
      // }
    };

    updateCardState();
  }, [team]);

  useEffect(() => {
    if (teamId) {
      dispatch(teamsApi.endpoints.getEachTeam.initiate(teamId?.toString()));
    }
  }, [dispatch, teamId]);

  useEffect(() => {
    dispatch(
      cardsApi.endpoints.getCardTemmplate.initiate(cardState.cardTemplate)
    );
  }, [dispatch, cardState.cardTemplate]);

  console.log(cardTemplate);

  const variableValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType = {
    backgroundColor:
      cardState.cardDesign.values.backgroundColor?.length === 0
        ? cardTemplate?.defaultCardDesign.backgroundColor
        : cardState.cardDesign.values.backgroundColor,
    bio:
      cardState.cardFields.values.bio?.length === 0
        ? cardTemplate?.defaultCardFields.bio
        : cardState.cardFields.values.bio,
    firstName:
      cardState.cardFields.values.firstName?.length === 0
        ? cardTemplate?.defaultCardFields.firstName
        : cardState.cardFields.values.firstName,
    middleName:
      cardState?.cardFields?.values.middleName?.length === 0
        ? cardTemplate?.defaultCardFields.middleName
        : cardState.cardFields.values.middleName,
    lastName:
      cardState?.cardFields?.values.lastName?.length === 0
        ? cardTemplate?.defaultCardFields.lastName
        : cardState.cardFields.values.lastName,
    email:
      cardState?.cardFields?.values.email?.length === 0
        ? (cardTemplate?.defaultCardFields.email ?? '')
        : cardState.cardFields.values.email,
    company:
      cardState?.cardFields?.values.company?.length === 0
        ? cardTemplate?.defaultCardFields.company
        : cardState.cardFields.values.company,
    phone:
      cardState?.cardFields?.values.phone?.length === 0
        ? cardTemplate?.defaultCardFields.phone
        : cardState.cardFields.values.phone,
    prefix:
      cardState?.cardFields?.values.prefix?.length === 0
        ? cardTemplate?.defaultCardFields.prefix
        : cardState.cardFields.values.prefix,
    suffix:
      cardState?.cardFields?.values.suffix?.length === 0
        ? cardTemplate?.defaultCardFields.suffix
        : cardState.cardFields.values.suffix,
    department:
      cardState?.cardFields?.values.department?.length === 0
        ? cardTemplate?.defaultCardFields.department
        : cardState.cardFields.values.department,
    address:
      cardState?.cardFields?.values.address?.length === 0
        ? cardTemplate?.defaultCardFields.address
        : cardState.cardFields.values.address,
    darkMode: cardTemplate?.defaultCardDesign.darkMode,
    showLogo: cardState.cardDesign.values.showLogo ?? false,

    showSocialIcons:
      cardState.cardDesign.values.showSocialIcons ??
      cardTemplate?.defaultCardDesign.showSocialIcons,
    // id: card?.id,
    designation:
      cardState?.cardFields?.values.designation?.length === 0
        ? cardTemplate?.defaultCardFields.designation
        : cardState.cardFields.values.designation,
    logoUrl:
      cardState.cardDesign.values.logo === undefined ||
      cardState.cardDesign.values.logo === null ||
      cardState.cardDesign.values.logo?.length === 0
        ? cardTemplate?.defaultCardDesign.logo
          ? `${cardTemplate?.defaultCardDesign.logo}`
          : undefined
        : cardState.cardDesign.values.logo,
    backgroundUrl:
      cardState.cardDesign.values.backgroundImage === undefined ||
      cardState.cardDesign.values.backgroundImage === null ||
      cardState.cardDesign.values.backgroundImage?.length === 0
        ? cardTemplate?.defaultCardDesign.backgroundImage
          ? `${cardTemplate?.defaultCardDesign.backgroundImage}`
          : undefined
        : cardState.cardDesign.values.backgroundImage,
    // logoUrl:
    // cardState.cardDesign.values.logo === undefined ||
    // cardState.cardDesign.values.logo === null ||
    // cardState.cardDesign.values.logo?.length === 0
    //     ? cardAction === 'update'
    //       ? card?.cardDesign.logo
    //         ? `${apiPaths.serverUrl}${card?.cardDesign.logo}`
    //         : undefined
    //       : card?.cardTemplate.defaultCardDesign.logo
    //         ? `${apiPaths.serverUrl}${card?.cardTemplate.defaultCardDesign.logo}`
    //         : undefined
    //     : cardState.cardDesign.values.logo?.startsWith('blob')
    //       ? cardState.cardDesign.values.logo
    //       : cardState.cardDesign.values.logo
    //         ? `${apiPaths.serverUrl}${cardState.cardDesign.values.logo}`
    //         : undefined,
    // backgroundUrl:
    //   cardState.cardDesign.values.backgroundImage === undefined ||
    //   cardState.cardDesign.values.backgroundImage === null ||
    //   cardState.cardDesign.values.backgroundImage?.length === 0
    //     ? cardAction === 'update'
    //       ? card?.cardDesign.backgroundImage
    //         ? `${apiPaths.serverUrl}${card?.cardDesign.backgroundImage}`
    //         : undefined
    //       : card?.cardTemplate.defaultCardDesign.backgroundImage
    //         ? `${apiPaths.serverUrl}${card?.cardTemplate.defaultCardDesign.backgroundImage}`
    //         : undefined
    //     : cardState.cardDesign.values.backgroundImage?.startsWith('blob')
    //       ? cardState.cardDesign.values.backgroundImage
    //       : cardState.cardDesign.values.backgroundImage
    //         ? `${apiPaths.serverUrl}${cardState.cardDesign.values.backgroundImage}`
    //         : undefined,
    website:
      cardState?.cardFields?.values.website?.length === 0
        ? cardTemplate?.defaultCardFields.website
        : cardState.cardFields.values.website,
  };

  return (
    <div className="flex max-h-screen min-h-screen flex-col gap-4 overflow-hidden px-2 lg:px-4">
      <AppBar appBarLabel="My Personal Card">
        {/* <span className="grow">
          <ButtonForm
            label="Preview"
            theme={'blue'}
            className="rounded-sm text-sm lg:hidden"
            handleClick={() => {
              contentRef.current?.scrollTo({
                top: 0,
                left: !isPreview ? contentRef.current.scrollWidth : 0,
                behavior: 'smooth',
              });
              setIsPreview(!isPreview);
            }}
          />
        </span> */}

        <span className="grow">
          <ButtonForm
            label="Next"
            className="min-w-[5rem] rounded-sm text-sm"
            // isLoading={publishLoading}
            // handleClick={handlePublish}
          />
        </span>
      </AppBar>
      <div className="mb-5 flex grow items-start gap-4 max-lg:mb-20">
        <div
          className={`mx-auto w-full max-w-sm lg:block lg:max-w-md ${!isPreview ? 'block' : 'hidden'}`}
        >
          <div className="flex h-full flex-col gap-4 lg:flex-row">
            <div className="w-full @container lg:basis-24">
              <TeamsBuilderSidebar
                cardId={null}
                // cardAction={cardAction}
                // cardState={cardState}
              />
            </div>
            <div className="h-[calc(100vh-17rem)] w-full grow overflow-hidden @container lg:h-[calc(100vh-6rem)]">
              {children}
            </div>
          </div>
        </div>
        <div
          className={`sticky top-4 h-[calc(100vh-12rem)] w-full grow overflow-hidden overflow-y-scroll rounded-xl border-zinc-200 lg:block lg:h-[calc(100vh-6rem)] lg:border ${isPreview ? 'block' : 'hidden'}`}
        >
          <div className="mx-auto my-5 max-w-sm bg-white px-2 lg:max-w-lg lg:px-4">
            <PreviewSection
              layout={parseInt(cardState.cardTemplate!)}
              user={user}
              variableValues={variableValues}
              socialValues={cardState.cardInfos.values}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
