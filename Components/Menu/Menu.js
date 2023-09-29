import Link from "next/link"
import "./Menu.css"
export default function Menu(){
    return(
        <ul id="Menu">
                <li><Link href="#">Inicio</Link></li>
                <li><Link href="#">Noticias</Link></li>
                <li><Link href="#">Beneficios</Link></li>
                <li><Link href="#">Personas</Link></li>
                <li><Link href="community/ausencias">Ausencias</Link></li>
                <li><Link href="#">Encuestas</Link></li>
                <li><Link href="#">Reserva Salas</Link></li>
                <li><Link href="#">Documentos</Link></li>
                <li><Link href="community/checador">Reloj Checador</Link></li>
            </ul>
    )
}