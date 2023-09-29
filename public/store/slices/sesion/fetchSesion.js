import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setJWT } from "@/public/commons.js";
import { decodeJWT, User, Usuario } from "@/public/community";

const fetchSesion = createAsyncThunk("sesion/fetchSesion", async (user) => {
  let url = "http://18.190.84.148:9091/login";
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      user: user.id,
      pwd: user.pass,
    },
  };
  try {
    let { data } = await axios.post(url, {}, axiosConfig);
    if (data.status == "SUCCESS") {
      setJWT(data.Value);
      const decoded = decodeJWT(data.Value);
      const sabuesoUser = await User.buscar({
        qwery: `id = ${decoded.sabuesouserid} `,
      });
      const info = await Usuario.buscar({
        qwery: `id = ${sabuesoUser.Value[0].CommunityUserID}`,
      });
      console.log("el usuario principal es:", info.Value[0]);
      return JSON.stringify(info.Value[0]);
    }
  } catch (e) {
    console.log(e);
  }
});
export default fetchSesion;
