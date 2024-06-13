'use client';

import CardLayouts from '@/components/CardLayouts';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { CardTemplatesType } from '@/module/cards/cardsType';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const LayoutPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cardsApi.endpoints.getCardsTemplate.initiate());
  }, [dispatch]);

  const cardsList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getCardsTemplate-get-cards-endpoint']
        ?.data as CardTemplatesType[]
  );
  const cardState = useSelector((state: RootState) => state.card);

  return (
    <div>
      {cardsList?.map((card, index) => {
        const imageUrl = `${cardState.cardDesign.values.backgroundImage}`;
        return (
          <div key={index}>
            {card.id && (
              <CardLayouts
                htmlSource={card.htmlCode}
                variableValues={{
                  ...card.defaultCardFields,
                  ...card.defaultCardDesign,
                  logoUrl: `${card.defaultCardDesign.logo}`,
                  backgroundUrl: `${apiPaths.serverUrl}${card.defaultCardDesign.backgroundImage}`,
                }}
              />
            )}
          </div>
        );
      })}

      {/* {isSuccess && data && Parser(data[0].html_code)}
      {isLoading && 'Loading...'}
      {isError && error && 'Error...'} */}
    </div>
  );
};

export default LayoutPage;
