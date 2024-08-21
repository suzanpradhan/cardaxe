'use client';

import { CardBasicsSchema, CardBasicsType, CardState, ContentFormSchema, ContentFormSchemaType, DesignFormUpdateSchema, DesignFromSchemaType, InfosFormsUpdateSchema } from '@/module/cards/cardsType';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ZodSchema } from 'zod';

interface ErrorActionType {
  formName: 'cardFields' | 'cardDesign' | 'cardInfos' | 'cardBasics';
  error: { [key: string]: any };
}

interface ValidateFieldActionType {
  formName: 'cardFields' | 'cardDesign';
  fieldName: string;
  schema: ZodSchema;
  value: string;
  // error: { [key: string]: Array<string> };
}


export const initialState: CardState<string> = {
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
  cardBasics: {
    values: {
      title: ''
    },
    errors: {}
  },
  cardDesign: {
    values: {
      backgroundColor: '#f2f2f2',
      backgroundImage: undefined,
      logo: undefined,
      showSocialIcons: false,
      showLogo: false,
      darkMode: false,
    }, errors: {}
  },
  cardInfos:
    { values: {}, errors: {} }
  ,
  cardTemplate: "2"

};

export const cardSlice = createSlice({
  name: 'cardReducer',
  initialState,
  reducers: {
    updateContentForm: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.cardFields.values = { ...state.cardFields.values, ...action.payload };
    },
    updateDesignForm: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.cardDesign.values = { ...state.cardDesign.values, ...action.payload };
    },
    updateInfosForm: (
      state,
      action: PayloadAction<CardState<string>["cardInfos"]['values']>
    ) => {
      state.cardInfos.values = { ...action.payload };
    },
    updateCardBasics: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.cardBasics.values = { ...state.cardBasics.values, ...action.payload };
    },

    updateDefaultCard: (
      state, action: PayloadAction<boolean>
    ) => {
      state.isDefault = action.payload
    },
    updateCardTemplate: (
      state, action: PayloadAction<string>
    ) => {
      state.cardTemplate = action.payload
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
          formSchema = DesignFormUpdateSchema;
          break;
        case 'cardInfos':
          formSchema = InfosFormsUpdateSchema;
          break;

        case 'cardBasics':
          formSchema = CardBasicsSchema
          break;
      }
      if (!formSchema) return;

      const formValues = state[formName].values;
      const parseResult = formSchema.safeParse(formValues);



      if (!parseResult.success) {
        const errorObject = parseResult.error.format();


        state[formName].errors = Object.keys(errorObject).reduce((acc: { [key: string]: Array<string> }, key: string) => {
          if (key !== '_errors') { acc[key] = (errorObject[key as keyof ContentFormSchemaType & keyof DesignFromSchemaType & keyof CardBasicsType] as any)?._errors || []; }
          return acc;
        }, {})
      } else {
        state[formName].errors = {};
      }

      console.log("errorObject", state.cardBasics.errors)


    },
  },
});



export const {
  updateContentForm,
  updateDesignForm,
  updateDefaultCard,
  updateCardTemplate,
  setErrors,
  validateForms,
  updateCardBasics,
  updateInfosForm,
} = cardSlice.actions;

export default cardSlice.reducer;
