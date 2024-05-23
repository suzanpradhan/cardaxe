'use client';
import CardLayouts from '@/components/CardLayouts';
import AppBar from '@/components/dashboard/AppBar';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updateContentForm } from '@/module/cards/cardSlice';
import cardsApi from '@/module/cards/cardsApi';
import { CardState, CardTemplatesType } from '@/module/cards/cardsType';
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
      state.baseApi.queries['getMyCards']
        ?.data as CardState<CardTemplatesType>['card'][]
  );

  const hanldeCreateCard = () => {
    if (data?.user) {
      dispatch(cardsApi.endpoints.createCard.initiate(data?.user.id))
        .then((createCardResponse) => {
          Object.prototype.hasOwnProperty.call(createCardResponse, 'data') &&
            (createCardResponse as any).data.id &&
            dispatch(
              cardsApi.endpoints.getCard.initiate(
                (createCardResponse as any).data.id
              )
            )
              .then((getCardresponse) => {
                console.log('getCardresponse', getCardresponse);
                Object.prototype.hasOwnProperty.call(
                  createCardResponse,
                  'data'
                ) &&
                  (getCardresponse as any).data.cardTemplate
                    .defaultCardFields &&
                  (dispatch(
                    updateContentForm(
                      (getCardresponse as any).data.cardTemplate
                        .defaultCardFields
                    )
                  ),
                  router.push(
                    `/dashboard/builder/?cardId=${
                      (getCardresponse as any).data.id
                    }`
                  ));
              })
              .catch((error) => {
                console.log(error);
              });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEditCard = (cardId: number) => {
    console.log('cardid', cardId);
    dispatch(cardsApi.endpoints.getCard.initiate(cardId.toString()))
      .then((getCardresponse) => {
        console.log('getCardresponse', getCardresponse);
        (getCardresponse as any).data.cardFields &&
          (dispatch(
            updateContentForm((getCardresponse as any).data.cardFields)
          ),
          router.push(
            `/dashboard/builder/?cardId=${(getCardresponse as any).data.id}`
          ));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleClick = async () => {
  //   if (data?.user) {
  //     try {
  //       const response = await Promise.resolve(
  //         dispatch(cardsApi.endpoints.createCard.initiate(data?.user.id))
  //       );
  //       console.log('create card response', response);

  //       if (
  //         Object.prototype.hasOwnProperty.call(response, 'data') &&
  //         (response as any).data?.cardTemplate?.defaultCardFields
  //       ) {
  //         dispatch(
  //           updateContentForm({
  //             ...(response as any).data?.cardTemplate?.defaultCardFields,
  //           })
  //         );
  //         router.push(
  //           `/dashboard/builder/?cardId=${(response as any).data.id}`
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
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
        {cardsList?.map((card, index) => (
          <div key={index}>
            {card.id && (
              <button onClick={() => handleEditCard(card.id!)}>
                {/* {JSON.stringify(card.cardTemplate)} */}

                <CardLayouts
                  htmlSource={card.cardTemplate?.htmlCode}
                  variableValues={{ ...card.cardFields, ...card.cardDesign }}
                />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCardsPage;
