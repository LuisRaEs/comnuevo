import { createSlice } from "@reduxjs/toolkit";
import fetchSesion from "./fetchSesion";

const sesionSlice = createSlice({
  name: "sesion",
  initialState: {
    username: "",
    idSesion: null,
    accessLevel: "",
    lang: "es",
    logged: false,
    loading: false,
    info: {},
    errors: [],
  },
  reducers: {
    changeLang: (state, action) => {
      return { ...state, lang: action.payload };
    },
    addError: (state, action) => {
      if (!state.errors.includes(action.payload))
        return { ...state, errors: [...state.errors, action.payload] };
      else return { ...state };
    },
    removeError: (state, action) => {
      let newErrors = state.errors.filter((error) => error != action.payload);
      return { ...state, errors: newErrors };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSesion.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchSesion.fulfilled, (state, action) => {
      if (action.payload!= null) {
        let info = JSON.parse(action.payload)
        return { ...state, loading: false, logged: true, info};
      } else {
        return { ...state, loading: false, logged: false };
      }
    });
    builder.addCase(fetchSesion.rejected, (state) => {
      return { ...state, logged: false };
    });
  },
});

export const { changeLang, addError, removeError } = sesionSlice.actions;
export const sesion = sesionSlice.reducer;




