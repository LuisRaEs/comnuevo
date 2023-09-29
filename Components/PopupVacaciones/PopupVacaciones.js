import React from "react";

const PopupVacaciones = () => {
  const [showVacaciones, setShowVacaciones] = useState(false);

  const handleCloseVacaciones = () => setShowVacaciones(false);
  const handleShowVacaciones = async () => {
    setShowVacaciones(true);
  };

  return (
    <Modal show={showVacaciones} onHide={handleCloseVacaciones}>
      <Modal.Header closeButton>
        <Modal.Title>Solicitud de Vacaciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="d-flex gap-2">
            <h5 className="">Aprobador:</h5>
            <p>Ricardo Ruiz</p>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex gap-2 ">
            <h5>Dias a los que tengo derecho en este periodo:</h5>
            <p>5 Días</p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex gap-2 justify-content-center">
            <p className="bold">Fechas Inicio</p>
            <p>09-06-2023</p>
          </Col>
          <Col className="d-flex gap-2 justify-content-center">
            <p className="bold">Fechas Fin</p>
            <p>15-06-2023</p>
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
            <p></p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className="text-center">Observaciones</h5>
            <p></p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupVacaciones;
