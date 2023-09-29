/* 

Recibe como atributos:
    *id
    *state
    *setState
    options
    label
    title
    controlled
    numeric
    disabled 
    inputWidth              
    style                

    *campos obligatorios


El atributo options recibe 3 entradas:
        1. Un array que contenga los textos a desplegar por cada index. En el index[0] va el texto por default, cada posicion es el valor del select.
        2. Un array que contenga array de 2 posiciones por cada index. El array interno tiene en como valor el contenido de su index[0] y como texto el contenido de index[1].
        3. Un objeto donde cada key es el valor seleccionable, el value es el texto a desplegar. debe contener una llave tipo string vacio que se toma como opcion default.

Ejemplo de llamado

import InputSelect from "@/Components/Formularios/InputSelect/InputSelect"      -> Importar componente
import { useState } from "react"                                                -> Importamos manejador de estado


export default function MiComponente(){                                         -> Componente padre
    let [state,setState] = useState({id:value})                                 -> Estado, debe ser un objeto donde la "key" sea igual al id del inputText 
                                                                                    y el "value", el valor inicial

    return (
        <InputSelect
            id= {id}
            controlled = "true"
            label = "Nombre etiqueta"
            numeric="true"
            options = {["op1","op2", "op3"]}
            state = {state}
            setState={setState}
            title = "Texto a ser mostrado al usuario como ayuda"
            disabled={true}
        />
    )
}
*/



import Form from 'react-bootstrap/Form';
import { useState , useEffect } from 'react';
import { useDispatch } from "react-redux"
import { addError , removeError } from "@/public/store/slices/sesion/sesion"

export default function InputSelect({id , options, label, style, inputWidth, title, state, setState ,controlled, numeric,disabled}) {
    let chkControlled = controlled && (controlled == true || controlled == "true") ? true : false
    let chkNumeric = numeric && (numeric == true || numeric == "true") ? true : false
    let chkDisabled = disabled && (disabled == true || disabled == "true") ? true : false
    let newArray
    !Array.isArray(options) ? newArray = Object.entries(options): newArray = options
    const dispatch = useDispatch()
    const [pass,setPass] = useState(false)

    useEffect(()=>{
        if(!chkDisabled)
        {
            if(chkControlled)
            {
                if(state[id]==null || state[id]=="")
                {
                    dispatch(addError(id))
                    setPass(false)
                }
                else
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
            if(e.target.value.length>0)
            {
                let number = Number(e.target.value)
                newValue = Number.isNaN(number) ? "":number
            }
            else
                newValue = ""
        }
        else
            newValue = e.target.value

        setState((oldState)=>{return{...oldState,[id]:newValue}})

        if(chkControlled && newValue === "")
        {
            dispatch(addError(id))
            setPass(false)
        }
        else
        {
            dispatch(removeError(id))
            setPass(true)
        }
 
    }

    return (
        <Form.Group className="mb-3" style={style??{width:inputWidth ?? "100%",margin:"0 auto"}}>

        {label ? <Form.Label style={{display:"flex",gap:"10px"}}>
            {label}
            {!chkDisabled?(title ? <i className="bi bi-question-circle" title={title??""}/>:""):"" }
        
        </Form.Label> : "" }


            <Form.Select 
                disabled ={chkDisabled}
                value= {state[id] == null? "":state[id]} 
                onChange={e=>{handleChange(e)}} 
                id={id} 
                name ={id}
                style = {!chkDisabled?(chkControlled ? {boxShadow: `0px 0px 5px 5px  ${pass ? "rgba(0,255,0,0.5)":"rgba(255,0,0,0.5)"}`} : undefined):undefined}
            >
                { !chkDisabled?(options ? newArray.map((el,i)=>{

                    if(Array.isArray(el))
                        return <option value={el[0]} key={`${id+i}`}>{el[1]}</option>
        
                    else
                    {
                        if(i == 0)
                            return <option value={""} key={`${id+i}`}>{el}</option>
                        else
                            return <option value={i} key={`${id+i}`}>{el}</option>
                    }
                    
                }) : ""):""
            }
            </Form.Select>

        </Form.Group>
        
    )
}