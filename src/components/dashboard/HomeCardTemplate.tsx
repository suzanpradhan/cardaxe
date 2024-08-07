'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { CardTemplatesType } from '@/module/cards/cardsType';
import { useEffect } from 'react';
import CardLayout from './CardLayout';

interface HomeCardTemplateProps {
  userId: number;
}

const HomeCardTemplate = ({ userId }: HomeCardTemplateProps) => {
  const dispatch = useAppDispatch();
  const defaultCard = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getDefaultCard-${userId}`]
        ?.data as CardTemplatesType
  );

  useEffect(() => {
    if (userId)
      dispatch(cardsApi.endpoints.getDefaultCard.initiate(userId.toString()));
  }, [dispatch]);

  return (
    // <CardTemplateHome
    //   firstName="Niwesh"
    //   lastName="Shrestha"
    //   designation="Managing Director"
    //   email="niw3shs@gmail.com"
    //   logo={rift_logo.src}
    //   phone="98xxxxxxxx"
    //   website="www.niweshshrestha.com.np"
    // />
    <CardLayout />
  );
};

export default HomeCardTemplate;
