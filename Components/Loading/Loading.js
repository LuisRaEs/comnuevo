import "./Loading.css"
import Spinner from 'react-bootstrap/Spinner'

export default function Loading() {
  return (
    <div id="spinner">
        <Spinner className= "loadcircle" animation="grow" variant="primary" />
        <Spinner className= "loadcircle" animation="grow" variant="success" />
        <Spinner className= "loadcircle" animation="grow" variant="danger" />
        <Spinner className= "loadcircle" animation="grow" variant="warning" />
        <Spinner className= "loadcircle" animation="grow" variant="info" />
        <Spinner className= "loadcircle" animation="grow" variant="light" />
        <Spinner className= "loadcircle" animation="grow" variant="dark" />
        </div>
  )
}
