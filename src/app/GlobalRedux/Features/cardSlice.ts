'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StaticImageData } from 'next/image';
import logo from '../../../../public/logo.png';

export interface CardState {
  cardId: number;
  cardInfosId: number;
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

    isDefault: boolean;
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
    url: string[];
    displayText: string[];
  };
}

const initialState: CardState = {
  cardInfosId: 1234,
  cardId: 123456789,
  contentForm: {
    prefix: '',
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
    isDefault: true,
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
    url: ['www.some.com'],
    displayText: ['Displaytxt'],
  },
};

export const cardSlice = createSlice({
  name: 'cardReducer',
  initialState,
  reducers: {
    updateValues: (state, action: PayloadAction<object>) => {
      console.log('>sss>', action.payload);
      state.contentForm = { ...state.contentForm, ...action.payload };
      state.designForm = { ...state.designForm, ...action.payload };
    },
  },
});

export const { updateValues } = cardSlice.actions;

export default cardSlice.reducer;
