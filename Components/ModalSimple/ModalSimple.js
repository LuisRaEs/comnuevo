'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalSimple({title,body,btnText,state,handleClick,handleHide}) {
    
  return (
    <Modal centered show={state} size="xlg" onHide={() =>{handleHide?handleClick():""}}>
        <Modal.Header>
          <Modal.Title style={{display:"flex",justifyContent:"center",width:"100%"}}>{title ?? ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display:"flex",justifyContent:"center",width:"100%"}}>{body ?? ""}</Modal.Body>
        <Modal.Footer>
          <Button key={new Date()} className="me-2 mb-2" onClick={() =>{handleClick?handleClick():""}}>
            {btnText??""}
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
