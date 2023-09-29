'use client'
import "./NavBar.css"
import { useEffect , useState } from "react"
import { useSelector } from "react-redux"
import LoginLogo from "../LoginLogo/LoginLogo"
import es from "@/public/diccionarios/es"
import en from "@/public/diccionarios/en"
import Link from "next/link"

export default function NavBar() {
    const lang = useSelector(state=>state.sesion.lang)
    const [t,setT] = useState(es)
    const [expand, setExpand] = useState(false)

    useEffect(()=>{
        lang === "es" ? setT(()=>es) :setT(()=>en)
    },[lang])
    return (
        <div id="NBar" onMouseLeave={()=>{setExpand(()=>false)}}>
            <div id="ExpandMenu" onClick={()=>{setExpand(state=>!state)}}>
                <i className={expand ?  "bi bi-arrow-bar-left" : "bi bi-arrow-bar-right"}></i>
            </div>
            <div className="nbbutton">
                <Link href="/community/configuraciones/empleados">
                    <i className="bi bi-gear"></i> { expand ? <span className = "nbbtext">{t["navbar_config"]}</span> : ""} 
                </Link>
            </div>
            <div className="nbbutton">
                <Link href="#">
                    <i className="bi bi-bell"></i> { expand ? <span className = "nbbtext">{t["navbar_notifications"]}</span> : ""}
                </Link>
            </div>
            <div className="nbbutton">
                <Link href="/community">
                    <i className="bi bi-house-door"></i> { expand ? <span className = "nbbtext">{t["navbar_home"]}</span> : ""}
                </Link>
            </div>
            <div className="nbbutton">
                <Link href="#">
                    <i className="bi bi-newspaper"></i> { expand ? <span className = "nbbtext">{t["navbar_news"]}</span> : ""}
                </Link>
            </div>
            <div className="nbbutton">
                <Link href="#">
                    <i className="bi bi-bookmark-star"></i> { expand ? <span className = "nbbtext">{t["navbar_benefits"]}</span> : ""}
                </Link>
            </div>
            <div className="nbbutton">
                <Link href="#">
                    <i className="bi bi-people"></i> { expand ? <span className = "nbbtext">{t["navbar_people"]}</span> : ""}
                </Link>
            </div>
            <div className="nbbutton">
                <Link href="/community/misausencias">
                    <i className="bi bi-calendar2-week"></i> { expand ? <span className = "nbbtext">{t["navbar_absences"]}</span> : ""}
                </Link>
            </div>
            <div className="nbbutton">
                <Link href="#">
                    <i className="bi bi-card-list"></i> { expand ? <span className = "nbbtext">{t["navbar_surveys"]}</span> : ""}
                </Link>
            </div>
            <div className="nbbutton">
                <Link href="#">
                    <i className="bi bi-journal-plus"></i> { expand ? <span className = "nbbtext">{t["navbar_showroom"]}</span> : ""}
                </Link>
            </div>
            <div className="nbbutton">
                <Link href="/community/checador">
                    <i className="bi bi-stopwatch"></i> { expand ? <span className = "nbbtext">{t["navbar_checkin"]}</span> : ""}
                </Link>
            </div>
            {expand ? <div id="nbLogo"><LoginLogo heigth={40} width={140}/></div>: ""}
        </div>
    )
}
