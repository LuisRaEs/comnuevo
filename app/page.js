"use client";
import { useSelector } from "react-redux";
import Image from "next/image";
import bg from "@/public/img/bgLogin.jpg";
import LoginContainer from "@/Components/LoginContainer/LoginContainer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Root() {
  const logged = useSelector((state) => state.sesion.logged);
  const router = useRouter();

  useEffect(() => {
    if (logged) router.replace("/community");
  }, [logged]);
  return (
    <div id="loginPage">
      <Image src={bg} alt="Imagen de fondo" fill={true} style={{ zIndex: 2 }} />
      <LoginContainer />
    </div>
  );
}
