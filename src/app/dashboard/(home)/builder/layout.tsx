'use client';
import AppBar from '@/components/dashboard/AppBar';
import PreviewSection from '@/components/myCards/PreviewSection';
import SideBarMyCards from '@/components/myCards/SideBarMyCards';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updateContentForm } from '@/module/cards/cardSlice';
import cardsApi from '@/module/cards/cardsApi';
import { CardTemplatesType, UpdateCardState } from '@/module/cards/cardsType';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');
  const dispatch = useAppDispatch();
  const card = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCard-${cardId}`]
        ?.data as UpdateCardState<CardTemplatesType>['card']
  );

  useEffect(() => {
    if (cardId) {
      dispatch(cardsApi.endpoints.getCard.initiate(cardId));
    }
    if (card?.cardTemplate?.defaultCardFields) {
      dispatch(updateContentForm({ ...card.cardTemplate?.defaultCardFields }));
    }
  }, [dispatch, cardId, card]);

  return (
    <div className="p-6 flex flex-col gap-6">
      <AppBar cardId={cardId} card={card} />
      <div className="flex gap-6">
        <SideBarMyCards cardId={cardId} />
        <div className="basis-2/5 min-w-[100px]">{children}</div>
        <PreviewSection />
      </div>
    </div>
  );
};

export default BuilderLayout;
