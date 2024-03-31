import { configureStore } from "@reduxjs/toolkit";
import LoginuserInfo from "../Redux-store/loginInfo";

const store = configureStore({
  reducer: {
    loginInfo: LoginuserInfo,
  },
});

export default store;