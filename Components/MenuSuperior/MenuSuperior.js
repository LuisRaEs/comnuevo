import Link from "next/link"
import "./MenuSuperior.css"

export default function MenuSuperior(){
    return(
        <ul id="MenuSuperior">
            <li><Link href="#"><i className="bi bi-bell"></i></Link></li>
            <li><Link href="#"><i className="bi bi-calendar-week"></i></Link></li>
            <li><Link href="#"><i className="bi bi-person-circle"></i></Link></li>
        </ul>
    )
}