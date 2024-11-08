'use client';

import { VariableValueType } from '@/components/CardLayouts';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { updatedDiff } from 'deep-object-diff';

import ButtonForm from '@/components/ButtonForm';
import PreviewSection from '@/components/myCards/PreviewSection';
import SideBarMyCards from '@/components/myCards/SideBarMyCards';
import { RootState } from '@/core/redux/store';
import {
  updateCardBasics,
  updateCardTemplate,
  updateContentForm,
  updateDefaultCard,
  updateDesignForm,
  updateInfosForm,
  validateForms,
} from '@/module/cards/cardSlice';
import cardsApi from '@/module/cards/cardsApi';
import {
  CardBasicsUpdateType,
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
import { Edit } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const [isPreview, setIsPreview] = useState(false);
  const [publishLoading, togglePublishLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [saveLoading, toggleSaveLoading] = useState(false);

  const session = useSession();
  const searchParams = useSearchParams();
  const cardSlug: string = params.cardSlug as string;
  const cardAction = searchParams.get('action');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cardState = useAppSelector((state: RootState) => state.card);

  const card = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCard-${cardSlug}`]
        ?.data as CardResponseType<CardTemplatesType>
  );

  const cardInfoKeyValue: { [key: number]: InfoSchemaType } =
    card?.cardInfos.reduce(
      (acc, current) => {
        if (current.cardInfo) {
          acc[parseInt(current.cardInfo!)] = current;
        }
        return acc;
      },
      {} as { [key: number]: InfoSchemaType }
    );

  useEffect(() => {
    if (cardSlug) dispatch(cardsApi.endpoints.getCard.initiate(cardSlug));
    // dispatch(cardsApi.endpoints.getCardsTemplate.initiate());
    dispatch(userApi.endpoints.getUser.initiate());
  }, [dispatch, params]);

  useEffect(() => {
    const updateCardState = (action: string) => {
      if (!card) return;
      switch (action) {
        case 'create':
          dispatch(updateDefaultCard(false));
          dispatch(updateContentForm(card.cardFields));
          dispatch(updateDesignForm(card.cardDesign));
          dispatch(updateInfosForm(cardInfoKeyValue));
          dispatch(updateCardBasics({ title: card.title, slug: card.slug }));
          dispatch(updateCardTemplate(card.cardTemplate.id.toString()));
          dispatch(validateForms('cardDesign'));
          dispatch(validateForms('cardFields'));
          break;
        case 'update':
          dispatch(updateContentForm(card.cardFields));
          dispatch(updateDesignForm(card.cardDesign));
          dispatch(updateInfosForm(cardInfoKeyValue));
          dispatch(updateCardTemplate(card.cardTemplate.id.toString()));
          dispatch(updateDefaultCard(card.isDefault));
          dispatch(updateCardBasics({ title: card.title, slug: card.slug }));
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
  }, [card?.slug, card?.title, cardAction, cardSlug, dispatch]);

  const handlePublish = () => {
    togglePublishLoading(true);
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
      cardSlug &&
      session.data?.user?.id &&
      updatedCardFields
    ) {
      submitresponse = dispatch(
        cardsApi.endpoints.upDateCard.initiate({
          userId: session.data?.user?.id,
          cardBasics: {
            slug: cardState.cardBasics.values.slug,
            title: cardState.cardBasics.values.title,
          },
          cardSlug: cardSlug,
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
            // toast.error(`Error: Please enter all required value`);
            togglePublishLoading(false);
            throw errorMessage;
          }
          // toast.success('Successfully updated');
          if ((res as any).data.slug) {
            router.push(
              `/dashboard/builder/${(res as any).data.slug}/?action=update`
            );
          }

          togglePublishLoading(false);
        })
        .catch((err) => {
          // toast.error('Something went wrong');
          togglePublishLoading(false);
          throw err;
        });
    } else {
      togglePublishLoading(false);
      // toast.error(`Error: Please enter all required value`);
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
      cardSlug &&
      session.data?.user?.id &&
      updatedCardFields
    ) {
      submitresponse = dispatch(
        cardsApi.endpoints.upDateCard.initiate({
          userId: session.data?.user?.id,
          cardSlug: cardSlug,
          cardBasics: {
            slug: cardState.cardBasics.values.slug,
            title: cardState.cardBasics.values.title,
          },
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
            // toast.error(`Error: Please enter all required value`);
            toggleSaveLoading(false);
            throw errorMessage;
          }
          // toast.success('Successfully updated');

          if ((res as any).data.slug) {
            router.push(
              `/dashboard/builder/${(res as any).data.slug}/?action=update`
            );
          }
          toggleSaveLoading(false);
        })
        .catch((err) => {
          // toast.error('Something went wrong');
          toggleSaveLoading(false);
          throw err;
        });
    } else {
      toggleSaveLoading(false);
      // toast.error(`Error: Please enter all required value`);
    }
  };

  const variableValues: ContentFormUpdateSchemaType &
    CardBasicsUpdateType &
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
          : (card?.cardTemplate.defaultCardFields.bio ?? '')
        : cardState.cardFields.values.bio,
    firstName:
      cardState.cardFields.values.firstName?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.firstName
          : card?.cardTemplate.defaultCardFields.firstName
        : cardState.cardFields.values.firstName,
    middleName:
      cardState?.cardFields?.values.middleName?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.middleName
          : (card?.cardTemplate.defaultCardFields.middleName ?? '')
        : cardState.cardFields.values.middleName,
    lastName:
      cardState?.cardFields?.values.lastName?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.lastName
          : (card?.cardTemplate.defaultCardFields.lastName ?? '')
        : cardState.cardFields.values.lastName,
    email:
      cardState?.cardFields?.values.email?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.email
          : (card?.cardTemplate.defaultCardFields.email ?? '')
        : cardState.cardFields.values.email,
    company:
      cardState?.cardFields?.values.company?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.company
          : (card?.cardTemplate.defaultCardFields.company ?? '')
        : cardState.cardFields.values.company,
    phone:
      cardState?.cardFields?.values.phone?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.phone
          : (card?.cardTemplate.defaultCardFields.phone ?? '')
        : cardState.cardFields.values.phone,
    prefix:
      cardState?.cardFields?.values.prefix?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.prefix
          : (card?.cardTemplate.defaultCardFields.prefix ?? '')
        : cardState.cardFields.values.prefix,
    suffix:
      cardState?.cardFields?.values.suffix?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.suffix
          : (card?.cardTemplate.defaultCardFields.suffix ?? '')
        : cardState.cardFields.values.suffix,
    department:
      cardState?.cardFields?.values.department?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.department
          : (card?.cardTemplate.defaultCardFields.department ?? '')
        : cardState.cardFields.values.department,
    address:
      cardState?.cardFields?.values.address?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.address
          : (card?.cardTemplate.defaultCardFields.address ?? '')
        : cardState.cardFields.values.address,
    darkMode:
      cardAction === 'update'
        ? (cardState?.cardDesign?.values.darkMode ??
          cardState.cardDesign.values.darkMode)
        : card?.cardTemplate.defaultCardDesign.darkMode,
    showLogo:
      cardAction === 'update'
        ? (card?.cardDesign?.showLogo ?? cardState.cardDesign.values.showLogo)
        : card?.cardTemplate.defaultCardDesign.showLogo,
    showSocialIcons:
      cardAction === 'update'
        ? (card?.cardDesign?.showSocialIcons ??
          cardState.cardDesign.values.showSocialIcons)
        : card?.cardTemplate.defaultCardDesign.showSocialIcons,
    id: card?.id,
    designation:
      cardState?.cardFields?.values.designation?.length === 0
        ? cardAction === 'update'
          ? card?.cardFields.designation
          : (card?.cardTemplate.defaultCardFields.designation ?? '')
        : cardState.cardFields.values.designation,
    logoUrl:
      cardState.cardDesign.values.logo === undefined ||
      cardState.cardDesign.values.logo === null
        ? // cardState.cardDesign.values.logo?.length === 0
          cardAction === 'update'
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
      cardState.cardDesign.values.backgroundImage === null
        ? // cardState.cardDesign.values.backgroundImage?.length === 0
          cardAction === 'update'
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
          : (card?.cardTemplate.defaultCardFields.website ?? '')
        : cardState.cardFields.values.website,
  };

  const user = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateCardBasics({ title: e.target.value }));
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden px-2 lg:px-4">
      <div className="mx-auto mt-4 flex h-auto w-full max-w-sm flex-col gap-3 lg:max-w-none lg:flex-row">
        <div className="group flex h-10 w-full flex-grow items-center gap-2 rounded-md bg-zinc-100 px-4 has-[:focus]:border-1 has-[:focus]:border-black">
          <label htmlFor="title" className="text-sm text-grayfont">
            Title:
          </label>
          {/* <h2 className="text-sm font-bold">{appBarLabel}</h2> */}
          <input
            id="title"
            type="text"
            className="h-full w-80 grow bg-transparent text-sm font-bold focus:border-0 focus:outline-0"
            value={cardState.cardBasics.values.title ?? ''}
            onChange={(e) => handleTitleChange(e)}
          />
          <label htmlFor="title" className="text-grayfont">
            <Edit size="20" />
          </label>
        </div>
        <div className="flex items-center gap-2">
          <span className="grow">
            <ButtonForm
              label="Preview"
              theme={isPreview ? 'blue' : 'accent'}
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
          </span>
          <span className="grow">
            <ButtonForm
              label="Save Draft"
              isLoading={saveLoading}
              handleClick={handleSave}
              theme="accent"
              className="min-w-[7rem] rounded-sm text-sm"
            />
          </span>
          <span className="grow">
            <ButtonForm
              label="Publish"
              className="min-w-[5rem] rounded-sm text-sm"
              isLoading={publishLoading}
              handleClick={handlePublish}
            />
          </span>
        </div>
      </div>
      <div className="mb-5 flex flex-1 grow items-start gap-4 max-lg:mb-20">
        <div
          className={`mx-auto w-full max-w-sm lg:block lg:max-w-md ${!isPreview ? 'block' : 'hidden'}`}
        >
          <div className="flex h-full flex-col gap-4 lg:flex-row">
            <div className="w-full @container lg:basis-24">
              <SideBarMyCards
                cardSlug={cardSlug}
                cardAction={cardAction}
                cardState={cardState}
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
};

export default BuilderLayout;
