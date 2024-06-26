'use client';

import CardLayouts from '@/components/CardLayouts.server';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updateCardTemplate } from '@/module/cards/cardSlice';
import cardsApi from '@/module/cards/cardsApi';
import { CardTemplatesType } from '@/module/cards/cardsType';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const LayoutPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cardsApi.endpoints.getCardsTemplate.initiate());
  }, [dispatch]);

  const cardTemplates = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getCardsTemplate-get-cards-endpoint']
        ?.data as CardTemplatesType[]
  );
  const cardState = useSelector((state: RootState) => state.card);

  console.log('cardState.cardTemplate', cardState.cardTemplate);
  return (
    <div>
      {cardTemplates?.map((card, index) => {
        return (
          <div key={index}>
            {card.id && (
              <button
                onClick={() => dispatch(updateCardTemplate(card.id.toString()))}
                className={`w-full p-1 h-full m-0 rounded-lg  ${cardState.cardTemplate === card.id.toString() ? 'ring-2 ring-blueTheme' : ''}`}
              >
                {' '}
                <CardLayouts
                  htmlSource={card.htmlCode}
                  variableValues={{
                    ...card.defaultCardFields,
                    ...card.defaultCardDesign,
                    ...card.cardTemplateCategory,
                    logoUrl: `${card.defaultCardDesign.logo}`,
                    backgroundUrl: `${apiPaths.serverUrl}${card.defaultCardDesign.backgroundImage}`,
                  }}
                />
              </button>
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
