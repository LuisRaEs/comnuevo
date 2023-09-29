import { useState, useRef } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { ActionIcon, rem } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { RegistroAusencia } from "../../public/community";
import { getLoginUsuario } from "@/public/store/slices/loginUsuario/loginUsuario";
import { useDispatch } from "react-redux";

const ModalOtrasAusencias = ({
  showPopup,
  handleClosePopup,
  setRangeDate,
  rangeDate,
  dateFormat,
  usuario,
  leyenda,
}) => {
  const diasSolicitados = (rangeDate[1] - rangeDate[0]) / (1000 * 60 * 60 * 24);
  const [motivo, setMotivo] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const ref01 = useRef(null);
  const ref02 = useRef(null);

  const nuevoPermiso = {
    SolicitadorID: usuario && usuario.SabuesoUser && usuario.SabuesoUser.ID,
    BeneficiadoID: usuario && usuario.SabuesoUser && usuario.SabuesoUser.ID,
    TipoDeAusenciaID: 1,
    FechaDeSolicitud: new Date(),
    FechaAprobada: null,
    FechaSolicitadaInicio: rangeDate[0],
    FechaSolicitadaFin: rangeDate[1],
    DiasSolicitados: diasSolicitados,
    AprobadoPorID: usuario && usuario.Responsable && usuario.Responsable.ID,
    Adjunto: [],
    GoceSueldo: false,
    Motivo: motivo,
    Observaciones: observaciones,
  };

  const pickerControl01 = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref01.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const pickerControl02 = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref02.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const getTime = () => {
    const inicio = ref01.current.value;
    console.log(inicio);
  };
  console.log(leyenda);
  return (
    <Modal
      show={showPopup.otrasAusencias}
      onHide={() => handleClosePopup("otrasAusencias")}
    >
      <Modal.Header closeButton>
        <Modal.Title>Solicitud de Otras Ausencias</Modal.Title>
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
            <Form>
              <Form.Label>Tipo de ausencia</Form.Label>
              <Form.Select
                aria-label="Elige una opción..."
                defaultValue="Elige una opción"
              >
                <option>Elige una opción...</option>
                {leyenda &&
                  leyenda.map((a, i) => {
                    return <option key={i}>{a.Nombre}</option>;
                  })}
              </Form.Select>
            </Form>
          </Col>
        </Row>
        <h5 className="text-center mt-3">Tiempo del permiso</h5>
        <Row className="mt-3">
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
          <Col className="d-flex gap-2 justify-content-center">
            <p className="bold">Hora Inicio</p>
            <TimeInput label="" ref={ref01} rightSection={pickerControl01} />
          </Col>
          <Col className="d-flex gap-2 justify-content-center">
            <p className="bold">Hora fin</p>
            <TimeInput label="" ref={ref02} rightSection={pickerControl02} />
          </Col>
        </Row>
        <Row></Row>
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
          onClick={() => handleClosePopup("otrasAusencias")}
        >
          Cerrar
        </Button>
        <Button
          variant="primary"
          onClick={() => handleClosePopup("otrasAusencias")}
        >
          Solicitar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalOtrasAusencias;
