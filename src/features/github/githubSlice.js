import { createSlice } from "@reduxjs/toolkit";

let initialState = [
  {
    title: "",
    link: "",
    pubDate: "",
    author: "",
    content: "",
    contentSnippet: "",
    id: "",
    isoDate: "",
  },
  {
    title: "",
    link: "",
    pubDate: "",
    author: "",
    content: "",
    contentSnippet: "",
    id: "",
    isoDate: "",
  },
  {
    title: "",
    link: "",
    pubDate: "",
    author: "",
    content: "",
    contentSnippet: "",
    id: "",
    isoDate: "",
  },
  {
    title: "",
    link: "",
    pubDate: "",
    author: "",
    content: "",
    contentSnippet: "",
    id: "",
    isoDate: "",
  },
  {
    title: "",
    link: "",
    pubDate: "",
    author: "",
    content: "",
    contentSnippet: "",
    id: "",
    isoDate: "",
  },
  {
    title: "",
    link: "",
    pubDate: "",
    author: "",
    content: "",
    contentSnippet: "",
    id: "",
    isoDate: "",
  },
  {
    title: "",
    link: "",
    pubDate: "",
    author: "",
    content: "",
    contentSnippet: "",
    id: "",
    isoDate: "",
  },
  {
    title: "",
    link: "",
    pubDate: "",
    author: "",
    content: "",
    contentSnippet: "",
    id: "",
    isoDate: "",
  },
  {
    title: "",
    link: "",
    pubDate: "",
    author: "",
    content: "",
    contentSnippet: "",
    id: "",
    isoDate: "",
  },
  {
    title: "",
    link: "",
    pubDate: "",
    author: "",
    content: "",
    contentSnippet: "",
    id: "",
    isoDate: "",
  },
];

export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    fetchAuthors: (state, action) => ({
      ...state,
    }),
    fetchAuthorsSuccess: (state, action) => {
      return {
        ...state,
      };
    },
    fetchAuthorsError: (state, action) => ({
      ...state,
    }),
  },
});

export const { fetchAuthors, fetchAuthorsSuccess, fetchAuthorsError } =
  authorsSlice.actions;

export default authorsSlice.reducer;
