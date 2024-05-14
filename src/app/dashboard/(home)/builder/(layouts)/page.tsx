'use client';

import CardLayouts from '@/components/CardLayouts';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { CardTemplatesType } from '@/module/cards/cardsType';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

// import { useGetCardsQuery } from '@/core/redux/api';

const LayoutPage = () => {
  const dispatch = useAppDispatch();
  const session = useSession();

  useEffect(() => {
    dispatch(cardsApi.endpoints.getCardsTemplate.initiate());
  }, [dispatch]);

  const cardsList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getCardsTemplate-get-cards-endpoint']
        ?.data as CardTemplatesType[]
  );

  console.log(cardsList);

  return (
    <div>
      {cardsList?.map((card, index) => (
        // <div key={index}>
        //   <div dangerouslySetInnerHTML={{ __html: card.html_code }}></div>
        //   {/* {JSON.stringify(card)} */}
        // </div>
        <div key={index}>
          <CardLayouts
            htmlSource={card.htmlCode}
            variableValues={card.defaultCardFields}
          />
        </div>
      ))}
      {/* {isSuccess && data && Parser(data[0].html_code)}
      {isLoading && 'Loading...'}
      {isError && error && 'Error...'} */}
    </div>
  );
};

export default LayoutPage;
