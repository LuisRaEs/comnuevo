import "./Arrows.css"
import { useState, useEffect} from "react"

export default function Arrows({status,handleClick}) {
    let arrow, label, cls 

    let [state,setState] = useState({arrow:"",label:"",cls:""})
    useEffect(()=>{
        arrow = status &&status== 1?"bi bi-arrow-down-short":"bi bi-arrow-up-short"
        label = status &&status== 1?"Desactivar":"Activar"
        cls = status &&status== 1?"notpass":"pass"
        setState({arrow,label,cls})
    },[status])
    return (
        <div id="arrows">
        <small className={`${state.cls}text`}>{state.label}</small>
        <i className={`${state.arrow} ${state.cls}`} onClick={e=>handleClick(e)}></i>
        </div>
    )
}
