import { Form } from "react-bootstrap"


export default function Input({id,label,type,placeHolder,handleChange,inputWidth}){
    return(
        <Form.Group className="mb-3" controlId={id} style={{width:inputWidth ?? "70%",margin:"0 auto"}}>
            {label ? <Form.Label>{label}</Form.Label> : "" }
            <Form.Control type={type} placeholder={placeHolder} onChange={e=>{handleChange(e)}}/>
        </Form.Group>
    )
}