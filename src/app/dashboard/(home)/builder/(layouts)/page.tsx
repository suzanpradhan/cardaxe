'use client';

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
    dispatch(cardsApi.endpoints.getCards.initiate());
  }, [dispatch]);

  const cardsList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getCards-get-cards-endpoint']
        ?.data as CardTemplatesType[]
  );
  console.log(cardsList);
  // const { isLoading, isError, isSuccess, data, error } = useGetCardsQuery('');

  return (
    <div>
      {cardsList?.map((card, index) => (
        <div key={index}>
          <div dangerouslySetInnerHTML={{ __html: card.html_code }}></div>
          {/* {JSON.stringify(card)} */}
        </div>
      ))}
      {/* {isSuccess && data && Parser(data[0].html_code)}
      {isLoading && 'Loading...'}
      {isError && error && 'Error...'} */}
    </div>
  );
};

export default LayoutPage;
