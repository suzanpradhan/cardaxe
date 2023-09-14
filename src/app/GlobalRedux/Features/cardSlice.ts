'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CardState {
  contentForm: {
    prefix: string;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    bio: string;

    designation: string;
    department: string;
    company: string;

    phone: string;
    website: string;
    email: string;
  };

  designForm: {
    backgroundColor: string;
    backgroundImage: string | null;
    logoUrl: string | null;

    showSocialIcons: boolean;
    showLogo: boolean;
    darkMode: boolean;
  };

  infosForm: {
    cardId: number;
    cardInfosId: number;
    url: string[];
    displayText: string[];
  };

  otherForms: {
    isDefault: boolean;
  };
}

const initialState: CardState = {
  contentForm: {
    prefix: 'god',
    firstName: 'Adam',
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
  designForm: {
    backgroundColor: '#f23f37',
    backgroundImage: null,
    logoUrl: null,
    showSocialIcons: false,
    showLogo: false,
    darkMode: false,
  },
  infosForm: {
    cardInfosId: 1234,
    cardId: 123456789,
    url: ['www.some.com'],
    displayText: ['Displaytxt'],
  },
  
  otherForms: {
    isDefault: true,
  },
};

export const cardSlice = createSlice({
  name: 'cardReducer',
  initialState,
  reducers: {
    updateContentForm: (
      state,
      action: PayloadAction<CardState['contentForm']>
    ) => {
      state.contentForm = { ...action.payload };
    },
    updateDesignForm: (
      state,
      action: PayloadAction<CardState['designForm']>
    ) => {
      state.designForm = { ...action.payload };
    },
    updateInfosForm: (state, action: PayloadAction<CardState['infosForm']>) => {
      state.infosForm = { ...action.payload };
    },
    // updateValues: (state, action: PayloadAction<UpdatedStateObjectType>) => {
    //   const { payloadObject, payloadName } = action.payload;
    //   if (payloadName === 'contentForm') {
    //     state.contentForm = { ...state.contentForm, ...payloadObject };
    //   } else if (payloadName === 'designForm') {
    //     state.designForm = { ...state.designForm, ...payloadObject };
    //   } else if (payloadName === 'infosForm') {
    //     state.infosForm = { ...state.infosForm, ...payloadObject };
    //   }
    // },
  },
});

export const { updateContentForm, updateDesignForm, updateInfosForm } =
  cardSlice.actions;

export default cardSlice.reducer;
