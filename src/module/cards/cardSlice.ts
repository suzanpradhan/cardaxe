'use client';

import { CardState, ContentFormSchema, ContentFormSchemaType, DesignFormSchema, DesignFromSchemaType } from '@/module/cards/cardsType';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ZodSchema } from 'zod';

interface ErrorActionType {
  formName: 'cardFields' | 'cardDesign';
  error: { [key: string]: Array<string> };
}

interface ValidateFieldActionType {
  formName: 'cardFields' | 'cardDesign';
  fieldName: string;
  schema: ZodSchema;
  value: string;
  // error: { [key: string]: Array<string> };
}


const initialState: CardState<string> = {

  cardFields: {
    values: {
      prefix: '',
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      bio: '',
      designation: '',
      department: '',
      company: '',
      website: '',
      phone: '',
      email: '',
    },
    errors: {}
  },
  cardDesign: {
    values: {
      backgroundColor: '#f23f37',
      backgroundImage: undefined,
      logoUrl: '',
      showSocialIcons: false,
      showLogo: false,
      darkMode: false,
    }, errors: {}
  },
  cardTemplate: "1"

};

export const cardSlice = createSlice({
  name: 'cardReducer',
  initialState,
  reducers: {
    updateContentForm: (
      state,
      action: PayloadAction<CardState<string>['cardFields']['values']>
    ) => {
      state.cardFields.values = { ...action.payload };
    },
    updateDesignForm: (
      state,
      action: PayloadAction<CardState<string>['cardDesign']['values']>
    ) => {
      state.cardDesign.values = { ...action.payload };
    },
    updateDefaultCard: (
      state, action: PayloadAction<boolean>
    ) => {
      state.isDefault = action.payload
    },
    updateCardTemplate: (
      state, action: PayloadAction<string>
    ) => {
      state = { ...state, cardTemplate: action.payload }
    },
    setErrors: (state, action: PayloadAction<ErrorActionType>) => {
      const { error, formName } = action.payload;
      state[formName].errors = { ...error }
    },
    validateForms: (state, action: PayloadAction<ErrorActionType['formName']>) => {
      const formName = action.payload;
      let formSchema;
      switch (formName) {
        case 'cardFields':
          formSchema = ContentFormSchema;
          break;
        case 'cardDesign':
          formSchema = DesignFormSchema;
          break;
      }
      if (!formSchema) return;

      const formValues = state[formName].values;


      const parseResult = formSchema.safeParse(formValues);

      if (!parseResult.success) {
        const errorObject = parseResult.error.format();
        state[formName].errors = Object.keys(errorObject).reduce((acc: { [key: string]: Array<string> }, key: string) => {
          acc[key] = errorObject[key as keyof ContentFormSchemaType & keyof DesignFromSchemaType]?._errors || [''];
          return acc;
        }, {})
      } else {
        state[formName].errors = {};
      }

    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher()
  // },
});



export const {
  updateContentForm,
  updateDesignForm,
  updateDefaultCard,
  updateCardTemplate,
  setErrors,
  validateForms,
  // validateField
  // updateInfosForm,
} = cardSlice.actions;

export default cardSlice.reducer;
