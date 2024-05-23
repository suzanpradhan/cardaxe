'use client';
import AppBar from '@/components/dashboard/AppBar';
import PreviewSection from '@/components/myCards/PreviewSection';
import SideBarMyCards from '@/components/myCards/SideBarMyCards';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { CardTemplatesType, UpdateCardState } from '@/module/cards/cardsType';
import { updatedDiff } from 'deep-object-diff';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');
  const dispatch = useAppDispatch();
  const cardState = useSelector((state: RootState) => state.card);

  const card = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCard-${cardId}`]
        ?.data as UpdateCardState<CardTemplatesType>['card']
  );

  const handlePublish = () => {
    var submitresponse = undefined;

    const updatedCardFields = card.cardTemplate?.defaultCardFields
      ? updatedDiff(
          card.cardTemplate?.defaultCardFields,
          cardState.card.cardFields
        )
      : undefined;

    const updatedCardDesign = updatedDiff(
      card.cardDesign,
      cardState.card.cardDesign
    );

    console.log(cardState.errors);

    if (
      !cardState.errors &&
      cardId &&
      session.data?.user?.id &&
      updatedCardFields
    ) {
      submitresponse = dispatch(
        cardsApi.endpoints.upDateCard.initiate({
          cardFields: updatedCardFields,
          cardDesign: updatedCardDesign,
          cardId: cardId.toString(),
          isDefault: cardState.card.isDefault,
          userId: session.data?.user?.id,
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
        })
        .catch((err) => {
          toast.error('Something went wrong');
          console.log(err);
          throw err;
        });
    }
  };

  // useEffect(() => {
  //   if (cardId) {
  //     dispatch(cardsApi.endpoints.getCard.initiate(cardId));
  //   }
  //   if (card?.cardTemplate?.defaultCardFields) {
  //     dispatch(updateContentForm({ ...card.cardTemplate?.defaultCardFields }));
  //   }
  // }, [dispatch, cardId, card]);

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
        <SideBarMyCards cardId={cardId} />
        <div className="basis-2/5 min-w-[100px]">{children}</div>
        <PreviewSection card={cardState.card} />
      </div>
    </div>
  );
};

export default BuilderLayout;
