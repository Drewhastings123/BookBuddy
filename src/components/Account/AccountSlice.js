import { createSlice } from "@reduxjs/toolkit";
import { bookApi } from "../../app/bookApi";

const accountApi = bookApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
        headers: {
          "Content-Type": "application.json",
        },
      }),
      providesTags: ["User"],
    }),
  }),
});

const storeUser = (state, { payload }) => {
  state.id = payload.id;
  state.firstname = payload.firstname;
  state.lastname = payload.lastname;
  state.email = payload.email;
  state.books = payload.books;
};

const accountSlice = createSlice({
  name: "account",
  initialState: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      bookApi.endpoints.getAccount.matchFulfilled,
      storeUser
      //   (state, { payload }) => {
      //     return JSON.parse(payload);
      //   }
    );
  },
});

export default accountSlice.reducer;

export const { useGetAccountQuery } = accountApi;
