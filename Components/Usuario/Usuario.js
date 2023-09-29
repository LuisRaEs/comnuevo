import Image from "next/image"
import "./Usuario.css"
import Link from "next/link"
import img from "@/public/img/profile.jpg"
export default function Usuario(){
    return(
        <div id="Usuario">
            <Image src={img} width={150} height={150} alt="profile image"/>
            <p id="nombreCompleto">Ricardo Ruiz</p>
            <p id="cargo">Director de Tecnologias de la Información</p>
            <p>7 Dias de vacaciones sin solicitar</p>
            <Link href="#">Solicitar Vacaciones</Link>
        </div>
    )
}