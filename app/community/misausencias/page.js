"use client";
import "./misausencias.css";
import "../../../public/colores.css";
import {
  RegistroAusencia,
  Catalogo_Categoria,
  Ausencia,
  Usuario,
} from "../../../public/community";
import { useState, useEffect } from "react";
import { Container, Tab, Tabs, Table, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "dayjs/locale/es-mx";
import { DatePicker } from "@mantine/dates";
import Calendario from "@/Components/Calendario/Calendario";
import { getLoginUsuario } from "@/public/store/slices/loginUsuario/loginUsuario";
import ModalAusencias from "@/Components/ModalAusencias/ModalAusencias";
import ModalVacaciones from "@/Components/ModalVacaciones/ModalVacaciones";
import ModalOtrasAusencias from "@/Components/ModalOtrasAusencias/ModalOtrasAusencias";

export default function AusenciasControl() {
  const dispatch = useDispatch();

  const [tiposAusencia, setTiposAusencia] = useState([]);
  const [ausencias, setAusencias] = useState([]);
  const [ausenciaPopup, setAusenciaPopup] = useState({});
  const [usuario, setUsuario] = useState({});
  const [leyenda, setLeyenda] = useState([]);
  const [rangeDate, setRangeDate] = useState([null, null]);
  const [vacaciones, setVacaciones] = useState({
    diasTotales: 0,
    diasDisponibles: 0,
    diasAprobados: 0,
  });
  const [showPopup, setShowPopup] = useState({
    ausencias: false,
    vacaciones: false,
    otrasAusencias: false,
  });
  const currentYear = new Date().getFullYear();
  const usuarioCommunity = useSelector(
    (state) => state.loginUsuario.usuarioInfo
  );

  useEffect(() => {
    if (usuarioCommunity && !usuarioCommunity.ID) {
      dispatch(getLoginUsuario());
      console.log(usuarioCommunity);
    }

    if (usuarioCommunity && usuarioCommunity.ID) {
      buscarLoginUserVacaciones();
      buscarResumen();
    }
  }, [usuarioCommunity]);

  {
    /** Busca el historico de las ausencias del usuario */
  }
  const buscarResumen = async () => {
    const ausenciasUsuario = await RegistroAusencia.buscar({
      qwery: `beneficiado_id = '${usuarioCommunity.SabuesoUser.ID}'`,
    });

    const tiposAusenciasCatalogo = await Catalogo_Categoria.buscar({
      qwery: "",
    });

    const ausenciasConfig = await Ausencia.buscar({
      qwery: "",
    });

    setTiposAusencia(tiposAusenciasCatalogo.Value);
    setAusencias(ausenciasUsuario.Value);
    setLeyenda(ausenciasConfig.Value);
    console.log(ausenciasUsuario.Value);
  };

  {
    /** Busca los dias de vacaciones de LoginUser */
  }
  const buscarLoginUserVacaciones = async () => {
    setVacaciones((prevValue) => ({
      ...prevValue,
      diasTotales: usuarioCommunity.DiasDisponibles,
    }));
    setVacaciones((prevValue) => ({
      ...prevValue,
      diasDisponibles: usuarioCommunity.DiasRestantes,
    }));
    setVacaciones((prevValue) => ({
      ...prevValue,
      diasAprobados:
        usuarioCommunity.DiasDisponibles - usuarioCommunity.DiasRestantes,
    }));
  };

  {
    /** Cierra los Popups */
  }
  const handleClosePopup = (key) =>
    setShowPopup((prevValue) => ({ ...prevValue, [key]: false }));

  {
    /** Abre los Popups */
  }
  const handleOpenPopup = async ({ key, id }) => {
    if (key === "ausencias") {
      const data = await RegistroAusencia.buscar({
        qwery: `ID = ${id}`,
      });
      setAusenciaPopup(data.Value[0]);
    }

    setShowPopup((prevValue) => ({ ...prevValue, [key]: true }));
  };

  {
    /** Da formato a la fecha */
  }
  const dateFormat = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;

    return formattedDate;
  };

  {
    /** Asigna el nombre del tipo de ausencia segun el ID */
  }
  const ausenciaTypeFetcher = (id) => {
    const tipado = tiposAusencia.filter((t) => {
      return t.ID === id;
    });
    return tipado[0].Nombre;
  };

  return (
    <Container className="mt-4">
      {/* Modal general de Ausencias */}
      <ModalAusencias
        dateFormat={dateFormat}
        ausenciaPopup={ausenciaPopup}
        showPopup={showPopup}
        handleClosePopup={handleClosePopup}
      />
      {/* Modal de Vacaciones */}
      <ModalVacaciones
        showPopup={showPopup}
        handleClosePopup={handleClosePopup}
        rangeDate={rangeDate}
        setRangeDate={setRangeDate}
        vacaciones={vacaciones}
        dateFormat={dateFormat}
        usuario={usuarioCommunity}
      />
      {/* Modal de Otras Ausencias */}
      <ModalOtrasAusencias
        showPopup={showPopup}
        handleClosePopup={handleClosePopup}
        rangeDate={rangeDate}
        setRangeDate={setRangeDate}
        dateFormat={dateFormat}
        usuario={usuarioCommunity}
        leyenda={leyenda}
      />
      <Tabs defaultActiveKey="Resumen" id="ausencias-tab" className="mb-3">
        <Tab eventKey="Resumen" title="Resumen">
          <h3>Resumen de mis ausencias</h3>
          <Table className="text-center" bordered hover size="sm">
            <thead>
              <tr>
                <th>No.</th>
                <th>Tipo de Ausencia</th>
                <th>Fecha Solicitud</th>
                <th>Fecha Aprobada</th>
                <th>Fechas Solicitadas</th>
                <th>Días Solicitados</th>
                <th>Aprobado por</th>
                <th>Adjunto</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {ausencias &&
                ausencias.map((a, i) => {
                  return (
                    <tr key={a.ID}>
                      <td>{i + 1}</td>
                      <td>{ausenciaTypeFetcher(a.TipoDeAusenciaID)}</td>
                      <td>{dateFormat(a.FechaDeSolicitud)}</td>
                      <td>
                        {a.FechaAprobada == null
                          ? "En Revisión"
                          : dateFormat(a.FechaAprobada)}
                      </td>
                      <td>
                        {dateFormat(a.FechaSolicitadaInicio)}
                        {" al "}
                        {dateFormat(a.FechaSolicitadaFin)}
                      </td>
                      <td>{a.DiasSolicitados}</td>
                      <td>
                        {a.AprobadoPor.Nombre} {a.AprobadoPor.Paterno}
                      </td>
                      <td>
                        <Button className="btn-descarga">
                          <i className="fas fa-chevron-down"></i>
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() =>
                            handleOpenPopup({ key: "ausencias", id: a.ID })
                          }
                          className="btn-descarga"
                        >
                          <i className="fas fa-file"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="Vacaciones" title="Vacaciones">
          <Row>
            <Col className="d-flex justify-content-start">
              <h3>Mis Vacaciones</h3>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <h5 className="my-3">Vacaciones</h5>
              <div className="d-flex gap-2">
                <h5 className="mb-2">{vacaciones.diasTotales}</h5>
                <p className="mb-2"> Días totales</p>
              </div>
              <div className="d-flex gap-2">
                <h5 className="mb-2">{vacaciones.diasDisponibles}</h5>
                <p className="mb-2"> Disponibles</p>
              </div>
              <div className="d-flex gap-2">
                <h5 className="mb-2">{vacaciones.diasAprobados}</h5>
                <p className="mb-2"> Aprobados</p>
              </div>
              <div className="dot-line"></div>
              <div className="mt-3">
                <div className="d-flex mb-2">
                  <div className="color-box color13"></div>
                  <p className="mb-0">Dia Seleccionado</p>
                </div>
                {leyenda &&
                  leyenda.map((l) => {
                    return (
                      <div key={l.ID} className="d-flex mb-2">
                        <div
                          className={
                            "color-box " + "color" + l.Color.toString()
                          }
                        ></div>
                        <p className="mb-0">{l.Nombre}</p>
                      </div>
                    );
                  })}
              </div>
              <Button
                onClick={() => handleOpenPopup({ key: "vacaciones", id: null })}
                className="mt-3"
              >
                Solicitar
              </Button>
            </Col>
            <Col md={9} className="mb-5">
              <DatePicker
                type="range"
                defaultDate={new Date(currentYear, 0)}
                numberOfColumns={12}
                value={rangeDate}
                onChange={setRangeDate}
                locale="es-mx"
                allowSingleDateInRange
              />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="OtrasAusencias" title="Otras Ausencias">
          <Row>
            <Col className="d-flex justify-content-start">
              <h3> Mis Otras Ausencias</h3>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <h5 className="my-3">Otras Ausencias</h5>
              <div className="dot-line"></div>
              <div className="mt-3">
                <div className="d-flex mb-2">
                  <div className="color-box color13"></div>
                  <p className="mb-0">Día actual</p>
                </div>
                <div className="d-flex mb-2">
                  <div className="color-box color16"></div>
                  <p className="mb-0">Festivo</p>
                </div>
                <div className="d-flex mb-2">
                  <div className="color-box color18"></div>
                  <p className="mb-0">Otras ausencias</p>
                </div>
                <div className="d-flex mb-2">
                  <div className="color-box color20"></div>
                  <p className="mb-0">Pendiente de validar</p>
                </div>
                <div className="d-flex mb-2">
                  <div className="color-box color8"></div>
                  <p className="mb-0">
                    Festivos <span>{currentYear}</span>
                  </p>
                </div>
                <div className="d-flex mb-2">
                  <div className="color-box color2"></div>
                  <p className="mb-0">Festivo</p>
                </div>
              </div>
              <Button
                onClick={() =>
                  handleOpenPopup({ key: "otrasAusencias", id: null })
                }
                className="mt-3"
              >
                Solicitar
              </Button>
            </Col>
            <Col md={9} className="mb-5">
              <DatePicker
                type="range"
                defaultDate={new Date(currentYear, 0)}
                numberOfColumns={12}
                value={rangeDate}
                onChange={setRangeDate}
                locale="es-mx"
                allowSingleDateInRange
              />
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}
