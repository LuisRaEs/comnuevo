import "./LoginLogo.css"
import Image from "next/image"
import icon from "@/public/img/logoSabuesoCommunity.png"

export default function LoginLogo({width,heigth}) {
  return (
    <div id="loginLogo">
        <Image src={icon} width={width ?? 187} height={heigth ?? 52} alt="Logo icon"/>
    </div>
  )
}
