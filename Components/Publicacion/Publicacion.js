"use client";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import "./Publicacion.css";
import Boton from "../Boton/Boton";
import img from "@/public/img/profile.jpg";
export default function Publicacion({
  user,
  comments,
  content,
  reactions,
  status,
  images,
  videos,
}) {
  const guardar = () => {
    alert("Se guardo el comentario");
  };
  return (
    <div id="Publicacion">
      <div id="postHeader">
        <Image
          src={img}
          width={40}
          height={40}
          alt="profile image"
          style={{ borderRadius: "50%" }}
        />
        <span>{user.username}</span>
      </div>
      <div id="postContent">{content}</div>
      <div id="reactionsContainer">
        <div className="rCont">
          <i className="bi bi-eye"></i>
          <span>{reactions.recommendations} Visualizaciones</span>
        </div>
        <div className="rCont">
          <i className="bi bi-hand-thumbs-up"></i>
          <span>{reactions.likes} Likes</span>
        </div>
        <div className="rCont">
          <i className="bi bi-chat-left"></i>
          <span>{comments.length} Comentarios</span>
        </div>
      </div>

      <Form.Control
        as="textarea"
        aria-label="With textarea"
        placeholder="Comment"
        style={{
          height: "70px",
          width: "90%",
          borderRadius: "20px",
          marginBottom: "20px",
        }}
      />
      <Boton identifier="guardar" handleClick={guardar} text="Comentar" />
    </div>
  );
}
