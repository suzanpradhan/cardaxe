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
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const MyCardsPage = () => {
  const router = useRouter();
  const cardState = useSelector((state: RootState) => state.card);
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEditCard = (cardId: number) => {
    router.push(`/dashboard/builder/?cardId=${cardId}&action=update`);
  };

  return (
    <div className="mt-5">
      <AppBar appBarLabel="My Cards">
        <button
          onClick={() => hanldeCreateCard()}
          className="px-5 bg-blueTheme text-white rounded-lg shadow-lg shadow-blueBg"
        >
          Create New card
        </button>
      </AppBar>
      <div className="flex flex-col gap-5 my-10 w-96">
        {cardsList?.map((card, index) => {
          const imageUrl = `${apiPaths.serverUrl}${card.cardDesign.backgroundImage}`;
          return (
            <div key={index} className="w-full">
              {card.id && (
                <button
                  onClick={() => handleEditCard(card.id!)}
                  className="w-full"
                >
                  <CardLayouts
                    htmlSource={card.cardTemplate?.htmlCode}
                    variableValues={{
                      ...card.cardFields,
                      ...card.cardDesign,
                      imageUrl: imageUrl,
                    }}
                  />
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
