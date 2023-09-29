'use client';
import Boton from "@/Components/Boton/Boton"
import "./Checador.css"
import { use, useEffect, useMemo, useState } from "react";
import Input2 from "../Input/Input";

import {
    useSelector
} from "react-redux"

import {Registro} from "../../public/community";
import { Button,
        Card, 
        Row, 
        Modal, 
        Col} from "react-bootstrap";

import Usuario from "../Usuario/Usuario";
import { Container } from "postcss";

export default function Checador(){

    const [reloj, setReloj] = useState("--:--:--");

    const Usuarioinfo = useSelector(
        state => {
            return state.sesion.info
        }
    );
    
    const [showRegistros, setShowRegistros] = useState(false);
    const handleClose = () => setShowRegistros(false);
    const handleShow = () => setShowRegistros(true);

    useEffect(() => {

        document.getElementById('btnFin').disabled = true; //deshabilita cuando inicia el boton Finalizar

        const interval = setInterval(() => {
        let now  = new Date();
        
          setReloj(()=>{
            let hours = now.getHours(), minutes = now.getMinutes(), seconds = now.getSeconds()
            if(String(hours).length==1)
                hours = `0${hours}`
            if(String(minutes).length==1)
                minutes = `0${minutes}`
            if(String(seconds).length==1)
                seconds = `0${seconds}`
            return`${hours}:${minutes}:${seconds}`
        })
        }, 1000);
        return () => clearInterval(interval);
      }, []);
    
    const handleChange = (e)=>
    {
        console.log(e.target.value)
    }

    

    const UnMinuto = 60 * 1000;
    const UnaHora = 60 * UnMinuto;
    const jornada = 8 * UnaHora;


    //const storedRestante = window.sessionStorage.getItem('restante');
    const [restante,setRestante] = useState( `Tiempo restante: 8 hrs 00 min.` );

    const [idInterval, setIdInterval] = useState(null); // para resetear el intervalo y detenerlo

    const refreshTiempoRestante = ( strDate )=>{
        const getTiempoRestante = ()=>{
           // const checkIn = new Date(strDate);
            const checkIn = strDate;
            const current = new Date();
            console.log("current:", current)
            const diffTime = current.getTime() - checkIn.getTime();
            const horasFaltantes = Math.floor((jornada - diffTime) / UnaHora);
            const minutosFaltantes = Math.floor(((jornada - diffTime) % UnaHora)/UnMinuto);
            setRestante(`Timpo restante: ${horasFaltantes<0?0:horasFaltantes} hrs ${minutosFaltantes<0?0:minutosFaltantes} min.`)
        };
    
        getTiempoRestante();
        const checker = setInterval( ()=>{ getTiempoRestante(); }, UnMinuto );

        setIdInterval(checker); // para resetear el intervalo y detenerlo
        return () => clearInterval(checker);

    }

    //inicio: Funciones para botones iniciar y finalizar
    var com;
    var isPause = false;

    const iniciar = () => {
        const inicioCheck = new Date();
        com = new Registro;
        console.log(isPause);

        com.Tipo = 1;
        com.Fecha = inicioCheck;
        com.UsuarioID = Usuarioinfo.SabuesoUserID;
        
        console.log("El usuario es:", Usuarioinfo.SabuesoUserID)
        console.log("Inicie: ",inicioCheck);

        //com.crear();

        document.getElementById('btnInicio').disabled = true;
        document.getElementById('btnFin').disabled = false;
        refreshTiempoRestante(inicioCheck);
    }
    const finalizar = () => {
        var fechaReloj = new Date();
        com = new Registro;

        com.Tipo = 2;
        com.Fecha = fechaReloj;
        com.UsuarioID = Usuarioinfo.SabuesoUserID;

        console.log("Finalice: ", fechaReloj)
        
        setRestante('Tiempo restante: 8 hrs 00 min.'); // para resetear el intervalo y detenerlo
        clearInterval(idInterval); // para detener el intervalo y detenerlo

        //com.crear();

        document.getElementById('btnInicio').disabled = false;
        document.getElementById('btnFin').disabled = true;
        
        handleClose();
    }
    const pausa = () => {
        isPause = true;
        
        clearInterval(idInterval);

        document.getElementById('btnInicio').disabled = false;
        document.getElementById('btnFin').disabled = true;

        handleClose();
    }
    //fin: Funciones para botones iniciar, finalizar y pausar

    return(
        <div id="Checador">
            <div className="titulo">
                <h1>CHECADOR</h1>
            </div>
            <div id="reloj">
                <p>{reloj}</p>
            </div>
            <div id="horasRestantes">
                <p>{restante}</p>
            </div>
            <div id="botones">
                <Button
                    identifier = "iniciar"
                    onClick = {iniciar}
                    id = "btnInicio"
                    variant="outline-success"
                ><i className="bi bi-play-circle"></i> INICIAR</Button>
                <Button
                    identifier = "finalizar"
                    onClick = {handleShow}
                    id = "btnFin"
                    variant="outline-warning"
                ><i className="bi bi-pause-circle"></i> FINALIZAR</Button>
                 
            </div>
            <Row>
                <Modal show={showRegistros}>
                    <Modal.Header>
                        <Modal.Title>Mis Registros</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Motivo para parar de laborar: </h6>
                        <Row>
                            <Col>
                                <Card onClick={finalizar}>
                                    <Card.Body className="text-center">
                                        <Card.Title><h6>FIN DE LA JORNADA</h6></Card.Title>
                                        <i className="bi bi-suitcase-lg fa-3x"></i>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card onClick={pausa}>
                                    <Card.Body className="text-center">
                                        <Card.Title>PAUSA</Card.Title>
                                        <i className="bi bi-clock-history fa-3x"></i>
                                    </Card.Body>
                                </Card> 
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </Row>
        </div>
    )
}