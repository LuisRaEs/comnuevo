
import "./Boton.css"

export default function Boton ({identifier,icon,handleClick,text,hide,disabled}){
    let chkDisbaled = disabled && (disabled==true || disabled=="true")?true:false
    let chkHide = hide && (hide==true || hide=="true")?true:false
    return(
        <button  
            className="btn btn-lg btn-primary" 
            disabled = {chkDisbaled}
            hidden = {chkHide}
            style={{width:"99%",margin:"0 auto"}}
            type="button"
            id={identifier}
            onClick={()=>handleClick()}>
            {icon ?? ""}
            {text ? <span>{text}</span>:<></>}
        </button>
    )
}