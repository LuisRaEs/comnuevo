/* 

Recibe como atributos:
    *id
    *state
    *setState
    multiple
    label
    disabled 
    inline               

    *campos obligatorios

Cunado multiple esta activo, ignora los atributos "id", "label"

el atributo "multiple" recibe:
        1. Un array donde cada index representa el id y el label al mismo tiempo
        2. Un arrays de arrays, donde cada array interno tiene el identidicador en el intex[0], y el label en index[1]
        3. Un objeto donde las keys representan los id's, y el value las labels.


Ejemplo de llamado

import InputCheckbox from "@/Components/Formularios/InputCheckbox/InputCheckbox"      -> Importar componente
import { useState } from "react"                                                -> Importamos manejador de estado


export default function MiComponente(){                                         -> Componente padre
    let [state,setState] = useState({id:value})                                 -> Estado, debe ser un objeto donde la "key" sea igual al id del inputText 
                                                                                    y el "value", el valor inicial

    return (
         <InputCheckbox
            id ={id}
            label = "palomear"
            state={state}
            setState={setState}
                    multiple = {["check1","check2"]}                            -> Encaso de querer varios check al mismo tiempo
            inline = "true"
            disabled={true}
            inline = {true}                                                     -> Cuando hay multiples checks, los coloca uno al lado de otro
        />
    )
}
*/


import { Form } from "react-bootstrap"



export default function InputCheckbox({id,label,inputWidth,style,multiple,state,setState, disabled, inline,title}) {
    let chkDisabled = disabled && (disabled == true || disabled == "true") ? true : false
    let chkInline = inline && (inline == true || inline == "true") ? true : false
    let newMultiple = multiple? (Array.isArray(multiple) ? multiple : Object.entries(multiple)) :  undefined
    const handleChange = (e)=>{
        setState(oldState=>{return{...oldState,[e.target.value]:e.target.checked}})
    }

    return(
        <Form.Group className="mb-3" style={style??{width:inputWidth ?? "100%",margin:"0 auto",display: "flex", flexDirection:"column", justifyContent:"center",alignItems:"center", height:"100%"}}>
            {label && multiple!=null ? <Form.Label style={{display:"flex",gap:"10px", fontSize:"20px",paddingBottom:"10px"}}>
            {label}
            {!chkDisabled?( title ? <i className="bi bi-question-circle" title={`${title??""}`}/>:""):"" }
            </Form.Label>:""}
        <div style ={{display:"flex", gap:"30px"}}>
        {
            newMultiple? newMultiple.map((el,i)=>{
                return Array.isArray(el)?
                <Form.Check 
                disabled ={chkDisabled}
                inline = {chkInline}
                key = {el[0]+i}
                type= "checkbox"
                id={el[0]??""} 
                name={el[0]??""}
                value = {el[0]??""}
                label={el[1]??""}
                checked={chkDisabled?false:state[el[0]]}
                onChange={e=>{handleChange(e)}}
                style = {{fontSize:"22px"}}
                />:
                <Form.Check 
                disabled ={chkDisabled}
                inline = {chkInline}
                key = {el+i}
                type="checkbox"
                id={el??""}
                name={el??""}
                value = {el??""}
                label={el??""}
                checked={chkDisabled?false:state[el]}
                onChange={e=>{handleChange(e)}}
                style = {{fontSize:"22px"}}
                />
            }):
            <Form.Check 
            inline = {chkInline}
            disabled ={chkDisabled}
            type="checkbox"
            id={id??""}
            name={id??""}
            value = {id??""}
            label={label??""}
            checked= {chkDisabled?false:state[id]}
            onChange={e=>{handleChange(e)}}
            style = {{fontSize:"22px"}}
          />
        }
        </div>

    </Form.Group>
    )
}



















