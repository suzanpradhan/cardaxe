'use client';
import AppBar from '@/components/dashboard/AppBar';
import PreviewSection from '@/components/myCards/PreviewSection';
import SideBarMyCards from '@/components/myCards/SideBarMyCards';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import {
  updateCardTemplate,
  updateContentForm,
  updateDesignForm,
  validateForms,
} from '@/module/cards/cardSlice';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import { updatedDiff } from 'deep-object-diff';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
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
          dispatch(
            updateContentForm((card as any).cardTemplate.defaultCardFields)
          );
          break;
        case 'update':
          dispatch(updateContentForm((card as any).cardFields));
          dispatch(updateDesignForm((card as any).cardDesign));
          dispatch(updateCardTemplate((card as any).cardTemplate.id));
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
        ? updatedDiff(card.cardFields, cardState.cardFields.values)
        : undefined),
    };

    const updatedCardDesign = updatedDiff(
      card.cardDesign,
      cardState.cardDesign.values
    );

    console.log(Object.keys(cardState.cardFields.errors).length === 0);

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
          cardDesign: updatedCardDesign,
          cardFields: updatedCardFields,
          cardTemplate: '1',
          isDefault: cardState.isDefault ?? false,
          isPublished: cardState.isPublished ?? false,
        })
      );
      submitresponse
        ?.then((res) => {
          const errorMessage = (res as any).error;
          if (errorMessage) {
            toast.error(`Error:${errorMessage}`);
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
        <button className="w-28 bg-input rounded-lg p-2 ring-1 ring-gray-300">
          Save Draft
        </button>

        <button
          onClick={handlePublish}
          className="w-28 bg-blueTheme text-white rounded-lg shadow-lg shadow-blueBg"
        >
          Publish
        </button>
      </AppBar>
      <div className="flex gap-6">
        <SideBarMyCards cardId={cardId} cardAction={cardAction} />
        <div className="basis-2/5 min-w-[100px]">{children}</div>
        <div className="shrink">
          <PreviewSection card={cardState} layout={currentLayout} />
        </div>
      </div>
    </div>
  );
};

export default BuilderLayout;
