import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./bookApi";
import registerReducer from "../components/Register/RegisterSlice";
import loginReducer from "../components/Login/LoginSlice";
import accountReducer from "../components/Account/AccountSlice";
import reserveReducer from "../components/Singlebook/ReserveSlice";
import reservationsReducer from "../components/Account/ReservationsSlice";
import deleteReducer from "../components/Account/DeleteSlice";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    register: registerReducer,
    login: loginReducer,
    account: accountReducer,
    reserve: reserveReducer,
    reservations: reservationsReducer,
    delete: deleteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});
export default store;
