'use client'

import { useEffect } from "react"
import { useState } from "react"
import "./empleados.css"
import Principal from "@/Components/Principal/Principal"
import EmpleadoCard from "@/Components/EmpleadoCard/EmpleadoCard"
import {Usuario} from "@/public/community.js"
import Boton from "@/Components/Boton/Boton"
import Link from "next/link"

export default function Empleados() {
  const [usuarios,setUsuarios] = useState(undefined)

  useEffect(()=>{
    const buscaUsuarios= async()=>{
      let res = await Usuario.buscar({qwery:""})
      if(res.status == "SUCCESS")
      {
        let fetchUsuarios =  res.Value;
        let nFetchUsuarios = fetchUsuarios.map(el=>{
          el.Nombre = el.SabuesoUser ? el.SabuesoUser.Nombre ??"":""
          el.Paterno = el.SabuesoUser ? el.SabuesoUser.Paterno ??"":""
          el.Materno = el.SabuesoUser ? el.SabuesoUser.Materno ??"":""
          return el
        })
        setUsuarios(()=>nFetchUsuarios)
      }
      else
        console.log("Error")
    }
    buscaUsuarios()
  },[])

  return (
    <Principal>
        <h1>Empleados</h1>
        
        <div id= "nuevoContainer">
          <Link href="/community/configuraciones/empleados/crear">
            <Boton
              id= "nuevousuario"
              text = "Crear Nuevo Usuario"
              handleClick={()=>{}}
            />
          </Link>
        </div>
        <div id="allEmployees">
          {
            usuarios? usuarios.map((el,i)=>
            <EmpleadoCard
              usuario = {el}
              key = {i}
            />
            ):""
          }
        </div>
    </Principal>
  )
}
