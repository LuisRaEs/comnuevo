'use client'
import { useSelector } from "react-redux"
import { useEffect } from "react"
import "./Centro.css"
import Publicacion from "@/Components/Publicacion/Publicacion"
import {Usuario} from "@/public/community.js"
import InputPost from "@/Components/InputPost/InputPost"

export default function Centro(){
    const posts = useSelector(state=>state.posts)
    var usuarios;
    useEffect(()=>{
        const cons = async()=>{
            let res = await Usuario.buscar({qwery:""})
            usuarios = res.Value
        }
        cons()
    },[])
    return(
        <div id="Centro">
            <InputPost/>
            <div id="postsContainer">
                {posts.map((el,i)=>{
                    if(el.status == "1") 
                    return (<Publicacion 
                        key = {i}
                        user = {el.user}
                        comments = {el.comments}
                        content = {el.content}
                        reactions = {el.reactions}
                        status = {el.status}
                        images = {el.images}
                        videos = {el.videos}
                    />)
                })}
            </div>
            
        </div>
    )
}