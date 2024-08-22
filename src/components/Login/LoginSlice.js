import { createSlice } from "@reduxjs/toolkit";
import { bookApi } from "../../app/bookApi";

const loginApi = bookApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: JSON.stringify(credentials),
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

const storeToken = (state, { payload }) => {
  state.token = payload.token;
    window.sessionStorage.setItem("Token", payload.token);
  //   console.log(state);
  //   console.log(payload);
};

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    token: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(bookApi.endpoints.login.matchFulfilled, storeToken);
  },
});

export default loginSlice.reducer;

export const { useLoginMutation } = loginApi;
