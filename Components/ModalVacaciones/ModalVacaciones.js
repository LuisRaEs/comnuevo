import { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { RegistroAusencia } from "../../public/community";
import { getLoginUsuario } from "@/public/store/slices/loginUsuario/loginUsuario";
import { useDispatch } from "react-redux";

const ModalVacaciones = ({
  showPopup,
  handleClosePopup,
  rangeDate,
  setRangeDate,
  vacaciones,
  dateFormat,
  usuario,
}) => {
  const dispatch = useDispatch();
  const diasSolicitados = (rangeDate[1] - rangeDate[0]) / (1000 * 60 * 60 * 24);
  const [motivo, setMotivo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const newVacacion = {
    SolicitadorID: usuario && usuario.SabuesoUser && usuario.SabuesoUser.ID,
    BeneficiadoID: usuario && usuario.SabuesoUser && usuario.SabuesoUser.ID,
    TipoDeAusenciaID: 3,
    FechaDeSolicitud: new Date(),
    FechaAprobada: null,
    FechaSolicitadaInicio: rangeDate[0],
    FechaSolicitadaFin: rangeDate[1],
    DiasSolicitados: diasSolicitados,
    AprobadoPorID: usuario && usuario.Responsable && usuario.Responsable.ID,
    Adjunto: [],
    GoceSueldo: true,
    Motivo: motivo,
    Observaciones: observaciones,
  };

  const postRegistroVacaciones = async () => {
    const nuevoRegistroVacaciones = new RegistroAusencia(newVacacion);
    await nuevoRegistroVacaciones.crear();

    setMotivo("");
    setObservaciones("");
    setRangeDate([null, null]);
    handleClosePopup("vacaciones");
    dispatch(getLoginUsuario());
  };

  return (
    <Modal
      show={showPopup.vacaciones}
      onHide={() => handleClosePopup("vacaciones")}
    >
      <Modal.Header closeButton>
        <Modal.Title>Solicitud de Vacaciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="d-flex gap-2">
            <h5 className="">Aprobador:</h5>
            <p>
              {usuario && usuario.Responsable && usuario.Responsable.Nombre}{" "}
              {usuario && usuario.Responsable && usuario.Responsable.Paterno}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex gap-2 ">
            <p className="bold">
              Días a los que tengo derecho en este periodo:
            </p>
            <p>{vacaciones && vacaciones.diasDisponibles} Días</p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex gap-2 ">
            <p className="bold">
              Días que disfrute con anterioridad en este periodo:
            </p>
            <p>{vacaciones && vacaciones.diasAprobados} Días</p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex gap-2 justify-content-center">
            <p className="bold">Fechas Inicio</p>
            <p>{rangeDate && dateFormat(rangeDate[0])}</p>
          </Col>
          <Col className="d-flex gap-2 justify-content-center">
            <p className="bold">Fechas Fin</p>
            <p>{rangeDate && dateFormat(rangeDate[1])}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className="text-center">Motivo</h5>
            <Form.Control
              type="text"
              onChange={(e) => setMotivo(e.target.value)}
              value={motivo}
              aria-describedby="text-motivo"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className="text-center">Observaciones</h5>
            <Form.Control
              type="text"
              onChange={(e) => setObservaciones(e.target.value)}
              value={observaciones}
              aria-describedby="text-observaciones"
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleClosePopup("vacaciones")}
        >
          Cerrar
        </Button>
        <Button variant="primary" onClick={postRegistroVacaciones}>
          Solicitar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalVacaciones;

/**
 * Solicitador: {},
    Beneficiado: {},
    TipoDeAusencia: {},
    FechaDeSolicitud: undefined,
    FechaAprobada: null,
    FechaSolicitadaInicio: undefined,
    FechaSolicitadaFin: undefined,
    DiasSolicitados: 0,
    AprobadoPor: {},
    Adjunto: [],
    GoceSueldo: false,
    Motivo: "",
    Observaciones: "",
    FechaRecuperadaInicio: null,
    FechaRecuperadaFin: null,
 */
