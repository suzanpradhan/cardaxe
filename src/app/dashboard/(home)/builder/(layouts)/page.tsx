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
    <div>
      <div className="mb-2 flex h-10 items-stretch overflow-hidden rounded-lg bg-slate-200 text-sm font-bold text-zinc-900">
        <div className="flex flex-1 grow items-center justify-center bg-zinc-900 text-zinc-50">
          All
        </div>
        <div className="flex flex-1 grow items-center justify-center">
          Categories
        </div>
      </div>
      <div className="h-[calc(100vh-20rem)] overflow-y-scroll lg:h-[calc(100vh-9rem)]">
        <div className="flex flex-col gap-3 p-1">
          {cardTemplates?.results.map((card) => {
            return (
              <>
                {card.id && (
                  <div
                    onClick={() =>
                      dispatch(updateCardTemplate(card.id.toString()))
                    }
                    className={`overflow-hidden rounded-lg ring-offset-2 ${cardState.cardTemplate === card.id.toString() ? 'ring-2 ring-blueTheme/60' : ''}`}
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
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
