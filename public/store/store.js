//funcion que configura el store
import { configureStore } from "@reduxjs/toolkit";
import { sesion } from "./slices/sesion/sesion";
import { posts } from "./slices/posts/posts";
import { loginUsuario } from "./slices/loginUsuario/loginUsuario";

export default configureStore({
  reducer: { sesion, posts, loginUsuario },
});
