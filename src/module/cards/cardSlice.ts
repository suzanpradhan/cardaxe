'use client';

import { CardState } from '@/module/cards/cardsType';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';



const initialState: CardState<string> = {
  card: {
    cardFields: {
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
    cardDesign: {
      backgroundColor: '#f23f37',
      backgroundImage: undefined,
      logoUrl: '',
      showSocialIcons: false,
      showLogo: false,
      darkMode: false,

    },
    cardTemplate: "1"
  },
};

export const cardSlice = createSlice({
  name: 'cardReducer',
  initialState,
  reducers: {
    updateContentForm: (
      state,
      action: PayloadAction<CardState<string>['card']['cardFields']>
    ) => {
      state.card.cardFields = { ...action.payload };
    },
    updateDesignForm: (
      state,
      action: PayloadAction<CardState<string>['card']['cardDesign']>
    ) => {
      state.card.cardDesign = { ...action.payload };
    },
    updatePublishCard: (
      state, action: PayloadAction<boolean>
    ) => {
      state.card = { ...state.card, isDefault: action.payload }
    },
    updateCardTemplate: (
      state, action: PayloadAction<string>
    ) => {
      state.card = { ...state.card, cardTemplate: action.payload }
    },
    // updateInfosForm: (state, action: PayloadAction<CardState['infosForm']>) => {
    //   state.infosForm = { ...action.payload };
    // },
    updateErrors: (state, action: PayloadAction<CardState<string>['errors']>) => {
      state.errors = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher()
  // },
});

cardSlice.actions.updateContentForm.type

export const {
  updateContentForm,
  updateDesignForm,
  updatePublishCard,
  updateCardTemplate,
  // updateInfosForm,
  updateErrors,
} = cardSlice.actions;

export default cardSlice.reducer;
