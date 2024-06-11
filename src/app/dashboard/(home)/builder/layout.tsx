'use client';
import AppBar from '@/components/dashboard/AppBar';
import PreviewSection from '@/components/myCards/PreviewSection';
import SideBarMyCards from '@/components/myCards/SideBarMyCards';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import {
  initialState,
  updateCardTemplate,
  updateContentForm,
  updateDesignForm,
  validateForms,
} from '@/module/cards/cardSlice';
import cardsApi from '@/module/cards/cardsApi';
import {
  CardResponseType,
  CardTemplatesType,
  ContentFormSchemaType,
  DesignFromSchemaType,
} from '@/module/cards/cardsType';
import { updatedDiff } from 'deep-object-diff';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = useState(true);
  const session = useSession();
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');
  const cardAction = searchParams.get('action');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cardState = useSelector((state: RootState) => state.card);

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
          dispatch(updateContentForm((card as any).cardFields));
          dispatch(
            updateDesignForm({
              ...(card as any).cardDesign,
              backgroundImage: `${apiPaths.serverUrl}${
                (card as any).cardDesign.backgroundImage
              }`,
            })
          );
          dispatch(updateCardTemplate((card as any).cardTemplate.id));
          dispatch(validateForms('cardDesign'));
          dispatch(validateForms('cardFields'));
          break;
      }
    };

    if (cardAction) updateCardState(cardAction);
  }, [card]);

  const handlePublish = () => {
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

    console.log(cardState);

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
          cardDesign: updatedCardDesign as DesignFromSchemaType,
          cardFields: updatedCardFields as ContentFormSchemaType,
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
            throw errorMessage;
          }
          toast.success('Successfully updated');
          cardAction === 'create' &&
            router.push(`/dashboard/builder/?cardId=${cardId}&action=update`);
        })
        .catch((err) => {
          toast.error('Something went wrong');
          console.log(err);
          throw err;
        });
    }
  };

  const currentLayout = cardsTemplateList?.find(
    (layout) => layout.id === parseInt(cardState.cardTemplate)
  );

  return (
    <div className="p-6 flex flex-col gap-6">
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
          Publish
        </button>
      </AppBar>
      <div className="hidden lg:flex-row flex-col gap-6 lg:flex ">
        <SideBarMyCards cardId={cardId} cardAction={cardAction} />
        <div className="basis-2/5 min-w-[100px]">{children}</div>
        <div className="shrink grow">
          <PreviewSection
            card={card}
            layout={currentLayout}
            cardAction={cardAction}
          />
        </div>
      </div>
      <div className="bloc lg:hidden  gap-12">
        <SideBarMyCards cardId={cardId} cardAction={cardAction} />
        <div className="mt-5 relative">
          <div
            className={`absolute max-lg:w-[calc(100%-0.35rem)] duration-500 ${
              toggle ? '' : '-translate-x-[calc(102%)]'
            }`}
          >
            {children}
          </div>
          <div
            className={`absolute duration-500 max-lg:w-[calc(100%-0.35rem)] max-sm:pb-16 ${
              toggle ? 'translate-x-[calc(102%)]' : ''
            }`}
          >
            <PreviewSection
              card={card}
              cardAction={cardAction}
              layout={currentLayout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderLayout;
