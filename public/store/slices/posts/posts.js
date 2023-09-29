import { createSlice } from "@reduxjs/toolkit";

let initialPosts = [
    {
        id: "0",
        user: {
            id: "1",
            username: "Ricardo Ruiz",
            userImg: "https://cdn.pixabay.com/photo/2023/08/15/05/37/lighthouse-8191282_1280.jpg"
        },
        status: "1",
        content:"Somos Hound Express: !Feliz Cumpleaños a todos los Cumpleañeros de Agosto",
        files:[],
        images:[],
        videos:[],
        reactions:{
            likes:"20",
            recommendations:"1"
        },
        comments:[]
    },
    {
        id: "1",
        user: {
            id: "1",
            username: "Ricardo Ruiz",
            userImg: "https://cdn.pixabay.com/photo/2023/08/15/05/37/lighthouse-8191282_1280.jpg"
        },
        status: "1",
        content:"Menu de la semana",
        files:[],
        images:[],
        videos:[],
        reactions:{
            likes:"100",
            recommendations:"50"
        },
        comments:[
            {
                content:"Abrá algun dá en especial???",
                userImg: "url",
                username: "",
                userID: "",
                userRol: "",
                timePost: "10",
                timeUnits: "horas"
            }
        ]
    },
    {
        id: "2",
        user: {
            id: "1",
            username: "Ricardo Ruiz",
            userImg: "https://cdn.pixabay.com/photo/2023/08/15/05/37/lighthouse-8191282_1280.jpg"
        },
        status: "1",
        content:"Comunicado especial",
        files:[],
        images:[],
        videos:[],
        reactions:{
            likes:"233",
            recommendations:"46"
        },
        comments:[
            {
                content:"Entendido",
                userImg: "https://cdn.pixabay.com/photo/2023/09/04/16/21/spider-8233129_1280.jpg",
                username: "Jorge Jimenez",
                userID: "",
                userRol: "",
                timePost: "10",
                timeUnits: "horas"
            },
            {
                content:"Entendido",
                userImg: "https://cdn.pixabay.com/photo/2023/09/10/05/40/motmot-8244307_1280.jpg",
                username: "Pancho Lopez",
                userID: "",
                userRol: "",
                timePost: "5",
                timeUnits: "minutos"
            }
        ]

    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialPosts ?? {},
    reducers: {
        createPost:(state,action)=>{
            let newPost = {
                id: state.length,
                user: action.payload.user,
                status: "1",
                content: action.payload.content?? "",
                files: action.payload.files ?? [],
                images: action.payload.images ?? [],
                videos: action.payload.videos ?? [],
                reactions:{
                    likes:"0",
                    recommendations:"0"
                },
                coments:[]
            }
            return [newPost,...state]
        },
        changePostStatus:(state,action)=>{
            let selectedPost = state.find(el=>{
                if (el.id === action.payload.id)
                    return {...el}
            })
            selectedPost.status = state.status === "1" ? "0" : "1"

            let newState = state.filter(el=>{
                if (el.id !== action.payload.id)
                    return {...el}
            })

            return [...newState,selectedPost]
        },
        editPost:(state,action)=>{
            let selectedPost = state.find(el=>el.id === action.payload.id)

           for(key in selectedPost){
                if(action.payload[key])
                    selectedPost[key] = action.payload[key]
            }

            let newState = state.filter(el=>el.id !== action.payload.id)
    
            return [...newState,selectedPost]
        }
    }
})

export const {createPost,changePostStatus,editPost} = postsSlice.actions;
export const posts = postsSlice.reducer;