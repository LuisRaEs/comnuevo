/* 

Recibe como atributos:
    *id
    *state
    *setState 
    label
    placeHolder
    title
    controlled
    regex
    numeric
    disabled 
    inputWidth              
    style                

    *campos obligatorios

Cuando se activa el campo "controlled" igual a "true", es necesario completar el campo regex


Ejemplo de llamado

import InputText from "@/Components/Formularios/InputText/InputText"            -> Importar componente
import { useState } from "react"                                                -> Importamos manejador de estado


export default function MiComponente(){                                         -> Componente padre
    let [state,setState] = useState({id:value})                                 -> Estado, debe ser un objeto donde la "key" sea igual al id del inputText 
                                                                                    y el "value", el valor inicial

    return (
        <InputText                                                              
            id = {id}                                                           -> Identificador que controla el estado
            controlled ={true}                                                    -> Activa interfaz de colores (rojo/verde) para manejo de la "regex", en la store se marcan los errores
            numeric = {true}                                                    -> Indica si el valor a ser guardado en el estado es numerico o no
            label = "Nombre etiqueta"
            title = "Texto a ser mostrado al usuario como ayuda"                -> Mensaje a mostrar en el simbolo "?" dentro del label
            state = {state}
            setState = {setstate}
            regex = {/^\d+$/}                                                   -> Ejemplo de regex para identificar numeros
            placeHolder = "Texto a ser mostrado como ejemplo"
            disabled={true}                                                     -> Deshabilita o habilita el campo
        />
    )
}
*/

import { useDispatch } from "react-redux"
import { useState , useEffect} from "react"
import { Form } from "react-bootstrap"
import { addError , removeError } from "@/public/store/slices/sesion/sesion"

export default function InputText({id,label,controlled,placeHolder,inputWidth,style,regex, title,state,setState, numeric, disabled}) {
    let chkControlled = controlled && (controlled == true || controlled == "true") ? true : false
    let chkNumeric = numeric && (numeric == true || numeric == "true") ? true : false
    let chkDisabled = disabled && (disabled == true || disabled == "true") ? true : false
    const dispatch = useDispatch()
    const [pass,setPass] = useState(false)
    useEffect(()=>{
        if(!chkDisabled)
        {
            if(chkControlled)
            {
                if(state [id] == null || (regex && !regex.test(String(state[id]))))
                {
                    dispatch(addError(id))
                }else
                    setPass(true)
                
            }
        }else{
            dispatch(removeError(id))
        }

        return ()=>{
            dispatch(removeError(id))
        }
    },[chkDisabled])

    const handleChange = (e)=>{
        let newValue
        if(chkNumeric)
        {
            if(e.target.value!="")
            {
                if(e.target.value[e.target.value.length-1]==".")
                    newValue = e.target.value
                else{
                    let strNumber = ((e.target.value.split("")).map(el=>{if(el == "." || !Number.isNaN(Number(el))) return el })).join("")
                    strNumber.length>0 ? newValue=Number(strNumber) : newValue=undefined
                }
            }
            else
                newValue  = ""
        }
        else 
            newValue = e.target.value
        
            setState(oldState=>{return{...oldState,[e.target.name]:newValue }})

        if(regex && !regex.test(newValue))
        {
            setPass(false)
            dispatch(addError(id))
        }
        else
        {
            
            setPass(true)
            dispatch(removeError(id))
        }

    }

    return(
        <Form.Group className="mb-3" style={style??{width:inputWidth ?? "100%",margin:"0 auto"}}>

        {label ? <Form.Label style={{display:"flex",gap:"10px"}}>
            {label}
            {!chkDisabled?(chkNumeric || title ? <i className="bi bi-question-circle" title={`${chkNumeric?"Solo se aceptan valores numericos.\n":""}${title??""}`}/>:""):"" }
        
        </Form.Label> : "" }
        
        <Form.Control 
            disabled ={chkDisabled}
            id = {id} 
            name = {id}
            type = "text" 
            placeholder = {!chkDisabled?(placeHolder ?? ""):""}
            value = {!chkDisabled?(state[id] == null?"":state[id]):""}
            onChange ={ e=>{
                    handleChange(e)
                }
            }
            style = {!chkDisabled?(chkControlled ? {boxShadow: `0px 0px 5px 5px  ${pass ? "rgba(0,255,0,0.5)":"rgba(255,0,0,0.5)"}`} : undefined):undefined}
            
        />
    </Form.Group>
    )
}
