'use client';
import CardLayouts from '@/components/CardLayouts';
import AppBar from '@/components/dashboard/AppBar';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyCardsPage = () => {
  const router = useRouter();
  const [createLoading, toggleLoading] = useState(false);
  const { data } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cardsApi.endpoints.getMyCards.initiate());
  }, [dispatch]);

  const cardsList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getMyCards']?.data as Array<
        CardResponseType<CardTemplatesType>
      >
  );

  const hanldeCreateCard = () => {
    toggleLoading(true);

    if (data?.user) {
      dispatch(cardsApi.endpoints.createCard.initiate(data?.user.id))
        .then((createCardResponse) => {
          Object.prototype.hasOwnProperty.call(createCardResponse, 'data') &&
            (createCardResponse as any).data.id &&
            router.push(
              `/dashboard/builder/?cardId=${
                (createCardResponse as any).data.id
              }&action=create`
            );
          toggleLoading(false);
        })
        .catch((error) => {
          toggleLoading(false);
          console.log(error);
          throw error;
        });
    }
  };

  const handleEditCard = (cardId: number) => {
    router.push(`/dashboard/builder/?cardId=${cardId}&action=update`);
  };

  console.log('cardsList', cardsList);

  return (
    <div className="mt-5">
      <AppBar appBarLabel="My Cards">
        <button
          onClick={() => hanldeCreateCard()}
          className="basis-60 shrink bg-blueTheme grow lg:grow-0 text-white rounded-lg shadow-lg shadow-blueBg py-2"
        >
          {createLoading ? (
            <l-ring
              size="35"
              stroke="2"
              bg-opacity="0"
              speed="2"
              color="white"
            ></l-ring>
          ) : (
            'Create New card'
          )}
        </button>
      </AppBar>
      <div className="flex flex-col gap-5 my-10 max-w-md">
        {cardsList?.map((card, index) => {
          return (
            <div key={index} className="w-full">
              {card.id && (
                <button
                  onClick={() => handleEditCard(card.id!)}
                  className="w-full"
                >
                  {card.cardDesign.logo != null &&
                    card.cardDesign.logo != undefined && (
                      <CardLayouts
                        htmlSource={card.cardTemplate?.htmlCode}
                        variableValues={{
                          ...card.cardFields,
                          ...card.cardDesign,
                          logoUrl: `${apiPaths.serverUrl}${card.cardDesign.logo}`,
                          backgroundUrl: `${apiPaths.serverUrl}${card.cardDesign.backgroundImage}`,
                        }}
                      />
                    )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCardsPage;
