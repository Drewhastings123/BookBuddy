import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
    //   console.log(state);
      const token = state.register.token || state.login.token;
      const sessionToken = window.sessionStorage.getItem("Token");

      if (token || sessionToken) {
        headers.set("authorization", `Bearer ${token || sessionToken}`);
        // console.log("this is the token", token || sessionToken);
      } else {
        headers.set("Content-Type", "application/json");
        // console.warn("Token is null or not available. Use regular headers");
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "books",
      url: "books",
      method: "GET",
    }),
    getBookById: builder.query({
      query: (id) => `books/${id}`,
      //   method: "GET",
    }),
    providesTags: ["User"],
  }),
});
// export default bookApi;

export const { useGetBooksQuery, useGetBookByIdQuery } = bookApi;
