'use client'
import "./EmpleadoCard.css"
import { useState } from "react"
import img from "@/public/img/notUser.png"
import Arrows from "../FigButtons/Arrows/Arrows"
import Pencil from "../FigButtons/Pencil/Pencil"
import Image from "next/image"
import {Usuario} from "@/public/community.js"
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";

export default function EmpleadoCard({usuario}) {
    const router = useRouter();
    let [us,setUs] = useState(usuario)
    let nombre = us.SabuesoUser ? us.SabuesoUser.Nombre ?? "":""
    let materno = us.SabuesoUser ? us.SabuesoUser.Materno ?? "":""
    let paterno = us.SabuesoUser ? us.SabuesoUser.Paterno ?? "":""
    let rfc =  us.RFC ?? ""
    let pEmail =  us.ProfesionalEmail ?? ""
    let rol = "65655"
    
    const handleClick = async ()=>{
        let aUs = new Usuario({ID:us.ID,Status:us.Status == 1?0:1})
        let res = await aUs.actualizar()
        if(res.status=="SUCCESS")
        {
            setUs(oldState => new Usuario({...oldState,Status:us.Status == 1?0:1}))
            console.log("actualizado")
        }else{
            console.log("error")
        }
    }

    const handleEdit = ()=>{
        router.replace(`/community/configuraciones/empleados/${us.ID}`)
    }
  return (
    <div id="empleadoCard">
        <div id="ecImage">
            <Image src={img} width={70} height={70} alt="img profile"/>

        </div>
        <div id="ecInformation">
            <h2 id="ecNombre">{`${nombre} ${materno} ${paterno}`}</h2>
            <p id="ecRFC">{`RFC: ${rfc}`}</p>
            <p id="ecRole">{`Rol: ${rol}`}</p>
            <p id="ecPEmail">{`Email: ${pEmail}`}</p>
        </div>
        <div id="ecOptions">
            <Arrows
                status={us.Status}
                handleClick={handleClick}
            />
            <Pencil handleClick={handleEdit}/>
        </div>
    </div>
  )
}

/*

<Form.Control type="date" onChange={e=>console.log(e.target.value)}/>
            <input type="date"/>

*/
