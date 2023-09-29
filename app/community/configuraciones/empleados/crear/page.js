'use client'
import "./crear.css"
import { useEffect , useState } from "react"
import { useSelector } from "react-redux"
import Principal from "@/Components/Principal/Principal"
import {Usuario,User} from "@/public/Community2.0.0_endpointslib"
import InputText from "@/Components/Formularios/InputText/InputText"
import Boton from "@/Components/Boton/Boton"
import Loading from "@/Components/Loading/Loading"
import ModalSimple from "@/Components/ModalSimple/ModalSimple"
import { useRouter } from "next/navigation"

export default function page() {
    const router = useRouter()
    let errors = useSelector(state=>state.sesion.errors)
    let [usr, setUsr] = useState(undefined)
    let [sabuesoID, setSabuesoID] = useState({id:undefined})
    let [usuarios,setUsuarios] = useState(undefined)
    let [existe,setExiste] =useState(false)
    let [hideCrear,setHideCrear] =useState(true)
    let [id,setId] =useState(undefined)
    

    
    const buscarUsuario=async ()=>{
      if(!errors.includes("id") )
      {
        let coincidencia = usuarios.find(el=>el.SabuesoUserID == sabuesoID.id)
        if(coincidencia == null)
        {
          let bUser = await User.buscar({qwery:`id = ${sabuesoID.id}`})
          if(bUser.status =="SUCCESS"){
            setUsr(()=>bUser.Value[0])
            setHideCrear(false)
          }
        }else{
          setExiste(true)
        }
      }
    }


    const handleExisteUsuario=()=>{
      setExiste(!existe)
    }

    const handleCrear = async()=>{
      if(usr != null)
      {
        let nUsuario = new User({ID:usr.ID,CommunityUser:new Usuario({SabuesoUserID:usr.ID})})
        let res = await nUsuario.actualizar()
        if(res.status=="SUCCESS")
        {
          let us = await Usuario.buscar({qwery:`sabueso_user_id = ${usr.ID}`})
          if(us.status == "SUCCESS")
          {
            console.log(us)
            setId(()=>us.Value[0].ID)
          }
        }   
      }
    }

    useEffect(()=>{
      if(id!=null)
      {
        router.replace(`/community/configuraciones/empleados/${id}`)
      }
    },[id])

    useEffect(()=>{
      const nSearch = async()=>{
        let bUsuarios = await Usuario.buscar({qwery:""})
        if(bUsuarios.status == "SUCCESS"){
          setUsuarios(()=>bUsuarios.Value)
        }else{
          console.log("Error")
        }
      }
      nSearch()
    },[])

    if(usuarios!=null)
    {
      return(
        <Principal>    
      
          <ModalSimple
            title="Error al crear un nuevo usuario"
            body = "El usuario ya existe"
            btnText= "Aceptar"
            state = {existe}
            handleClick = {handleExisteUsuario}
          />

          <div id="buscarID">
            <h1>Busqueda del Usuario Sabueso</h1>
            <div id="inputSabueso">
              <InputText 
                id = "id"                              
                controlled ={true}
                numeric={true}
                label = "Sabueso ID *"
                state = {sabuesoID}
                setState = {setSabuesoID}
                regex = {/^\d{1,10}$/} 
              />
            </div>
            <div id="buttonArea">
              <Boton
                id="searchSabuesoUser"
                icon = {<i className="bi bi-search"></i>}
                handleClick={buscarUsuario}
                text= "Buscar"
              />
              <Boton
                id="creaarUsuarioC"
                icon = {<i className="bi bi-file-plus"></i>}
                handleClick={handleCrear}
                text= "Crear"
                hide ={hideCrear}
              />
            </div>
          </div>
        </Principal>
        )
    }else{
      <Loading/>
    }
    
      
    
}
