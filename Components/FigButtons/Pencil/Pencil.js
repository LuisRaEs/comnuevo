import "./Pencil.css"
import { useState, useEffect} from "react"

export default function Pencil({handleClick}) {
    return (
        <div id="pencil">
        <small >Editar</small>
        <i className="bi bi-pencil" onClick={()=>handleClick()}></i>
        </div>
    )
}
