'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type InfosFormStateType = {
  url: string;
  displayText: string;
};

export type CardState = {
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
    instagram: InfosFormStateType;
    facebook: InfosFormStateType;
    linkedIn: InfosFormStateType;
    twitter: InfosFormStateType;
  };

  otherForms: {
    isDefault: boolean;
  };
};

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
    instagram: {
      url: 'www.instagram.com',
      displayText: 'Adam Sandler',
    },
    facebook: {
      url: 'www.facebook.com',
      displayText: 'Adam Sandler',
    },
    linkedIn: {
      url: 'www.linkdedin.com',
      displayText: 'Adam Sandler',
    },
    twitter: {
      url: 'www.twitter.com',
      displayText: 'Adam Sandler',
    },
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
  },
  // extraReducers: (builder) => {},
});

export const { updateContentForm, updateDesignForm, updateInfosForm } =
  cardSlice.actions;

export default cardSlice.reducer;
