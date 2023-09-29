import React from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";

const ModalAusencias = ({
  showPopup,
  handleClosePopup,
  ausenciaPopup,
  dateFormat,
}) => {
  return (
    <Modal
      show={showPopup.ausencias}
      onHide={() => handleClosePopup("ausencias")}
    >
      <Modal.Header closeButton>
        <Modal.Title>Detalle de Ausencia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="d-flex gap-2">
            <h5 className="">Aprobador:</h5>
            <p>
              {ausenciaPopup &&
                ausenciaPopup.AprobadoPor &&
                ausenciaPopup.AprobadoPor.Nombre}{" "}
              {ausenciaPopup &&
                ausenciaPopup.AprobadoPor &&
                ausenciaPopup.AprobadoPor.Paterno}
            </p>
          </Col>
        </Row>
        <h5 className="text-center">Tiempo del Permiso</h5>
        <Row>
          <Col className="d-flex gap-4 justify-content-center">
            <p>
              {ausenciaPopup && ausenciaPopup.DiasSolicitados} Días requeridos,{" "}
            </p>
            <p>
              {ausenciaPopup && ausenciaPopup.GoceSueldo
                ? "Con goce de sueldo"
                : "Sin goce de sueldo"}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex gap-2 justify-content-center">
            <p className="bold">Fechas Inicio</p>
            <p>
              {ausenciaPopup && dateFormat(ausenciaPopup.FechaSolicitadaInicio)}
            </p>
          </Col>
          <Col className="d-flex gap-2 justify-content-center">
            <p className="bold">Fechas Fin</p>
            <p>
              {ausenciaPopup && dateFormat(ausenciaPopup.FechaSolicitadaInicio)}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex gap-2 justify-content-center">
            <p className="bold">Hora Inicio</p>
            <p>N/A</p>
          </Col>
          <Col className="d-flex gap-2 justify-content-center">
            <p className="bold">Hora fin</p>
            <p>N/A</p>
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col>
            <h5 className="text-center">Motivo</h5>
            <p>{ausenciaPopup && ausenciaPopup.Motivo}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className="text-center">Observaciones</h5>
            <p>{ausenciaPopup && ausenciaPopup.Observaciones}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleClosePopup("ausencias")}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAusencias;
