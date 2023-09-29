import en from "../diccionarios/en";
import es from "../diccionarios/es";

export default function selectLanguage(lang){
    switch(lang)
    {
        case "es":
            return es
        case "en":
            return en
        default:
            return es
    }
}