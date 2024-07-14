'use client';

import { VariableValueType } from '@/components/CardLayouts.server';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updatedDiff } from 'deep-object-diff';

import ButtonForm from '@/components/ButtonForm';
import AppBar from '@/components/dashboard/AppBar';
import PreviewSection from '@/components/myCards/PreviewSection';
import SideBarMyCards from '@/components/myCards/SideBarMyCards';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { cn } from '@/lib/utils';
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
  InfoSchemaType,
} from '@/module/cards/cardsType';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [publishLoading, togglePublishLoading] = useState(false);
  const [saveLoading, toggleSaveLoading] = useState(false);

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
        ?.data as PaginatedResponseType<CardTemplatesType>
  );

  const cardInfoKeyValue: { [key: number]: InfoSchemaType } =
    card?.cardInfos.reduce(
      (acc, current) => {
        if (current.id) {
          acc[parseInt(current.id!)] = current;
        }
        return acc;
      },
      {} as { [key: number]: InfoSchemaType }
    );

  useEffect(() => {
    if (cardId) dispatch(cardsApi.endpoints.getCard.initiate(cardId));
    dispatch(cardsApi.endpoints.getCardsTemplate.initiate());
    dispatch(userApi.endpoints.getUser.initiate());
  }, [dispatch, cardId]);

  useEffect(() => {
    const updateCardState = (action: string) => {
      if (!card) return;
      switch (action) {
        case 'create':
          dispatch(updateContentForm(initialState.cardFields.values));
          dispatch(updateDesignForm(initialState.cardDesign.values));
          dispatch(updateDefaultCard(false));
          dispatch(updateInfosForm({}));
          dispatch(validateForms('cardDesign'));
          dispatch(validateForms('cardFields'));
          break;
        case 'update':
          dispatch(updateContentForm(card.cardFields));
          dispatch(updateDesignForm(card.cardDesign));
          dispatch(updateInfosForm(cardInfoKeyValue));
          dispatch(updateCardTemplate(card.cardTemplate.id.toString()));
          dispatch(updateDefaultCard(card.isDefault));
          dispatch(updateCardTemplate(card.cardTemplate.id.toString()));
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
    toggleSaveLoading(true);
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
      console.log(cardState.cardInfos);
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
          cardTemplate: cardState.cardTemplate,
          isDefault: cardState.isDefault ?? false,
          isPublished: true,
        })
      );
      submitresponse
        ?.then((res) => {
          const errorMessage = (res as any).error;
          if (errorMessage) {
            toast.error(`Error: Please enter all required value`);
            toggleSaveLoading(false);
            throw errorMessage;
          }
          toast.success('Successfully updated');
          cardAction === 'create' &&
            router.push(`/dashboard/builder/?cardId=${cardId}&action=update`);
          toggleSaveLoading(false);
        })
        .catch((err) => {
          toast.error('Something went wrong');
          toggleSaveLoading(false);
          throw err;
        });
    } else {
      toggleSaveLoading(false);
      toast.error(`Error: Please enter all required value`);
    }
  };

  const handleSave = () => {
    toggleSaveLoading(true);
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
      console.log(cardState.cardInfos);
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
          cardTemplate: cardState.cardTemplate,
          isDefault: cardState.isDefault ?? false,
          isPublished: false,
        })
      );
      submitresponse
        ?.then((res) => {
          const errorMessage = (res as any).error;
          if (errorMessage) {
            toast.error(`Error: Please enter all required value`);
            toggleSaveLoading(false);
            throw errorMessage;
          }
          toast.success('Successfully updated');
          cardAction === 'create' &&
            router.push(`/dashboard/builder/?cardId=${cardId}&action=update`);
          toggleSaveLoading(false);
        })
        .catch((err) => {
          toast.error('Something went wrong');
          toggleSaveLoading(false);
          throw err;
        });
    } else {
      toggleSaveLoading(false);
      toast.error(`Error: Please enter all required value`);
    }
  };

  const currentLayout = cardState.cardTemplate
    ? cardsTemplateList?.results.find(
        (layout) => layout.id === parseInt(cardState.cardTemplate!)
      )
    : undefined;

  const variableValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType = {
    backgroundColor:
      cardState.cardDesign.values.backgroundColor?.length === 0
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
      cardState.cardDesign.values.logo?.length === 0
        ? cardAction === 'update'
          ? card?.cardDesign.logo
            ? `${apiPaths.serverUrl}${card?.cardDesign.logo}`
            : undefined
          : card?.cardTemplate.defaultCardDesign.logo
            ? `${apiPaths.serverUrl}${card?.cardTemplate.defaultCardDesign.logo}`
            : undefined
        : cardState.cardDesign.values.logo?.startsWith('blob')
          ? cardState.cardDesign.values.logo
          : cardState.cardDesign.values.logo
            ? `${apiPaths.serverUrl}${cardState.cardDesign.values.logo}`
            : undefined,
    backgroundUrl:
      cardState.cardDesign.values.backgroundImage === undefined ||
      cardState.cardDesign.values.backgroundImage === null ||
      cardState.cardDesign.values.backgroundImage?.length === 0
        ? cardAction === 'update'
          ? card?.cardDesign.backgroundImage
            ? `${apiPaths.serverUrl}${card?.cardDesign.backgroundImage}`
            : undefined
          : card?.cardTemplate.defaultCardDesign.backgroundImage
            ? `${apiPaths.serverUrl}${card?.cardTemplate.defaultCardDesign.backgroundImage}`
            : undefined
        : cardState.cardDesign.values.backgroundImage?.startsWith('blob')
          ? cardState.cardDesign.values.backgroundImage
          : cardState.cardDesign.values.backgroundImage
            ? `${apiPaths.serverUrl}${cardState.cardDesign.values.backgroundImage}`
            : undefined,
    website:
      cardState?.cardFields?.values.website?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.website
          : card?.cardTemplate.defaultCardFields.website ?? ''
        : cardState.cardFields.values.website,
  };

  const user = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );

  return (
    <div>
      <div className="flex h-full flex-col px-8 md:h-screen">
        <AppBar appBarLabel="My Personal Card">
          <span className="max-md:grow">
            <ButtonForm
              label="Preview"
              theme={isPreview ? 'blue' : 'accent'}
              className="rounded-sm px-4 text-sm"
              handleClick={() => {
                contentRef.current?.scrollTo({
                  top: 0,
                  left: !isPreview ? contentRef.current.scrollWidth : 0,
                  behavior: 'smooth',
                });
                setIsPreview(!isPreview);
              }}
            />
          </span>
          <span className="max-md:grow">
            <ButtonForm
              label="Save Draft"
              isLoading={saveLoading}
              handleClick={handleSave}
              theme="accent"
              className="rounded-sm px-4 text-sm"
            />
          </span>
          <span className="max-md:grow">
            <ButtonForm
              label="Publish"
              className="rounded-sm px-4 text-sm"
              isLoading={publishLoading}
              handleClick={handlePublish}
            />
          </span>
        </AppBar>
        {/* web view */}
        <div
          className="flex min-h-0 flex-1 gap-4 overflow-x-auto md:flex-row"
          ref={contentRef}
        >
          {!isPreview && (
            <div className="flex flex-col max-md:w-full md:flex-row md:gap-6">
              <SideBarMyCards
                cardId={cardId}
                cardAction={cardAction}
                cardState={cardState}
              />
              {/* <ScrollArea className="w-[calc(100vw-100px)] shrink-0 md:w-[calc(100vw-15rem-100px-100px)] lg:w-[420px]"> */}
              {children}
              {/* </ScrollArea> */}
            </div>
          )}
          <ScrollArea
            className={cn('w-max shrink-0 lg:flex-1', isPreview && 'w-full')}
          >
            <PreviewSection
              layout={currentLayout}
              user={user}
              variableValues={variableValues}
              socialValues={cardState.cardInfos.values}
            />
          </ScrollArea>
        </div>
      </div>
      {/* <div className="block gap-12 lg:hidden">
        <div className="relative mt-5">
          <div
            className={`absolute flex flex-col gap-5 duration-500 max-lg:w-[calc(100%-0.35rem)]`}
          >
            <SideBarMyCards
              cardId={cardId}
              cardAction={cardAction}
              cardState={cardState}
            />
            {children}
          </div>
          <div
            className={`absolute duration-500 max-lg:w-[calc(100%-0.35rem)] max-sm:pb-16`}
          >
            <PreviewSection
              user={user}
              layout={currentLayout}
              variableValues={variableValues}
              socialValues={cardState.cardInfos.values}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BuilderLayout;
