export const setJWT = jwt => sessionStorage.setItem('jwt', jwt );
export const getJWT = () => sessionStorage.getItem('jwt');
/*export const session = Object.freeze ({
    KEY_USUARIO_ACTUAL : "usuarioActual",
    KEY_JWT : "jwt",
    set : (key, value) => sessionStorage.setItem(key, utils.o2txt(value)),
    get : (key) => utils.txt2o(sessionStorage.getItem(key)),
    setUsuarioActual : o => session.set(session.KEY_USUARIO_ACTUAL, o),
    getUsuarioActual : () => session.get(session.KEY_USUARIO_ACTUAL),
    setJWT : jwt => session.set(session.KEY_JWT, jwt),
    getJWT : () => session.get(session.KEY_JWT),
})

export const utils = Object.freeze ({
    o2txt : o => JSON.stringify(o) ,
    txt2o : txt => JSON.parse(txt) ,
    s2b64 : txt => btoa(txt) ,
    b642s : txt => atob(txt) 
})
*/