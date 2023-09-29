'use client'
import InputText from "@/Components/Formularios/InputText/InputText"
import InputSelect from "@/Components/Formularios/InputSelect/InputSelect"
import InputCheckbox from "@/Components/Formularios/InputCheckbox/InputCheckbox"
import { useState } from "react"
import "./configuraciones.css"
import {Registro} from "@/public/Community2.0.0_endpointslib"

export default function page() {
    let [form,setForm] = useState({
        prueba1 : undefined,
        prueba2 : "",
        prueba3 : "",
        primero : "",
        segundo : undefined,
        tercero : undefined,
        micheck : undefined,
        check1 : undefined,
        check2:undefined

    })
    Registro.buscar(" usuario_id= 1 ").then((res)=>console.log(res));
    

  return (
    <div id="conf">
        <InputCheckbox
            disabled={form.prueba1==12?"true":"false"}
            id ="micheck"
            label = "palomear"
            multiple = {["check1","check2"]}
            state={form}
            setState={setForm}
            inline = "true"
            
        />

        <InputText
          
            id = "prueba1"
            controlled = "true"
            label = "PRUEBA1"
            title = "Varificador de title"
            state = {form}
            setState = {setForm}
            regex = {/^\d{2,3}$/}
            placeHolder = "Escriba texto"
            numeric="true"
        />
        <InputText
            
            id = "prueba2"
            controlled ={true}
            numeric = {true}
            label = "PRUEBA2"
            title = "Varificador de title"
            state = {form}
            setState = {setForm}
            regex = {/^\d+$/}
            placeHolder = "Escriba texto"
            disabled={form.prueba1==12?"true":"false"}
        />
        <InputText
            numeric={true}
            id = "prueba3"
            label = "PRUEBA3"
            title = "Varificador de title"
            state = {form}
            setState = {setForm}
            placeHolder = "Escriba texto"
        />

        <InputSelect
            disabled={form.prueba1==12?true:false}
            id= "primero"
            controlled = "true"
            label = "primero"
            numeric="true"
            options = {["op1","op2", "sdcs", "sdwwrgete", "sjbfkjef"]}
            state = {form}
            setState={setForm}
            title = "prueba"
        />
        <InputSelect
            disabled = {false}
            id= "segundo"
            controlled = "true"
            numeric={true}
            options = {[["","op1"],["op2","op2"], ["sdcs","sdcs"], ["2","sdwwrgete"], ["sjbfkjef","sjbfkjef"]]}
            state = {form}
            setState={setForm}
        />  

        <InputSelect
            id= "tercero"
            
            numeric ={true}
            options = {{0:"op2", 1:"sdcs","":"op1", "2":"sdwwrgete", 3:"sjbfkjef"}}
            state = {form}
            setState={setForm}
        />  

        
    </div>
  )
}



/*

                

        <InputSelect
            id= "miselect2"
            options = {["op1","op2", "sdcs", "sdwwrgete", "sjbfkjef"]}
            selectedop = {form.miselect2}
            handleChange = {handleChange}
        />

        <InputSelect
            id= "miselect3"
            options = {[["op1","op1"],["op2","op2"], ["sdcs","sdcs"], ["sdwwrgete","sdwwrgete"], ["sjbfkjef","sjbfkjef"]]}
            selectedop = {form.miselect3}
            handleChange = {handleChange}
        />



*/