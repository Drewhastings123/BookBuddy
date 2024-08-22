import { createSlice } from "@reduxjs/toolkit";
import { bookApi } from "../../app/bookApi";

const reserveApi = bookApi.injectEndpoints({
  endpoints: (builder) => ({
    reserve: builder.mutation({
      query: ({ id, available }) => ({
        url: `books/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ available: available }),
      }),
      invalidatesTags: ["User"],
      // invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

const reserveBook = (state, { payload }) => {
  state.book = payload;
};

const reserveSlice = createSlice({
  name: "reserve",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(bookApi.endpoints.reserve.matchFulfilled, reserveBook);
  },
});

export default reserveSlice.reducer;
export const { useReserveMutation } = reserveApi;
