import { createSlice } from "@reduxjs/toolkit";
import { decodeJWT, User, Usuario } from "../../../../public/community";
import { getJWT } from "../../../../public/commons";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLoginUsuario = createAsyncThunk(
  "usuario/usuarioLogin",
  async (_, thunkAPI) => {
    try {
      const jwt = getJWT();
      const decoded = decodeJWT(jwt);
      const sabuesoUser = await User.buscar({
        qwery: `id = '${decoded.sabuesouserid}' `,
      });
      const data = await Usuario.buscar({
        qwery: `id = '${sabuesoUser.Value[0].CommunityUserID}'`,
      });
      return JSON.stringify(data.Value[0]);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const loginUsuarioSlice = createSlice({
  name: "loginUsuario",
  initialState: {
    usuarioInfo: {},
    loading: false,
    error: null,
  },
  reducers: {
    loginUserReset: (state) => {
      state.usuarioInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoginUsuario.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getLoginUsuario.fulfilled, (state, action) => {
      state.loading = false;
      state.usuarioInfo = JSON.parse(action.payload);
    });
    builder.addCase(getLoginUsuario.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const loginUsuario = loginUsuarioSlice.reducer;
