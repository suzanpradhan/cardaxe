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
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import { Mobile, Monitor } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = useState(true);
  const [publishLoading, toggleLoading] = useState(false);
  const [desktopMode, setDesktopMode] = useState(true);

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
    dispatch(userApi.endpoints.getUser.initiate());
  }, [dispatch]);

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

    console.log(
      'cardState.cardDesign.errors',
      cardState.cardDesign.errors,
      cardState.cardFields.errors
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
            toggleLoading(false);
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
      toast.error(`Error: Please enter all required value`);
    }
  };

  const currentLayout = cardState.cardTemplate
    ? cardsTemplateList?.find(
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

  console.log('cardState.cardDesign', cardState);

  return (
    <div className="grid grid-cols-12 min-h-full place-content-start">
      <div className="col-span-12 px-4 h-min">
        <AppBar appBarLabel="My Personal Card">
          <ButtonForm
            label="Preview"
            theme={!toggle ? 'blue' : 'accent'}
            isLoading={publishLoading}
            className="px-4 text-sm rounded-sm w-max"
            handleClick={() => {
              setToggle(!toggle);
            }}
          />
          <ButtonForm
            label="Save Draft"
            theme="accent"
            className="px-4 text-sm rounded-sm w-max"
          />
          <ButtonForm
            label="Publish"
            className="px-4 text-sm rounded-sm w-max"
            isLoading={publishLoading}
            handleClick={handlePublish}
          />
        </AppBar>
      </div>

      <div className="min-h-[100vh-1rem] relative col-span-12 grid grid-cols-12 row-spans-2 gap-x-4 gap-y-4 mx-4 place-content-start">
        <div className="row-span-1 lg:row-span-2 col-span-12 lg:col-span-1">
          <SideBarMyCards
            cardId={cardId}
            cardAction={cardAction}
            cardState={cardState}
          />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-xl border border-zinc-200 px-4 py-4">
            {children}
          </div>
        </div>
        <div
          className={`col-span-12 lg:col-span-7 bg-white min-h-[100vh-1rem] absolute top-0 bottom-0 left-0 right-0 z-30 lg:static duration-500 ${
            toggle ? 'translate-x-[calc(100%)] lg:translate-x-0 -right-4' : ''
          }`}
        >
          <div className="h-full overflow-hidden rounded-3xl border border-zinc-200 px-4 py-4 sticky top-4">
            <div className="flex items-center justify-center mb-10">
              <div className="flex bg-zinc-200 rounded-md overflow-hidden text-zinc-700 hover:shadow-md">
                <div
                  onClick={() => setDesktopMode((prev) => !prev)}
                  className={`px-4 h-10 flex items-center gap-2 cursor-pointer ${!desktopMode ? 'hover:bg-zinc-900 bg-zinc-800 text-white' : 'hover:bg-zinc-300'}`}
                >
                  <Mobile size="24" variant="Bulk" />
                  Mobile
                </div>
                <div
                  onClick={() => setDesktopMode((prev) => !prev)}
                  className={`px-4 h-10 flex items-center gap-2 cursor-pointer ${desktopMode ? 'hover:bg-zinc-900 bg-zinc-800 text-white' : 'hover:bg-zinc-300'}`}
                >
                  <Monitor size="24" variant="Bulk" />
                  Desktop
                </div>
              </div>
            </div>
            <PreviewSection
              layout={currentLayout}
              user={user}
              variableValues={variableValues}
              socialValues={cardState.cardInfos.values}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderLayout;
