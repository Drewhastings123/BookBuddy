import { createSlice } from "@reduxjs/toolkit";
import { bookApi } from "../../app/bookApi";

const registerApi = bookApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "users/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

const storeToken = (state, { payload }) => {
  state.token = payload.token;
  window.sessionStorage.setItem("Token", payload.token);
};

const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: {},
    token: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(bookApi.endpoints.register.matchFulfilled, storeToken);
  },
});

export default registerSlice.reducer;

export const { useRegisterMutation } = registerApi;
