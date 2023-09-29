import { useDispatch } from "react-redux"
import { useState , useEffect} from "react"
import { Form } from "react-bootstrap"
import { addError , removeError } from "@/public/store/slices/sesion/sesion"

export default function InputTextArea({id,label,controlled,placeHolder,inputWidth,style,regex, title,state,setState, disabled}) {
    let chkControlled = controlled && (controlled == true || controlled == "true") ? true : false
    let chkDisabled = disabled && (disabled == true || disabled == "true") ? true : false
    const dispatch = useDispatch()
    const [pass,setPass] = useState(false)
    useEffect(()=>{
        if(!chkDisabled)
        {
            if(chkControlled)
            {
                if(state [id] == null || (regex && !regex.test(String(state[id]))))
                {
                    dispatch(addError(id))
                }else
                    setPass(true)
                
            }
        }else{
            dispatch(removeError(id))
        }

        return ()=>{
            dispatch(removeError(id))
        }
    },[chkDisabled])

    const handleChange = (e)=>{
        setState(oldState=>{return{...oldState,[e.target.name]:e.target.value }})

        if(regex && !regex.test(e.target.value))
        {
            setPass(false)
            dispatch(addError(id))
        }
        else
        {
            
            setPass(true)
            dispatch(removeError(id))
        }

    }

    return(
        <Form.Group className="mb-3" style={style??{width:inputWidth ?? "100%",margin:"0 auto"}}>

        {label ? <Form.Label style={{display:"flex",gap:"10px"}}>
            {label}
            {!chkDisabled?( title ? <i className="bi bi-question-circle" title={`${title??""}`}/>:""):"" }
        
        </Form.Label> : "" }
        
        <Form.Control 
            disabled ={chkDisabled}
            id = {id} 
            name = {id}
            as = "textarea" 
            placeholder = {!chkDisabled?(placeHolder ?? ""):""}
            value = {!chkDisabled?(state[id] == null?"":state[id]):""}
            onChange ={ e=>{
                    handleChange(e)
                }
            }
            style = {!chkDisabled?(chkControlled ? {boxShadow: `0px 0px 5px 5px  ${pass ? "rgba(0,255,0,0.5)":"rgba(255,0,0,0.5)"}`} : undefined):undefined}
            
        />
    </Form.Group>
    )
}
