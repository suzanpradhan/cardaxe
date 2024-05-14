'use client';

import { CardState } from '@/module/cards/cardsType';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';



const initialState: CardState = {
  card: {
    cardFields: {
      prefix: 'god',
      firstName: 'Avishek',
      middleName: 'Ram',
      lastName: 'Sandler',
      suffix: 'xxx',
      bio: 'Cool headded calm nice guy',
      designation: 'COO',
      department: 'Some Depart',
      company: 'Some Company',
      website: 'info@somecomp.com',
      phone: '9987456321',
      email: 'some@email.com',
    },
    cardDesign: {
      backgroundColor: '#f23f37',
      backgroundImage: undefined,
      logoUrl: '',
      showSocialIcons: false,
      showLogo: false,
      darkMode: false,

    },
    cardTemplate: "0"
  },
};

export const cardSlice = createSlice({
  name: 'cardReducer',
  initialState,
  reducers: {
    updateContentForm: (
      state,
      action: PayloadAction<CardState['card']['cardFields']>
    ) => {
      state.card.cardFields = { ...action.payload };
    },
    updateDesignForm: (
      state,
      action: PayloadAction<CardState['card']['cardDesign']>
    ) => {
      state.card.cardDesign = { ...action.payload };
    },
    // updateInfosForm: (state, action: PayloadAction<CardState['infosForm']>) => {
    //   state.infosForm = { ...action.payload };
    // },
    updateErrors: (state, action: PayloadAction<CardState['errors']>) => {
      state.errors = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher()
  // },
});

export const {
  updateContentForm,
  updateDesignForm,
  // updateInfosForm,
  updateErrors,
} = cardSlice.actions;

export default cardSlice.reducer;
