'use client';

import MyCardsContentForm1 from '@/components/myCards/MyCardsContentForm1';
import MyCardsContentForm2 from '@/components/myCards/MyCardsContentForm2';
import MyCardsContentForm3 from '@/components/myCards/MyCardsContentForm3';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { useTimeoutDispatch } from '@/hooks/useTimeoutDispatch';
import cardsApi from '@/module/cards/cardsApi';
import { setErrors, updateContentForm } from '@/module/cards/cardSlice';

import {
  CardResponseType,
  CardTemplatesType,
  ContentFormSchema,
  ContentFormSchemaType,
} from '@/module/cards/cardsType';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect } from 'react';

const ContentsPage = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const cardState = useAppSelector((state: RootState) => state.card);
  const cardId = searchParams.get('cardId');
  const timeout = useTimeoutDispatch(0);

  const card = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCard-${cardId}`]
        ?.data as CardResponseType<CardTemplatesType>
  );

  useEffect(() => {
    if (cardId) {
      dispatch(cardsApi.endpoints.getCard.initiate(cardId));
    }
  }, [dispatch]);

  const fieldPlaceHolder = card?.cardTemplate.defaultCardFields;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedFormState = {
      [name]: value,
    };
    // timeout<ContentFormSchemaType>(updateContentForm, updatedFormState);
    dispatch(updateContentForm(updatedFormState));
    const result =
      ContentFormSchema.shape[name as keyof ContentFormSchemaType].safeParse(
        value
      );

    if (!result.success) {
      const error = result.error.format();
      dispatch(
        setErrors({
          formName: 'cardFields',
          error: { ...cardState.cardFields.errors, [name]: error._errors },
        })
      );
    } else {
      const newError = Object.fromEntries(
        Object.entries(cardState.cardFields.errors).filter(
          ([key]) => key !== name
        )
      );
      dispatch(
        setErrors({
          formName: 'cardFields',
          error: newError,
        })
      );
    }
  };

  return (
    <div className="h-full overflow-y-scroll lg:h-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mb-20 flex flex-col gap-4 lg:mb-24"
      >
        <MyCardsContentForm1
          handleChange={(e) => handleChange(e)}
          values={cardState.cardFields.values}
          errors={cardState.cardFields.errors}
          fieldPlaceHolder={fieldPlaceHolder}
        />
        <MyCardsContentForm2
          handleChange={handleChange}
          values={cardState.cardFields.values}
          errors={cardState.cardFields.errors}
          fieldPlaceHolder={fieldPlaceHolder}
        />
        <MyCardsContentForm3
          handleChange={handleChange}
          values={cardState.cardFields.values}
          errors={cardState.cardFields.errors}
        />
      </form>
    </div>
  );
};

export default ContentsPage;
