'use client'
import { 
    Container,
    Tabs,
    Tab,
    Form,
    Row,
    Button,
    Table,
    Modal,
    Card,
    Dropdown,
    Col
} from "react-bootstrap";

import{useState, useEffect, use} from "react";

import{
    Catalogo_Categoria,
    Catalogo_Grupo,
    Grupos,
    Ausencia
} from "../../../../public/community.js"

import "./gestionausencias.css";
import "@/public/bootstrap.min.css";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle.js";
import Input from "@/Components/Input/Input.js";
import { Checkbox } from "@mantine/core";


export default function GestionAusencias(){

    //------ inicio: Constantes para el MarkUp ------
    const [show, setShow] = useState(false);
    const [showformulario, setShowFormulario] = useState(false);

    const [showColorIcono, setShowColoricono] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseFormulario = () => setShowFormulario(false);
    const handleShowFormulario = () => setShowFormulario(true);

    const divCloseColorIcono = () => setShowColoricono(false);
    const divShowColorIcono = () => setShowColoricono(true);
    //------ fin: Cosntantes para el MarkUp ------

    //------ inicio: Arrays ------
    let CatalogoCategoria = [];
    let CatalogoGrupo = [];
    let CatalogoSubGrupo = [];
    let Ausencias = [];
    let Categorias = [];
    //------ fin: Arrays ------

    const [data, setData] = useState([]);


    //------ inicio: cboCatalogo ------
    Catalogo_Categoria.buscar({qwery:""}).then(response => {
        CatalogoCategoria = response.Value;
        const cbo_Categoria = document.getElementById('cboCategoria');

        let options = '<option value="-1">Seleccione una Opcion</option>';

        CatalogoCategoria.forEach(element => {
            options += '<option value="' + element.ID + '">' + element.Nombre + '</option>';
        });

        cbo_Categoria.innerHTML = options;
    });
    //------ fin: cboCatalogo ------

    //------ inicio: cboGrupo ------
    Catalogo_Grupo.buscar({query:""}).then(response => {
        CatalogoGrupo = response.Value;

        const cbo_Grupo = document.getElementById('cboGrupo'); // filtro
        const cat_Grupo = document.getElementById('catGrupo'); // formulario

        let options = '<option value="-1">Seleccione una Opcion</option>';

        CatalogoGrupo.forEach( element =>{
            options += '<option value="' + element.ID + '">' + element.Nombre + '</option>';
        });

        cbo_Grupo.innerHTML = options;
        cat_Grupo.innerHTML = options;
        
    });
    //------ fin: cboGrupo ------

    //------ inicio: cboSubGrupo ------
    const FiltroSubGrupo = async () => {

        var idGrupo = document.getElementById('cboGrupo').value;
        var idcatGrupo = document.getElementById('catGrupo').value;
        var respuesta = "";

        const cbo_SubGrupo = document.getElementById('cboSubGrupo'); // filtro
        const cat_SubGrupo = document.getElementById('catSubGrupo'); // formulario

        let response = await Grupos.buscar({qwery:""});
        let options = '<option value="-1">Seleccione una Opcion</option>';

        if(idGrupo != "-1" || idcatGrupo !="-1"){
            document.getElementById('cboSubGrupo').disabled = false;
            document.getElementById('catSubGrupo').disabled = false;
            respuesta = "id: " + idGrupo;
        }else{
            document.getElementById('cboSubGrupo').disabled = true;
            document.getElementById('catSubGrupo').disabled = true;
        }

        if(response.status == 'SUCCESS'){
            
            CatalogoSubGrupo = response.Value;

            if(respuesta){
				CatalogoSubGrupo = CatalogoSubGrupo.filter( function (item){
					return item.TipoGrupoID == idGrupo || item.TipoGrupoID == idcatGrupo;
				})
			}
            
            CatalogoSubGrupo.forEach( element =>{
                options += '<option value="' + element.ID + '">' + element.NombreGrupo + '</option>';
            });

            cbo_SubGrupo.innerHTML = options;
            cat_SubGrupo.innerHTML = options;
        }

    }
    //------ fin: cboSubGrupo ------

    //------ inicio: Recargar ------
    useEffect (() => {
        const Recargar = async () => {
            try{
                let response = await Ausencia.buscar({qwery:""});
                console.log("Ausencias:", response);

                //------ inicio: Combo Categoria para Filtro ------
                var idCategoria = document.getElementById('cboCategoria').value;
	            idCategoria = idCategoria != "-1" ? idCategoria : null;

                console.log("Categoria:", idCategoria);
                //------ fin: Combo Categoria para Filtro ------
                
                //------ inicio: Combo Categoria para Filtro ------

                if( response.status === 'SUCCESS'){
                    Ausencias = response.Value;
                    Categorias = response.Value; 
                    
                    var rows = Ausencias.map( el => ({
                        id: el.ID,
                        Nombre: el.Nombre,
                        Categoria: el.Categoria,
                        FechaActivacion: el.FechaActivacion,
                        FechaFinalizacion: el.FechaFinalizacion,
                        IdGrupo: el.IdGrupo,
                        IdElementoGrupo: el.IdElementoGrupo,
                        Estado: el.Estado
                    }));
                    setData(rows);
                }
            } catch (error){
                console.error(error);
            }  
        };
        Recargar();
    }, []);
    //------ fin: Recargar ------

    //------ inicio: Formatos de tabla ------
    const formatDate = (strFecha)=>{
        if(!strFecha || !strFecha.trim().length ) return '';
        const date = new Date(strFecha);
        if(!date) return '';
        return date.toLocaleString("es-ES" , {day: "2-digit", month: "2-digit", year: "numeric"}).split("/").reverse().join("-");
    }


    //------ fin: Formatos de tabla ------

    return (
        <Container className="mp-3 mt-4">
            <Tabs  
            defaultActiveKey="gestionausencias"
            className="mb-3">
                
                <Tab eventKey="gestionausencias" title="GestionAusencias">

                    {/* ------ inicio: Filtros ------ */}
                    <Container>
                        <Row>
                            <div className="col-sm">
                                <Form.Label>Tipo de Ausencia:</Form.Label>
                                <Form.Select id="cboCategoria"  size="sm">
                                </Form.Select>
                            </div>
                            <div className="col-sm">
                                <Form.Label>Tipo de Grupo:</Form.Label>
                                <Form.Select id="cboGrupo" onChange={FiltroSubGrupo}  size="sm">
                                </Form.Select>
                            </div>
                            <div className="col-sm">
                                <Form.Label>Tipo de SubGrupo:</Form.Label>
                                <Form.Select id="cboSubGrupo"  size="sm" placeholder="Selecciona una Opcion" disabled>
                                    <option>Seleccione una Opcion</option>
                                </Form.Select>
                            </div>
                            <div className="col-sm">
                                <Form.Label>Opciones:</Form.Label>
                                <div className="col-sm">
                                    <Button variant="outline-success" size="sm">
                                        <i class="bi bi-search"></i>
                                    </Button>
                                    <Button variant="outline-warning" size="sm" onClick={handleShow}>
                                        <i class="bi bi-stickies-fill"></i>
                                    </Button>
                                </div>
                            </div>
                        </Row>   
                    </Container>
                    {/* ------ fin: Filtros ------ */}

                    {/* ------ inicio: Menu de Categorias ------ */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>TIPOS DE AUSENCIAS</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <div className="Cardsrow w-50">
                                    <Card className="col-sm" id="CardVacaciones" onClick={handleShowFormulario}>
                                        <Card.Body className="text-center">
                                            <i class="bi bi-emoji-sunglasses fa-3x"></i>
                                            <Card.Title>VACACIONES</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="Cardsrow w-50">
                                    <Card className="col-sm" id="CardFestivos" onClick={handleShowFormulario}>  
                                        <Card.Body className="text-center">
                                            <i class="bi bi-calendar-check fa-3x"></i>
                                            <Card.Title>FESTIVOS</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="Cardsrow w-50 p-3">
                                    <Card className="col-sm" id="CardOtros" onClick={handleShowFormulario}>
                                        <Card.Body className="text-center">
                                            <i class="bi bi-clipboard-pulse fa-3x"></i>
                                            <Card.Title>OTROS</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="Cardsrow w-50 p-3">
                                    <Card className="col-sm" id="CardNoJustificados" onClick={handleShowFormulario}>
                                        <Card.Body className="text-center">
                                            <i class="bi bi-calendar-x fa-3x"></i>
                                            <Card.Title><h6>NO JUSTIFICADOS</h6></Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Row>
                        </Modal.Body>
                            
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal>
                    {/* ------ fin: Menu de Categorias ------ */}

                    {/* ------ inicio: Formulario ------ */}
                    <Modal show={showformulario} size="lg">
                        <Modal.Header>
                            <Modal.Title className="text-center">VACACIONES</Modal.Title>
                            <Button variant="outline-success" onClick={handleCloseFormulario}><i class="bi bi-arrow-left-circle"></i></Button>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Nombre de Ausencia: </Form.Label>
                                        <Form.Control type="text" placeholder="Escribe un Nombre" size="sm"></Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>ID de Ausencia: </Form.Label>
                                        <Form.Control type="text" placeholder="Escribe un id de Ausencia" size="sm"></Form.Control>
                                    </Form.Group>

                                    <Button >PRUEBA</Button>
                                    <Form.Group className="pt-3 hide">
                                        <Form.Label>Asigna Color</Form.Label>
                                        
                                        <Container>
                                            <div className="row">
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"   
                                                        id="no_visible"                                          
                                                    />
                                                    <label id="color1" className="tamColor color1"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color2" className="tamColor color2"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color3" className="tamColor color3"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color4" className="tamColor color4"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color5" className="tamColor color5"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color6" className="tamColor color6"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color7" className="tamColor color7"></label>
                                                </Col> 
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color8" className="tamColor color8"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color9" className="tamColor color9"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color10" className="tamColor color10"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color11" className="tamColor color11"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color12" className="tamColor color12"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color13" className="tamColor color13"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color14" className="tamColor color14"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color15" className="tamColor color15"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color16" className="tamColor color16"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color17" className="tamColor color17"></label>
                                                </Col>                                                    
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color18" className="tamColor color18"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color19" className="tamColor color19"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color20" className="tamColor color20"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                    />
                                                    <label id="color21" className="tamColor color21"></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check 
                                                        type="radio"
                                                        id="no_visible" 
                                                        className="marco"
                                                    />
                                                    <label id="color22" className="tamColor color22"></label>
                                                </Col>
                                            </div>
                                        </Container>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Icono</Form.Label>
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <Form.Check
                                                        type="radio"   
                                                        id="no_visible"
                                                    />
                                                    <label className="tamIcono color13"><span class="mif-tag mif-3x fg-white"></span></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check
                                                        type="radio"   
                                                        id="no_visible"
                                                    />
                                                    <label className="tamIcono color13"><span class="mif-tag mif-3x fg-white"></span></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check
                                                        type="radio"   
                                                        id="no_visible"
                                                    />
                                                    <label className="tamIcono color13"><span class="mif-tag mif-3x fg-white"></span></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check
                                                        type="radio"   
                                                        id="no_visible"
                                                    />
                                                    <label className="tamIcono color13"><span class="mif-tag mif-3x fg-white"></span></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check
                                                        type="radio"   
                                                        id="no_visible"
                                                    />
                                                    <label className="tamIcono color13"><span class="mif-tag mif-3x fg-white"></span></label>
                                                </Col>
                                                <Col>
                                                    <Form.Check
                                                        type="radio"   
                                                        id="no_visible"
                                                    />
                                                    <label className="tamIcono color13"><span class="mif-tag mif-3x fg-white"></span></label>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Form.Group>
                                        

                                    <Form.Group className="pt-3">
                                        <Form.Label>Unidad de Tiempo</Form.Label>
                                            <Row>
                                                <div className="col-lg-3">
                                                    <Form.Check
                                                        type="radio"
                                                        label="Días Hábiles"
                                                    />
                                                </div>
                                                <div className="col-lg-3">
                                                    <Form.Check
                                                        type="radio"
                                                        label="Días naturales"
                                                    />
                                                </div>
                                            </Row>
                                    </Form.Group>

                                    <Form.Group className="pt-3">
                                        <Form.Check
                                            type="switch"
                                            label="N° maximo de días disponibles"
                                            
                                        />
                                        <Form.Control type="number" placeholder="0" size="sm"></Form.Control>
                                    </Form.Group>

                                    <Form.Group className="pt-3">
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <Form.Select size="sm"></Form.Select>
                                                </Col>
                                                <Col>
                                                    <Form.Control type="number" placeholder="0" size="sm"></Form.Control>
                                                </Col>
                                                <Col>
                                                    <Form.Select size="sm"></Form.Select>
                                                </Col>
                                            </Row>
                                        </Container>    
                                    </Form.Group>

                                    <Form.Group className="pt-3">
                                        <Form.Check
                                            type="switch"
                                            label="Nº de veces que se puede realizar la solicitud"
                                            
                                        />
                                        <Form.Control type="number" placeholder="0" size="sm"></Form.Control>
                                    </Form.Group>

                                    <Form.Group className="pt-5">
                                        <h5>Configuración ciclo año laboral.</h5>
                                        <Container>
                                            <Row className="pt-3">
                                                <Col>
                                                    <Form.Select size="sm"></Form.Select>
                                                </Col>
                                                <Col>
                                                    <Form.Select size="sm"></Form.Select>
                                                </Col>
                                                <Col>
                                                    <Form.Select size="sm"></Form.Select>
                                                </Col>

                                                <Form.Check
                                                    type="switch"
                                                    label="Primer Devengo Prorreateado"
                                                    className="pt-4"
                                                />
                                            </Row>
                                        </Container>
                                    </Form.Group>

                                    <Form.Group className="pt-5">
                                        <h5>Reglas de Acumulación.</h5>
                                        <Container>
                                            <Row>
                                                <Col className="col-lg-3">
                                                    <Form.Check
                                                        type="radio"
                                                        label="Al inicio"
                                                    />
                                                </Col>
                                                <Col className="col-lg-3">
                                                    <Form.Check
                                                        type="radio"
                                                        label="Al final"
                                                    />
                                                </Col>
                                            </Row>
                                        </Container>

                                        <Container className="pt-3">
                                            <Row>
                                                <Col>
                                                    <Form.Label>Días Adicionales</Form.Label>
                                                    <Form.Select className="w-50" size="sm"></Form.Select>
                                                </Col>
                                                <Col>
                                                    <Form.Label>Antiguedad</Form.Label>
                                                    <Form.Select className="w-50" size="sm"></Form.Select>
                                                </Col>
                                                <Col>
                                                    
                                                    <Button></Button>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Form.Group>

                                    <Form.Group className="pt-5">
                                        <h5>Reglas de Solicitud</h5>
                                        <Container>
                                            <Row>
                                                <Form.Check
                                                    type="switch"
                                                    label="Permitir solicitar ausencia en fechas pasadas."
                                                />
                                            </Row>
                                            <Row>
                                                <small>Los usuarios administradores siempre podrán registrar ausencias en fechas pasadas</small>
                                            </Row>
                                            <Row>
                                                <Form.Check
                                                    type="switch"
                                                    label="Permitir solicitar vacaciones anticipadas del siguiente ciclo laboral."
                                                />
                                            </Row>
                                        </Container>
                                    </Form.Group>

                                    <Form.Group className="pt-4">
                                        <h5>Reglas de Estado y Activacion.</h5>
                                        <Container>
                                            <Form.Check
                                                type="switch"
                                                label="Estado."
                                            />
                                            <Row className="pt-3">
                                                <Col>
                                                    <Form.Label>Fecha Activación</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        size="sm"
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Label>Fecha Activación</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        size="sm"
                                                    />
                                                </Col>
                                            </Row>                                
                                        </Container>
                                    </Form.Group>

                                    <Form.Group>
                                        <h5>Asignación de ausencia</h5>
                                        <Row>
                                            <Col>
                                                <Form.Label>Tipo de Grupo</Form.Label>
                                                <Form.Select id="catGrupo" onChange={FiltroSubGrupo}  size="sm">
                                                </Form.Select>
                                            </Col>
                                            <Col>
                                                <Form.Label>Tipo de SubGrupo:</Form.Label>
                                                <Form.Select id="catSubGrupo"  size="sm" placeholder="Selecciona una Opcion" disabled>
                                                    <option>Seleccione una Opcion</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                </Form>
                            </Row>
                        </Modal.Body>
                    </Modal>
                    {/* ------ fin: Formulario para Categorias ------ */}

                    {/* ------ inicio: Tabla ------ */}
                    <Container className="mt-4">
                        <Row>
                            <Table className="table table-striped table-bordered" id="datosAusencias">
                                <thead>
                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">Ausencia</th>
                                        <th className="text-center">Categoria</th>
                                        <th className="text-center">Fecha Activacion</th>
                                        <th className="text-center">Fecha Finalizacion</th>
                                        <th className="text-center">Grupo</th>
                                        <th className="text-center">Tipo</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row) => (
                                        <tr key={row.id}>
                                            <td className="text-center">{row.id}</td>
                                            <td className="text-center">{row.Nombre}</td>
                                            <td className="text-center">{row.Categoria}</td>
                                            <td className="text-center">{formatDate(row.FechaActivacion)}</td>
                                            <td className="text-center">{formatDate(row.FechaFinalizacion)}</td>
                                            <td className="text-center">{row.IdGrupo}</td>
                                            <td className="text-center">{row.IdElementoGrupo}</td>
                                            <td className="text-center">
                                                <Form>
                                                    <Form.Check
                                                        type="switch"
                                                    />
                                                </Form>
                                            </td>
                                            <td className="text-center">
                                                <Dropdown>
                                                    <Dropdown.Toggle className="dark" size="sm"></Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#">Editar</Dropdown.Item>
                                                        <Dropdown.Item href="#">Eliminar</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Container>
                    {/* ------ fin: Tabla ------ */}

                </Tab>
            </Tabs>
        </Container>
        
    )
    
}
