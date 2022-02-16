import { createAction } from '@reduxjs/toolkit';

export const fetchNews = createAction('FETCH_NEWS_REQUEST');
export const fetchNewsSuccess = createAction('FETCH_NEWS_SUCCESS');
export const fetchNewsError = createAction('FETCH_NEWS_ERROR');
