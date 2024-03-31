import { createSlice } from "@reduxjs/toolkit";

export interface LoginProps {
  id: number;
  fullname: string;
  email: string;
  phonenumber: string;
  dateofbirth: string;
  gender: string;
  nationality: string;
  iat:number,
  expiry:number
}

const initialiseState: LoginProps = {
    id: 0,
    fullname: "",
    email: "",
    phonenumber: "",
    dateofbirth: "",
    gender: "",
    nationality: "",
    iat: 0,
    expiry: 0
};

const LoginuserInfo = createSlice({
  name: "LoginuserInfo",
  initialState: initialiseState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setFullname(state, action) {
      state.fullname = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPhonenumber(state, action) {
      state.phonenumber = action.payload;
    },
    setDateofBirth(state, action) {
      state.dateofbirth = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    setNationality(state, action) {
      state.nationality = action.payload;
    },
    setIssuedAt(state, action) {
      state.iat = action.payload;
    },
    setExpiry(state, action) {
      state.expiry = action.payload;
    },
  },
});

export const {setId, setFullname, setEmail, setPhonenumber,
     setDateofBirth, setGender, setNationality, setIssuedAt, setExpiry} = LoginuserInfo.actions;
export default LoginuserInfo.reducer;