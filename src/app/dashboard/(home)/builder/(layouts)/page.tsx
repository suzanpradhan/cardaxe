'use client';

import CardLayouts from '@/components/CardLayouts.server';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
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
        ?.data as PaginatedResponseType<CardTemplatesType>
  );
  const cardState = useSelector((state: RootState) => state.card);

  console.log('cardState.cardTemplate', cardState.cardTemplate);
  return (
    <div className="flex flex-col gap-2 px-2 py-2">
      {cardTemplates?.results.map((card, index) => {
        return (
          <div key={index}>
            {card.id && (
              <button
                onClick={() => dispatch(updateCardTemplate(card.id.toString()))}
                className={`m-0 h-full w-full rounded-lg p-1 ${cardState.cardTemplate === card.id.toString() ? 'ring-2 ring-blueTheme' : ''}`}
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
