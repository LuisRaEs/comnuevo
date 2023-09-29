'use client'
import { useState , useEffect } from "react"
import { useSelector , useDispatch } from "react-redux"
import mxFlag from "@/public/banderas/mx.svg"
import usFlag from "@/public/banderas/us.svg"
import Image from "next/image"
import "./LanguageSelector.css"
import { changeLang } from "@/public/store/slices/sesion/sesion"
import es from "@/public/diccionarios/es"
import en from "@/public/diccionarios/en"



export default function LanguajeSelector() {
    const lang = useSelector(state=>state.sesion.lang)
    const [selectedLang,setSelectedLang] = useState({});
    const [selecting,setSelecting] = useState(false);
    const [t,setT] = useState(es);
    const dispatch = useDispatch();
    
    const op = [
        {
            "key": "es",
            "lenguaje": t["LanguajeSelector_es"],
            "bandera": mxFlag
        },
        {
            "key": "en",
            "lenguaje": t["LanguajeSelector_en"],
            "bandera" : usFlag
        }]
    
    
    

    const handleSelection = (e)=>{
        let selection = op.filter(el=>el.key === e.target.attributes.name.value)[0]
        setSelectedLang(()=>selection)
        setSelecting(()=>false)
        e.target.attributes.name.value === "es" ? setT(()=>es) : setT(()=>en)
        dispatch(changeLang(selection.key))
    }

    useEffect(()=>{
        let l = lang ?? "es"
        let sel = op.filter(el=>el.key === l)[0]
        setSelectedLang(()=>sel) 
    },[lang])


    return (
    <div id="langSelector" onMouseLeave={()=>{setSelecting(state=>false)}}>
        <div id="langSelectedOption" onClick={()=>{setSelecting(state=>!state)}}> 
            <Image src={selectedLang.bandera||mxFlag}  width={40} height={25} alt={selectedLang.lenguaje??""}/>
            <span>{selectedLang.lenguaje}</span>
        </div>

        {
            selecting ? <div id= "allLanguages">
            {
                op.map(el=>{
                    return(
                        <div className="langOption" onClick={(e)=>{handleSelection(e)}} key={el.key}> 
                            <div className = "clickable" name={el.key}></div> 
                            <Image src={el.bandera}  width={40} height={25} alt={el.lenguaje}/>
                            <span>{el.lenguaje}</span>
                        </div>
                    )
                })
            }
            </div>
            :""
        }    
    </div>
  )
}

        