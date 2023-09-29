# Funcion de los Diccionarios con `i18n`

## Diseño de los diccionarios
Los diciconarios sirven para controlar los textos dentro de la aplicación.

En este diseño, se utilizan 2 diccionarios:

* Español (`es.js`)
* Inglés (`en.js`)


Dentro de cada archivo (`*.js`), se exporta un objeto de JavaScript (**JS**).

Este se compone de **KEYS** y **VALUES** de la forma:

```
    {
        KEY1 : VALUE1,
        KEY2 : VALUE2,
        .
        .
        .
        KEYn : VALUEn

    }
```


Para fines del proyecto las **KEYS** tendrán el formato:

```
    nombreDeLaRuta_nombreDelComponente_identificador
```


Donde:

* **nombreDeLaRuta**: Indica la carpeta (ruta/vista) dentro de la carpeta `app`, en la cual se va a utilizar el texto.
* **nombreDelComponente**: Indica el componente dentro de la vista en el cual se pinta el texto.
* **identificador**: Valor que distingue de las demas keys dentro de una misma vista.

Mientras que los **VALUES** corresponderán al texto escrito en el idioma correspondiente.

## Importación de los diccionarios

Para importar los diccionarios basta con incluir las siguientes lineas en la parte superior de la vista/ruta (archivo `page.js`):
```
    import en from "@/public/diccionarios/en.js"
    import es from "@/public/diccionarios/es.js"
```
De esta forma se crean las variables `en` y `es` respectivamente, lo cual permite acceder a los **VALUES** mediante las **KEYS** correspondientes.
```
    en.KEY1
    es.KEY1
```
## Obtencion del lenguaje habilitado

El lenguaje se guarda en la `store` en el apartado `sesion` en la propiedad `languaje`, para acceder a el se hace uso del **Hokk** `useSelector` de la forma:

```
    import { useSelector } from 'react-redux';

    export default function MiVista (){
        return(
            <htmlElement>{}</htmlElement>
        )
    }

```

## Ejemplo

Si app tiene la estructura:
```
    app
     |-Ruta1
     |-Ruta2
     |-Ruta3
```
Y dentro de la Ruta1, en el archivo '`page.js`', se tiene el componente `<Formulario/>` que internamente es:
```
    export default function Formulario(){
        return(
            <>
                <h1>{}</h1>
            </>
        )

    }
    
```
 
### Dentro del archivo '`es.js`'

```
    export default{

    }
```
