import { createAction } from '@reduxjs/toolkit';

export const fetchNews = createAction('FETCH_COMPENDIUM_REQUEST');
export const fetchNewsSuccess = createAction('FETCH_COMPENDIUM_SUCCESS');
export const fetchNewsError = createAction('FETCH_COMPENDIUM_ERROR');
