import { createSlice } from "@reduxjs/toolkit";
import { bookApi } from "../../app/bookApi";

const reservationsApi = bookApi.injectEndpoints({
  endpoints: (builder) => ({
    getReservations: builder.query({
      query: () => ({
        url: "reservations",
        method: "GET",
        headers: {
          "Content-Type": "application.json",
        },
      }),
      providesTags: ["User"],
    }),
  }),
});

const storeRes = (state, { payload }) => {
  state.data = payload.reservation;
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      bookApi.endpoints.getReservations.matchFulfilled,
      storeRes
      //   (state, { payload }) => {
      //     return JSON.parse(payload);
      //   }
    );
  },
});

export default reservationsSlice.reducer;
export const { useGetReservationsQuery } = reservationsApi;
