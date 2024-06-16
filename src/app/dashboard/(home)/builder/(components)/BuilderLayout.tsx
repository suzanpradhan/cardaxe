'use client';

import { VariableValueType } from '@/components/CardLayouts';
import AppBar from '@/components/dashboard/AppBar';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updatedDiff } from 'deep-object-diff';

import PreviewSection from '@/components/myCards/PreviewSection';
import SideBarMyCards from '@/components/myCards/SideBarMyCards';
import CircleLoader from '@/core/ui/loaders/CircleLoader';
import {
  initialState,
  updateCardTemplate,
  updateContentForm,
  updateDefaultCard,
  updateDesignForm,
  updateInfosForm,
  validateForms,
} from '@/module/cards/cardSlice';
import cardsApi from '@/module/cards/cardsApi';
import {
  CardResponseType,
  CardTemplatesType,
  ContentFormSchemaType,
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
  DesignFromSchemaType,
} from '@/module/cards/cardsType';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = useState(true);
  const [publishLoading, toggleLoading] = useState(false);

  const session = useSession();
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');
  const cardAction = searchParams.get('action');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cardState = useAppSelector((state: RootState) => state.card);

  const card = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCard-${cardId}`]
        ?.data as CardResponseType<CardTemplatesType>
  );

  const cardsTemplateList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getCardsTemplate-get-cards-endpoint']
        ?.data as CardTemplatesType[]
  );

  useEffect(() => {
    if (cardId) dispatch(cardsApi.endpoints.getCard.initiate(cardId));
    dispatch(cardsApi.endpoints.getCardsTemplate.initiate());
  }, [dispatch]);

  useEffect(() => {
    const updateCardState = (action: string) => {
      if (!card) return;
      switch (action) {
        case 'create':
          dispatch(updateContentForm(initialState.cardFields.values));
          dispatch(updateDesignForm(initialState.cardDesign.values));
          dispatch(validateForms('cardDesign'));
          dispatch(validateForms('cardFields'));
          break;
        case 'update':
          dispatch(updateContentForm(card.cardFields));
          dispatch(updateDesignForm(card.cardDesign));
          dispatch(updateCardTemplate(card.cardTemplate.id.toString()));
          dispatch(updateDefaultCard(card.isDefault));
          dispatch(
            updateInfosForm(
              Object.fromEntries(
                card.cardInfos.map((obj) => [
                  obj.cardInfo,
                  { ...obj, cardInfoId: obj.cardInfo },
                ])
              )
            )
          );
          dispatch(validateForms('cardDesign'));
          dispatch(validateForms('cardFields'));
          break;
      }
    };

    if (cardAction) updateCardState(cardAction);
  }, [card, cardAction]);

  const handlePublish = () => {
    toggleLoading(true);
    dispatch(validateForms('cardDesign'));
    dispatch(validateForms('cardFields'));
    var submitresponse = undefined;
    const updatedCardFields = {
      ...(card.cardFields
        ? (updatedDiff(
            card.cardFields,
            cardState.cardFields.values
          ) as ContentFormSchemaType)
        : undefined),
    };

    const updatedCardDesign = updatedDiff(
      card.cardDesign,
      cardState.cardDesign.values as DesignFromSchemaType
    );

    if (
      Object.keys(cardState.cardDesign.errors).length === 0 &&
      Object.keys(cardState.cardFields.errors).length === 0 &&
      cardId &&
      session.data?.user?.id &&
      updatedCardFields
    ) {
      submitresponse = dispatch(
        cardsApi.endpoints.upDateCard.initiate({
          cardId: cardId,
          userId: session.data?.user?.id,
          cardDesign: {
            ...updatedCardDesign,
            id: card.cardDesign.id,
          } as DesignFromSchemaType,
          cardFields: {
            ...updatedCardFields,
            id: card.cardFields.id,
          } as ContentFormSchemaType,
          cardInfos: cardState.cardInfos.values,
          cardTemplate: '1',
          isDefault: cardState.isDefault ?? false,
          isPublished: cardState.isPublished ?? false,
        })
      );
      submitresponse
        ?.then((res) => {
          const errorMessage = (res as any).error;
          if (errorMessage) {
            toast.error(`Error: Please enter all required value`);
            toggleLoading(false);
            console.log(
              cardState.cardDesign.errors,
              cardState.cardFields.errors,
              cardId,
              session.data?.user?.id,
              updatedCardFields
            );
            throw errorMessage;
          }
          toast.success('Successfully updated');
          cardAction === 'create' &&
            router.push(`/dashboard/builder/?cardId=${cardId}&action=update`);
          toggleLoading(false);
        })
        .catch((err) => {
          toast.error('Something went wrong');
          toggleLoading(false);
          throw err;
        });
    } else {
      toggleLoading(false);
      console.log(cardState.cardFields.errors);
      toast.error(`Error: Please enter all required value`);
    }
  };

  const currentLayout = cardsTemplateList?.find(
    (layout) => layout.id === parseInt(cardState.cardTemplate)
  );

  const variableValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType = {
    backgroundColor:
      cardState.cardDesign.values.backgroundColor.length === 0
        ? cardAction === 'update'
          ? card?.cardDesign.backgroundColor
          : card?.cardTemplate.defaultCardDesign.backgroundColor
        : cardState.cardDesign.values.backgroundColor,
    bio:
      cardState.cardFields.values.bio?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.bio
          : card?.cardTemplate.defaultCardFields.bio ?? ''
        : cardState.cardFields.values.bio,
    firstName:
      cardState.cardFields.values.firstName.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.firstName
          : card?.cardTemplate.defaultCardFields.firstName
        : cardState.cardFields.values.firstName,
    middleName:
      cardState?.cardFields?.values.middleName?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.middleName
          : card?.cardTemplate.defaultCardFields.middleName ?? ''
        : cardState.cardFields.values.middleName,
    lastName:
      cardState?.cardFields?.values.lastName?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.lastName
          : card?.cardTemplate.defaultCardFields.lastName ?? ''
        : cardState.cardFields.values.lastName,
    email:
      cardState?.cardFields?.values.email?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.email
          : card?.cardTemplate.defaultCardFields.email ?? ''
        : cardState.cardFields.values.email,
    company:
      cardState?.cardFields?.values.company?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.company
          : card?.cardTemplate.defaultCardFields.company ?? ''
        : cardState.cardFields.values.company,
    phone:
      cardState?.cardFields?.values.phone?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.phone
          : card?.cardTemplate.defaultCardFields.phone ?? ''
        : cardState.cardFields.values.phone,
    prefix:
      cardState?.cardFields?.values.prefix?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.prefix
          : card?.cardTemplate.defaultCardFields.prefix ?? ''
        : cardState.cardFields.values.prefix,
    suffix:
      cardState?.cardFields?.values.suffix?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.suffix
          : card?.cardTemplate.defaultCardFields.suffix ?? ''
        : cardState.cardFields.values.suffix,
    department:
      cardState?.cardFields?.values.department?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.department
          : card?.cardTemplate.defaultCardFields.department ?? ''
        : cardState.cardFields.values.department,
    address:
      cardState?.cardFields?.values.address?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.address
          : card?.cardTemplate.defaultCardFields.address ?? ''
        : cardState.cardFields.values.address,
    darkMode:
      cardAction === 'update'
        ? cardState?.cardDesign?.values.darkMode ??
          cardState.cardDesign.values.darkMode
        : card?.cardTemplate.defaultCardDesign.darkMode,
    showLogo:
      cardAction === 'update'
        ? card?.cardDesign?.showLogo ?? cardState.cardDesign.values.showLogo
        : card?.cardTemplate.defaultCardDesign.showLogo,
    showSocialIcons:
      cardAction === 'update'
        ? card?.cardDesign?.showSocialIcons ??
          cardState.cardDesign.values.showSocialIcons
        : card?.cardTemplate.defaultCardDesign.showSocialIcons,
    id: card?.id,
    designation:
      cardState?.cardFields?.values.designation?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.designation
          : card?.cardTemplate.defaultCardFields.designation ?? ''
        : cardState.cardFields.values.designation,
    logoUrl:
      cardState.cardDesign.values.logo === undefined ||
      cardState.cardDesign.values.logo === null ||
      cardState.cardDesign.values.logo.length === 0
        ? cardAction === 'update'
          ? `${apiPaths.serverUrl}${card?.cardDesign.logo}`
          : `${apiPaths.serverUrl}${card?.cardTemplate.defaultCardDesign.logo}`
        : cardState.cardDesign.values.logo?.startsWith('blob')
        ? cardState.cardDesign.values.logo
        : `${apiPaths.serverUrl}${cardState.cardDesign.values.logo}`,
    backgroundUrl:
      cardState.cardDesign.values.backgroundImage === undefined ||
      cardState.cardDesign.values.backgroundImage === null ||
      cardState.cardDesign.values.backgroundImage?.length === 0
        ? cardAction === 'update'
          ? `${apiPaths.serverUrl}${card?.cardDesign.backgroundImage}`
          : `${apiPaths.serverUrl}${card?.cardTemplate.defaultCardDesign.backgroundImage}`
        : cardState.cardDesign.values.backgroundImage?.startsWith('blob')
        ? cardState.cardDesign.values.backgroundImage
        : `${apiPaths.serverUrl}${cardState.cardDesign.values.backgroundImage}`,
    website:
      cardState?.cardFields?.values.website?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.website
          : card?.cardTemplate.defaultCardFields.website ?? ''
        : cardState.cardFields.values.website,
  };

  return (
    <>
      <AppBar appBarLabel="My Personal Card">
        <button
          onClick={() => {
            setToggle(!toggle);
          }}
          className={`w-28 lg:hidden  grow lg:grow-0 rounded-lg px-0 ring-1 ring-gray-300 py-2 ${
            toggle ? 'bg-input' : 'bg-blueTheme text-white'
          }`}
        >
          Preview
        </button>
        <button className="w-28 bg-input grow lg:grow-0 rounded-lg px-0 ring-1 ring-gray-300 py-2">
          Save Draft
        </button>
        <button
          onClick={handlePublish}
          className="w-28 bg-blueTheme grow lg:grow-0 text-white rounded-lg shadow-lg shadow-blueBg py-2"
        >
          {publishLoading ? <CircleLoader /> : 'Publish'}
        </button>
      </AppBar>
      <div className="hidden lg:flex-row flex-col gap-6 lg:flex ">
        <SideBarMyCards cardId={cardId} cardAction={cardAction} />
        <div className="basis-2/5 min-w-[100px]">{children}</div>
        <div className="shrink grow">
          <PreviewSection
            layout={currentLayout}
            variableValues={variableValues}
            socialValues={cardState.cardInfos.values}
          />
        </div>
      </div>
      <div className="bloc lg:hidden  gap-12">
        <div className="mt-5 relative">
          <div
            className={`absolute max-lg:w-[calc(100%-0.35rem)] flex flex-col gap-5 duration-500 ${
              toggle ? '' : '-translate-x-[calc(102%)]'
            }`}
          >
            <SideBarMyCards cardId={cardId} cardAction={cardAction} />
            {children}
          </div>
          <div
            className={`absolute duration-500 max-lg:w-[calc(100%-0.35rem)] max-sm:pb-16 ${
              toggle ? 'translate-x-[calc(102%)]' : ''
            }`}
          >
            <PreviewSection
              layout={currentLayout}
              variableValues={variableValues}
              socialValues={cardState.cardInfos.values}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuilderLayout;
