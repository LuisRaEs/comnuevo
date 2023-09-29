import "./FormEmpleados.css"
import InputText from "../Formularios/InputText/InputText"
import InputSelect from "../Formularios/InputSelect/InputSelect"
import InputTextArea from "../Formularios/InputTextArea/InputTextArea"
import InputDate from "../Formularios/InputDate/InputDate"
import InputCheckbox from "../Formularios/InputCheckbox/InputCheckbox"
import { Container, Tab, Tabs, Row, Col } from "react-bootstrap";
import Boton from "../Boton/Boton"
import Loading from "../Loading/Loading"
import {Usuario} from "@/public/Community2.0.0_endpointslib"
import { useState } from "react"
import ModalSimple from "../ModalSimple/ModalSimple"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

export default function FormEmpleados({actualUser,setActualUser,jefes,gestores,jefesSabueso,gestoresSabueso,cargos,roles,departamentos,directivos}) {
  let router = useRouter()
  let erros = useSelector(state=>state.sesion.errors)
  let [uploading,setUploading] = useState(false)

  const handleGuardarCambios = async()=>{
    let aUsuario = new Usuario(actualUser)
    delete aUsuario.Directivo
    delete aUsuario.Departamento
    delete aUsuario.SabuesoUser
    delete aUsuario.Puesto 
    delete aUsuario.GestorVacaciones
    delete aUsuario.Responsable 
    delete aUsuario.SegGestorVacaciones
    //console.log("enviando:",aUsuario)
    let res = await aUsuario.actualizar()
    if(res.status=="SUCCESS")
    {
      setUploading(oldState=>!oldState)
    }
    else
        console.log("error al actualizar")
  }

  const handleClick =()=>{
    setUploading(oldState=>!oldState)
  }



    if(actualUser!=null  && jefes!=null && gestores!=null && jefesSabueso!=null && gestoresSabueso!=null && cargos!=null && roles!=null && directivos!=null)
    {
      let cargosList = cargos.map(el=>{return [el.ID??"",el.NombreCargo??""]});cargosList.unshift(["","Seleccione cargo"])
      let directivosList = directivos.map(el=>{return [el.ID??"",el.NombreGrupo??""]});directivosList.unshift(["","Seleccione directivo"])
      let departamentosList = departamentos.map(el=>{return [el.ID??"",el.NombreGrupo??""]});departamentosList.unshift(["","Seleccione departamento"])
      let jefesList = jefesSabueso.map(el=>{if(el)return [el.ID??"",`${el.Nombre} ${el.Paterno} ${el.Materno}`]});jefesList.unshift(["","Seleccione responsable"])
      let gestoresList = gestoresSabueso.map(el=>{if(el)return [el.ID??"",`${el.Nombre} ${el.Paterno} ${el.Materno}`]});gestoresList.unshift(["","Seleccione gestor"])
      return (
        <div id="formEmpleados">
          <ModalSimple
            title="Mensaje"
            body = "Se realizó la actualizacion correctamente"
            btnText= "Aceptar"
            state = {uploading}
            handleClick = {handleClick}
          />
          <div id="headFormEmpleados">
            <h1>{`${actualUser.SabuesoUser.Nombre??""} ${actualUser.SabuesoUser.Paterno??""} ${actualUser.SabuesoUser.Materno??""}` }</h1>
            <p>{`Sabueso ID: ${actualUser.SabuesoUserID??""}`}</p>
          </div>
          <Container className="mt-4">
            <Tabs defaultActiveKey="DatosPersonales" id="empleado-tab" className="mb-3">
              <Tab eventKey="DatosPersonales" title="Datos Personales">
                <h3>Datos Personales</h3>
                <Row>
                  <Col>
                    <InputText 
                      id = "NombrePreferido"                              
                      controlled ={true}
                      label = "Nombre Preferido *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/\w+/} 
                    /> 
                  </Col>
                  <Col>
                    <InputSelect
                      id = "Genero"                              
                      controlled ={true}
                      label = "Genero *"
                      numeric="true"
                      options = {["Sin Especificar","Masculino", "Femenino", "Otro"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <InputDate 
                      id = "FechaDeNacimiento"                              
                      controlled ={true}
                      label = "Fecha de Nacimiento *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/(19|20)\d{2}-[01]\d-[0-3]\d/} 
                    /> 
                  </Col>
                  <Col>
                    <InputText 
                      id = "LugarDeNacimiento"                              
                      controlled ={true}
                      label = "Lugar de Nacimiento *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/\w+/} 
                    /> 
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <InputSelect
                      id = "TipoDeDoc"                              
                      controlled ={true}
                      label = "Documento de identificación *"
                      numeric="true"
                      options = {["Seleccione Documento","CURP", "Documento de extranjería", "Pasaporte", "Documento de identidad"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                    <InputText 
                      id = "NumeroDoc"                              
                      controlled ={true}
                      label = "N° del documento de identificación *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/^\w+$/} 
                    /> 
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <InputText 
                      id = "NumeroDeSeguridadSocial"                              
                      label = "Número de seguridad social"
                      state = {actualUser}
                      setState = {setActualUser}
                    /> 
                  </Col>
                  <Col>
                    <InputText 
                      id = "RFC"                              
                      label = "RFC"
                      state = {actualUser}
                      setState = {setActualUser}
                    /> 
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <InputSelect
                      id = "EstadoCivil"                              
                      label = "Estado Civil"
                      numeric="true"
                      options = {["Sin especificar","Soltero(a)", "Casado(a)", "Divorciado(a)", "Viudo(a)", "Unión libre"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                    <InputText 
                      id = "NumeroDeHijos"                              
                      label = "Número de hijos (as)"
                      state = {actualUser}
                      setState = {setActualUser}
                    /> 
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <InputSelect
                      id = "TipoDeSangre"                              
                      label = "Tipo de Sangre"
                      numeric="true"
                      options = {["Seleccione tipo","O-", "O+", "A-", "A+", "B-","B+", "AB-","AB+"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                    <></>
                  </Col>
                </Row>
                <Row>
                  <InputTextArea
                    id = "Discapacidad"                              
                    label = "¿Tiene alguna discapacidad? Especifique"
                    state = {actualUser}
                    setState = {setActualUser}
                  />
                  <InputTextArea
                    id = "RestriccionesSalud"                              
                    label = "¿Tiene restricciones de salud y/o alergias? Especifique"
                    state = {actualUser}
                    setState = {setActualUser}
                  />
                  <InputTextArea
                    id = "Direccion"                              
                    label = "Direccion de la vivienda actual"
                    state = {actualUser}
                    setState = {setActualUser}
                  />
                </Row>
              </Tab>
              <Tab eventKey="Contacto" title="Contacto">
                <h3>Contacto Personal</h3>
                <Row>
                <Col>
                    <InputSelect
                      id = "TipoTelefono"                              
                      controlled ={true}
                      label = "Tipo de teléfono *"
                      numeric="true"
                      options = {["Seleccione Tipo","Celular", "Fijo"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                    <InputText 
                      id = "Telefono"                              
                      controlled ={true}
                      label = "N° de teléfono *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/^\d{10}$/} 
                    /> 
                  </Col>
                  <Col>
                    <InputText 
                      id = "EmailPersonal"                              
                      controlled ={true}
                      label = "Email *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9-]+)*$/} 
                    /> 
                  </Col>
                </Row>
                <br/>
                <br/>
                <h3>Contacto Profesional</h3>
                <Row>
                <Col>
                    <InputSelect
                      id = "ProfesionalTipoDeTelefono"                              
                      controlled ={true}
                      label = "Tipo de teléfono *"
                      numeric="true"
                      options = {["Seleccione Tipo","Celular", "Fijo"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                    <InputText 
                      id = "ProfesionalTelefono"                              
                      controlled ={true}
                      label = "N° de teléfono *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/^\d{10}$/} 
                    /> 
                  </Col>
                  <Col>
                    <InputText 
                      id = "ProfesionalEmail"                              
                      controlled ={true}
                      label = "Email *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9-]+)*$/} 
                    /> 
                  </Col>
                  <Col>
                    <InputCheckbox
                      id = "RecibirComunicados"
                      label = "¿Recibe Comunicados?"
                      state={actualUser}
                      setState={setActualUser}
                    />
                  </Col>
                </Row>
                <br/>
                <br/>
                <h3>Contacto De emergencia</h3>
                <Row>
                  <Col>
                    <InputText 
                      id = "NombreContactEmergencia"                              
                      controlled ={true}
                      label = "Nombre Completo *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/\w+/} 
                    />
                  </Col>
                  <Col>
                    <InputSelect
                      id = "RelacionContactEmergency"                              
                      controlled ={true}
                      label = "Parentesco *"
                      options = {["Seleccione parentesco","Pareja", "Hijo(a)", "Padre", "Madre", "Otro"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                </Row>
                <Row>
                <Col>
                    <InputSelect
                      id = "TipoTelefonoContactEmergency"                              
                      controlled ={true}
                      label = "Tipo de teléfono *"
                      numeric="true"
                      options = {["Seleccione Tipo","Celular", "Fijo"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                    <InputText 
                      id = "TelefonoContactEmergency"                              
                      controlled ={true}
                      label = "N° de teléfono *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/^\d{10}$/} 
                    /> 
                  </Col>
                  <Col>
                    <InputText 
                      id = "EmailContactEmergency"                              
                      controlled ={true}
                      label = "Email *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9-]+)*$/} 
                    /> 
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="InformacionDelCargo" title="Información del Cargo">
                <Row>
                  <Col>
                    <InputDate
                      id = "FechaEntrada"                              
                      controlled ={true}
                      label = "Fecha de ingreso *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/(19|20)\d{2}-[01]\d-[0-3]\d/} 
                    />
                  </Col>
                  <Col>
                    <InputSelect
                      id = "PuestoID"                              
                      controlled ={true}
                      label = "Cargo *"
                      numeric="true"
                      options = {cargosList}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                    <InputCheckbox
                      id = "EsGestorDeVacaciones"
                      label = "¿Es Gestor de  Vacaciones?"
                      state={actualUser}
                      setState={setActualUser}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <InputSelect
                      id = "DirectivoID"                              
                      controlled ={true}
                      label = "Directivo *"
                      numeric="true"
                      options = {directivosList}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                    <InputSelect
                      id = "DepartamentoID"                              
                      controlled ={true}
                      label = "Departamento *"
                      numeric="true"
                      options = {departamentosList}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                    <InputSelect
                      id = "ResponsableID"                              
                      controlled ={true}
                      label = "Responsable *"
                      numeric="true"
                      options = {jefesList}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <InputSelect
                      id = "GestorVacacionesID"                              
                      controlled ={true}
                      label = "Gestor de Vacaciones *"
                      numeric="true"
                      options = {gestoresList}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                    <InputSelect
                      id = "SegGestorVacacionesID"                              
                      controlled ={true}
                      label = "Segundo Gestor de Vacaciones *"
                      numeric="true"
                      options = {gestoresList}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                    
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <InputDate 
                      id = "FechaInicioPuestoActual"                              
                      controlled ={true}
                      label = "Fecha de inicio del puesto actual *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/(19|20)\d{2}-[01]\d-[0-3]\d/} 
                    /> 
                  </Col>
                  <Col>
                    <InputSelect
                      id = "TipoDePuesto"                              
                      controlled ={true}
                      label = "Tipo de Puesto *"
                      numeric="true"
                      options = {["Seleccione puesto","Profesional/Técnico","Supervisor","Gerente","Subdirector","Director"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                    <InputCheckbox
                      id = "EsJefe"
                      label = "¿Es Jefe de otros trabajadores?"
                      state={actualUser}
                      setState={setActualUser}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <InputSelect
                      id = "TipoDePersonal"                              
                      controlled ={true}
                      label = "Tipo de Personal *"
                      numeric="true"
                      options = {["Seleccione tipo","Confianza","Sindicalizado","Ninguno","Otro"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                  <Col>
                  <InputSelect
                      id = "TipoJornada"                              
                      controlled ={true}
                      label = "Tipo de Jornada *"
                      numeric="true"
                      options = {["Seleccione tipo","Fijo Nocturno","Fijo Mixto","Fijo Diurno","Otro"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="ContratosYSalarios" title="Contratos Y Salarios">
              <h3>Contrato</h3>
              <Row>
                <InputCheckbox
                  multiple = {[["LaboraLunes","Lunes"],["LaboraMartes","Martes"],["LaboraMiercoles","Miercoles"],["LaboraJueves","Jueves"],["LaboraViernes","Viernes"],["LaboraSabado","Sabado"],["LaboraDomingo","Domingo"]]}
                  label = "Dias que Labora"
                  state={actualUser}
                  setState={setActualUser}
                />
              </Row>
              <br/>
              <Row>
                <Col>
                  <InputSelect
                      id = "TipoContrato"                              
                      controlled ={true}
                      label = "Tipo de Contrato *"
                      numeric="true"
                      options = {["Seleccione tipo","Eventual","Planta","Otro"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                </Col>
                <Col>
                  <InputDate 
                      id = "FechaFinPeriodoPrueba"                              
                      controlled ={true}
                      label = "Fecha final del período de prueba *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/(19|20)\d{2}-[01]\d-[0-3]\d/} 
                    /> 
                </Col>
                <Col>
                  <InputDate 
                      id = "FechaFinContrato"                              
                      controlled ={true}
                      label = "Fecha final del contrato *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/(19|20)\d{2}-[01]\d-[0-3]\d/}  
                    /> 
                </Col>
              </Row>
              <br/>
              <br/>
              <h3>Tiempo laboral</h3>
              <Row>
                <Col>
                  <InputText 
                    id = "HrsLaborales"                              
                    controlled ={true}
                    label = "Horas"
                    state = {actualUser}
                    setState = {setActualUser}
                    regex = {/^\d+$/} 
                  /> 
                </Col>
                <Col>
                  <InputText 
                    id = "MinLaborales"                              
                    controlled ={true}
                    label = "Minutos"
                    state = {actualUser}
                    setState = {setActualUser}
                    regex = {/^\d+$/} 
                  /> 
                </Col>
                <Col>
                  <InputSelect
                      id = "TiposHorasLaborables"                              
                      controlled ={true}
                      label = "Tipo de Horas"
                      numeric="true"
                      options = {["Seleccione tipo","Mensuales","Quincenales","Semanales","Diarias"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                </Col>
              </Row>
              <Row>
              <InputTextArea
                    id = "ComentarioHorasLaborables"                              
                    label = "Observaciones:"
                    state = {actualUser}
                    setState = {setActualUser}
                  />
              </Row>
              <br/>
              <br/>
              <h3>Tiempo laboral</h3>
              <Row>
                <Col>
                  <InputDate 
                      id = "FechaEfectoSalario"                              
                      controlled ={true}
                      label = "Fecha de efecto *"
                      state = {actualUser}
                      setState = {setActualUser}
                      regex = {/(19|20)\d{2}-[01]\d-[0-3]\d/} 
                    /> 
                </Col>
                <Col>
                  <InputSelect
                      id = "Motivo"                              
                      controlled ={true}
                      label = "Motivo *"
                      numeric="true"
                      options = {["Seleccione tipo","Nuevo Contrato","Renovación de Contrato","Otra Reovación"]}
                      state = {actualUser}
                      setState = {setActualUser}
                    />
                </Col>
                <Col>
                  <InputText 
                    id = "Impuesto"                              
                    controlled ={true}
                    label = "Impuesto *"
                    state = {actualUser}
                    setState = {setActualUser}
                    regex = {/^\d+$/} 
                  /> 
                </Col>
              </Row>
              </Tab>
            </Tabs>
          </Container>
          <div id="botonesFormEmpleados">
            <div className="btnCont">
                  <Boton
                  identifier="gCambios"
                  icon={<i className="bi bi-floppy"></i>}
                  handleClick={()=>{handleGuardarCambios()}}
                  text="Guardar cambios"
                  disabled={erros.length==0?false:true}
                  />
              </div>
              <div className="btnCont">
                  <Boton
                  identifier="caancelCambios"
                  icon={<i className="bi bi-box-arrow-left"></i>}
                  handleClick={()=>{router.replace("/community/configuraciones/empleados")}}
                  text="Regresar a EMPLEADOS"
                  />
              </div>
          </div>
        </div>
        )
    } else{
      return(
        <Loading/>
      )
    }
}




/*
  regex fecha con año 1900-2099 con tiempo
  {/(19|20)\d{2}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/}


  ^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$

*/