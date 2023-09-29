'use client'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useSelector , useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import "./InputPost.css"

export default function InputPost() {
    return (
        <div id="InputPostContainer">
            <Form.Control 
                as="textarea" 
                aria-label="With textarea" 
                placeholder="New Post" 
                style={{height:"150px",borderRadius:"20px", width: "90%"}}/>
            <div id="addBar">
                <i className="bi bi-card-image"></i>
                <i className="bi bi-camera-reels"></i>
                <div id="btnCont">
                    <Button variant="primary" style={{width:"70%"}}>Publicar</Button>
                </div>
            </div>
            
        </div>
    )
}
