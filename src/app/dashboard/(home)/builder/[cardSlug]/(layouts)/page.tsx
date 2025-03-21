'use client';

import CardLayouts from '@/components/CardLayouts';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import cardsApi from '@/module/cards/cardsApi';
import { updateCardTemplate } from '@/module/cards/cardSlice';
import { CardTemplatesType } from '@/module/cards/cardsType';
import { useCallback, useEffect, useRef, useState } from 'react';

const LayoutPage = () => {
  const dispatch = useAppDispatch();
  const cardState = useAppSelector((state: RootState) => state.card);

  const [isCategoryView, toggleCategoryView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollableDivRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [hasMoreData, setHasMoreData] = useState(true);

  const handleScroll = useCallback(async () => {
    const scrollableDiv = scrollableDivRef.current;

    if (
      scrollableDiv.scrollTop + scrollableDiv.clientHeight >=
        scrollableDiv.scrollHeight - 50 &&
      !isLoading &&
      hasMoreData
    ) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async (currentPage: number) => {
      const response = await Promise.resolve(
        dispatch(cardsApi.endpoints.getCardsTemplates.initiate(currentPage))
      );
      if (response.data) {
        if (
          response.data!.pagination.currentPage >=
          response.data!.pagination.totalPage
        ) {
          setHasMoreData(false);
        }
      }
    };

    if (hasMoreData) {
      fetchData(currentPage);
    }
    setIsLoading(false);
  }, [dispatch, currentPage]);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    scrollableDiv?.addEventListener('scroll', handleScroll);
    return () => {
      scrollableDiv?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const cardTemplates = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries.getCardsTemplates
        ?.data as PaginatedResponseType<CardTemplatesType>
  );

  return (
    <div>
      {/* <div className="mb-2 flex h-8 items-stretch overflow-hidden rounded-lg bg-slate-200 text-sm font-semibold text-zinc-900">
        <div className="flex flex-1 grow items-center justify-center rounded-lg bg-zinc-900 text-zinc-50">
          All
        </div>
        <div className="flex flex-1 grow items-center justify-center rounded-lg">
          Categories
        </div>
      </div> */}
      <div
        className="h-[calc(100vh-16rem)] overflow-y-scroll lg:h-[calc(100vh-5rem)]"
        ref={scrollableDivRef}
        onScroll={handleScroll}
      >
        <div className="mb-4 flex flex-col gap-3 p-1">
          {cardTemplates?.results.map((card, index) => {
            return (
              <div key={index}>
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
                        logoUrl: card.defaultCardDesign.logo ?? '',
                        backgroundUrl: card.defaultCardDesign.backgroundImage
                          ? `${apiPaths.serverUrl}${card.defaultCardDesign.backgroundImage}`
                          : '',
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
