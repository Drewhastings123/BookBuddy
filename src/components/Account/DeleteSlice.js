import { bookApi } from "../../app/bookApi";
import { createSlice } from "@reduxjs/toolkit";

const deleteApi = bookApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `reservations/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
const deleteRes = (state, { payload }) => {
  state.id = payload.id;
  state.bookid = payload.bookid;
  state.userid = payload.userid;
};

const deleteSlice = createSlice({
  name: "delete",
  initialState: {
    id: null,
    bookid: "",
    userid: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(bookApi.endpoints.deleteBook.matchFulfilled, deleteRes);
  },
});

export default deleteSlice.reducer;
export const { useDeleteBookMutation } = deleteApi;
