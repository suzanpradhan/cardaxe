'use client';

import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import { useEffect } from 'react';
import CardLayouts from '../CardLayouts.server';

interface HomeCardTemplateProps {
  userName: string;
}

const HomeCardTemplate = ({ userName }: HomeCardTemplateProps) => {
  const dispatch = useAppDispatch();
  const defaultCard = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getDefaultCard-${userName}`]
        ?.data as CardResponseType<CardTemplatesType>
  );

  useEffect(() => {
    if (userName)
      dispatch(cardsApi.endpoints.getDefaultCard.initiate(userName.toString()));
  }, [dispatch, userName]);

  const variableValues = {
    ...defaultCard?.cardFields,
    ...defaultCard?.cardDesign,
    logoUrl: `${apiPaths.serverUrl}${defaultCard?.cardDesign.logo}`,
    backgroundUrl: `${apiPaths.serverUrl}${defaultCard?.cardDesign.backgroundImage}`,
  };
  if (defaultCard?.cardTemplate.htmlCode)
    return (
      <CardLayouts
        htmlSource={defaultCard.cardTemplate.htmlCode}
        variableValues={variableValues}
      />
    );
};

export default HomeCardTemplate;
