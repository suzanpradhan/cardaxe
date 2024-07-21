'use client';

import MyCardsDesignForm from '@/components/myCards/MyCardsDesignForm';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { useTimeoutDispatch } from '@/hooks/useTimeoutDispatch';
import { setErrors, updateDesignForm } from '@/module/cards/cardSlice';
import {
  CardState,
  DesignFormSchema,
  DesignFromSchemaType,
} from '@/module/cards/cardsType';
import React, { ChangeEvent } from 'react';

const Designpage = () => {
  const cardState = useAppSelector((state: RootState) => state.card);
  const dispatch = useAppDispatch();
  const timeout = useTimeoutDispatch(0);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    const filesToCache = files?.[0];

    if (filesToCache) {
      caches.open('filesCache').then(function (cache) {
        cache.put(name, new Response(filesToCache));
      });
    }

    const stateValue =
      type === 'file' && files ? window.URL.createObjectURL(files[0]) : value;
    const updatedFormState: CardState<string>['cardDesign']['values'] = {
      [name]: stateValue,
    };
    // timeout<DesignFromSchemaType>(updateDesignForm, updatedFormState);
    dispatch(updateDesignForm(updatedFormState));
    const result =
      DesignFormSchema.shape[name as keyof DesignFromSchemaType].safeParse(
        value
      );

    if (!result.success) {
      const error = result.error.format();
      console.log(error);
      dispatch(
        setErrors({
          formName: 'cardDesign',
          error: { ...cardState.cardDesign.errors, [name]: error._errors },
        })
      );
    } else {
      const newError = Object.fromEntries(
        Object.entries(cardState.cardDesign.errors).filter(
          ([key]) => key !== name
        )
      );
      dispatch(
        setErrors({
          formName: 'cardDesign',
          error: newError,
        })
      );
    }
  };

  return (
    <div className="h-[calc(100vh-17rem)] overflow-y-scroll lg:h-[calc(100vh-6rem)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-4"
      >
        <MyCardsDesignForm
          errors={cardState.cardDesign.errors}
          handleChange={handleChange}
          values={cardState.cardDesign.values}
        />
        {/* <MyCardsDesignSwitch
        errors={cardState.cardDesign.errors}
        handleChange={handleChange}
        values={cardState.cardDesign.values}
      /> */}
        {/* <FormWrapper>
        <div className="flex flex-col gap-4">
          <InputComp
            zSchemaName="is_default"
            inputCompType="switch"
            inputLabel="Make default"
            inputType="checkbox"
            handleChange={(e) => handleIsDefaultChange(e as boolean)}
            inputValue={cardState.isDefault ?? false}
          />
        </div>
      </FormWrapper> */}
      </form>
    </div>
  );
};
export default Designpage;
