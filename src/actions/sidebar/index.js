import { createAction } from '@reduxjs/toolkit';

export const fetchSidebarNews = createAction('FETCH_SIDEBAR_REQUEST');
export const fetchSidebarNewsSuccess = createAction('FETCH_SIDEBAR_SUCCESS');
export const fetchSidebarNewsError = createAction('FETCH_SIDEBAR_ERROR');
