'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Team } from '../teams/teamTypes';
import { DesignType, TeamTemplateState } from './teamTemplateTypes';

interface ErrorActionType {
    formName: 'cardFields' | 'cardDesign' | 'cardInfos' | 'cardBasics';
    error: { [key: string]: any };
}

export const initialState: TeamTemplateState<string> = {
    design: {
        backgroundColor: '#f2f2f2',
        showLogo: false,

    },
    otherValues: {
        template: "2",
        title: ''
    }
};

export const teamTemplateSlice = createSlice({
    name: 'teamTemplateReducer',
    initialState,
    reducers: {
        updateDesignForm: (
            state,
            action: PayloadAction<DesignType>
        ) => {
            state.design = { ...state.design, ...action.payload };
        },
        updateTitle: (
            state,
            action: PayloadAction<string>
        ) => {
            state.otherValues = { ...state.otherValues, title: action.payload };
        },
        updateTemplate: (
            state,
            action: PayloadAction<string>
        ) => {
            state.otherValues = { ...state.otherValues, template: action.payload };
        },
        updateTeamDetails: (
            state,
            action: PayloadAction<Team>
        ) => {
            state = { ...state, details: action.payload };
        },

    },
});



export const {
    updateDesignForm, updateTitle, updateTemplate, updateTeamDetails
} = teamTemplateSlice.actions;

export default teamTemplateSlice.reducer;
