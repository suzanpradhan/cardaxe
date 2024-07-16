'use client';

import CardLayouts from '@/components/CardLayouts.server';
import { ScrollArea } from '@/components/ui/scroll-area';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { updateCardTemplate } from '@/module/cards/cardSlice';
import cardsApi from '@/module/cards/cardsApi';
import { CardTemplatesType } from '@/module/cards/cardsType';
import { useEffect } from 'react';

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
  const cardState = useAppSelector((state: RootState) => state.card);

  return (
    <ScrollArea className="">
      <div className="flex flex-col gap-3 p-2">
        {cardTemplates?.results.map((card, index) => {
          return (
            <>
              {card.id && (
                <div
                  onClick={() =>
                    dispatch(updateCardTemplate(card.id.toString()))
                  }
                  className={`overflow-hidden rounded-lg ring-offset-4 ${cardState.cardTemplate === card.id.toString() ? 'ring-2 ring-blueTheme/60' : ''}`}
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
                </div>
              )}
            </>
          );
        })}

        {/* {isSuccess && data && Parser(data[0].html_code)}
      {isLoading && 'Loading...'}
      {isError && error && 'Error...'} */}
      </div>
    </ScrollArea>
  );
};

export default LayoutPage;
