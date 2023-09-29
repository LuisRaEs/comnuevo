'use client'
import { useEffect , useState } from "react"
import Principal from "@/Components/Principal/Principal"
import FormEmpleados from "@/Components/FormEmpleados/FormEmpleados"
import {Usuario,User,Cargo,Role,Grupos} from "@/public/Community2.0.0_endpointslib"



export default function page({params}) {
    let [actualUser, setActualUser] = useState(undefined)
    let [jefes, setJefes] = useState(undefined)
    let [gestores, setGestores] = useState(undefined)
    let [jefesSabueso, setJefesSabueso] = useState(undefined)
    let [gestoresSabueso, setGestoresSabueso] = useState(undefined)
    let [cargos, setCargos] = useState(undefined)
    let [roles, setRoles] = useState(undefined)
    let [departamentos, setDepartamentos] = useState(undefined)
    let [directivos, setDirectivos] = useState(undefined)

    
    useEffect(()=>{
        const  searchData = async()=>{
            let bUsuario = await Usuario.buscar({qwery:`id = ${params.id}`})
            let bJefes = await Usuario.buscar({qwery:"es_jefe = 1"})
            let bGestores = await Usuario.buscar({qwery:"es_gestor_de_vacaciones = 1"})
            let bCargos = await Cargo.buscar({qwery:""});
            let bRoles = await Role.buscar({qwery:""});
            let bDepartamentos = await Grupos.buscar({qwery:" tipo_grupo_id = 4 "});
            let bDirectivos = await Grupos.buscar({qwery:" tipo_grupo_id = 5 "});
            if(bUsuario.status =="SUCCESS"){setActualUser(()=>bUsuario.Value[0])}
            if(bJefes.status =="SUCCESS"){
                let usrs = bJefes.Value
                setJefes(()=>bJefes.Value)

                let newUsrs = usrs.map(async el=>{
                    let res = await User.buscar({qwery:`id = ${el.SabuesoUserID}`})
                    if (res.status =="SUCCESS" && res.Value[0]){
                            return res.Value[0]
                    }        
                })
                let bJefesSabueso = await Promise.all(newUsrs)
                setJefesSabueso(()=>bJefesSabueso)
            } 
            if(bGestores.status =="SUCCESS"){
                let usrs = bGestores.Value
                setGestores(()=>bGestores.Value)
                let newUsrs = usrs.map(async el=>{
                    let res = await User.buscar({qwery:`id = ${el.SabuesoUserID}`})
                    if (res.status =="SUCCESS" && res.Value[0]){
                            return res.Value[0]
                    }        
                })
                let bGestoresSabueso = await Promise.all(newUsrs)
                setGestoresSabueso(()=>bGestoresSabueso)
            }
            if(bCargos.status =="SUCCESS"){setCargos(()=>bCargos.Value)}
            if(bRoles.status =="SUCCESS"){setRoles(()=>bRoles.Value)}
            if(bDepartamentos.status =="SUCCESS"){setDepartamentos(()=>bDepartamentos.Value)}
            if(bDirectivos.status =="SUCCESS"){setDirectivos(()=>bDirectivos.Value)}
        }
        searchData()
    },[])
  return (
    <Principal>
        <FormEmpleados 
            actualUser={actualUser}
            setActualUser={setActualUser}
            jefes={jefes}
            gestores={gestores}
            jefesSabueso={jefesSabueso}
            gestoresSabueso={gestoresSabueso}
            cargos={cargos}
            roles={roles}
            departamentos={departamentos}
            directivos={directivos}
        />
    </Principal>
  )
}
