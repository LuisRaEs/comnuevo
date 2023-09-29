'use client'
import "./LoginContainer.css"
import { useEffect , useState } from "react"
import { useSelector , useDispatch } from "react-redux"
import en from "@/public/diccionarios/en.js"
import es from "@/public/diccionarios/es.js"
import LoginLogo from "../LoginLogo/LoginLogo"
import Input from "../Input/Input"
import fetchSesion from "@/public/store/slices/sesion/fetchSesion"
import Boton from "../Boton/Boton"

export default function LoginContainer() {
    const dispatch = useDispatch()
    let lang = useSelector(state=>state.sesion.lang)
    const [t,setT] = useState(es)
    const [user,setUser] = useState({id:"",pass:""})


    const handleChange = (e)=>{
        setUser((state)=>{return {...state, [e.target.id] : e.target.value}})
    }
    const handleSubmit = ()=>{
        dispatch(fetchSesion(user))
    }

    useEffect(()=>{
        lang === "es" ? setT(()=>es) : setT(()=>en)
    },[lang])


    return (
        <div id="loginContainer">
            <div id ="loginLogoContainer" >
                <LoginLogo />
            </div>
            <div id="loginInputsContainer">
                <Input
                    id="id"
                    label= {t["login_loginContainer_userInputIndicator"]}
                    type="text"
                    value = {user.id}
                    handleChange={handleChange}
                />
                <Input
                    id="pass"
                    label= {t["login_loginContainer_passwordInputIndicator"]}
                    type="password"
                    value = {user.pass}
                    handleChange={handleChange}
                />
                <div id="btnlogincontainer">
                    <Boton
                        handleClick={handleSubmit}
                        text = {t["login_loginContainer_passwordButtonSend"]}
                    />
                </div>
                
            </div>
        </div>
    )
}
