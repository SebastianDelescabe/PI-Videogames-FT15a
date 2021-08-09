import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getGenres, postVideogame} from '../../actions'
import { useDispatch, useSelector } from 'react-redux';

export default function CharacterForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)
    
    
    //---ESTADO PARA GUARDAR DATOS DEL FORMULARIO---
    const [input, setInput] = useState({  //LE PASO COMO OBJETO LO QUE NECESITA EL POST!!
        name: "",
        description: "",
        platforms: "",
        released: "",
        rating:"",
        background_image:"",
        genres: []  //arreglo para poder meter muchas
    })
    
    
    console.log(input)
    //-------FUNCION PARA CONTROLAR INPUTS, !!! LA CLAVE ES PONER MUCHOS NAME PARA DESPUES MODIFICAR ESE NADA MAS!------
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value //EL NAME LO TIENENN TODAS LAS OPCIONES PARA QUE VARIE SEGUN CADA OPCION DE NAME EL E.TARGET.VALUE
        })
        console.log(input)
    }
    
    //-------FUNCION PARA CONTROLAR CHECKBOX-------
    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                status: e.target.value //es la misma logica que arriba solo que modifico el status
            })
        }
    }
    
    //-------FUNCION PARA CONTROLAR SELECT-------
    function handleSelect(e){
        setInput({
            ...input,
            genres:[...input.genres,e.target.value] //para guardar las ocupaciones, con el "...input.ocupation" traeme lo que habia y concatenale la nueva ocupacion con el e.target.value
        })
    }
    
    //-------FUNCION PARA CONTROLAR EL BOTON-------
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postVideogame(input))   //EJECUTO LA FUNCION DE LA ACCION QUE CREA EL FORMULARIO!!!!
        alert("Videojuego Creado!!")
        setInput({   //VUELVO A PONER EL STATUS VACIOOO
            name: "",
            description: "",
            platforms: "",
            released: "",
            rating:"",
            background_image:"",
            genres: []
        })
        history.push('/home')  //UNA VEZ CARGADO EL PERSONAJE ME REDIRIJE AL HOME
    }
    
    useEffect(() => {
        dispatch(getGenres());
    }, []);
    
    return (
        <div>
            <Link to= "/home"><button>Volver</button></Link> {/*Link para volver a la home*/}
            <h1>Crear Personaje!</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                        required
                        />
                </div>
                <div>
                    <label>descripcion:</label>
                    <input
                        type="text"
                        value={input.description}
                        name="description"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div>
                    <label>Plataformas:</label>
                    <input
                        type="text"
                        value={input.platforms}
                        name="platforms"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div>
                    <label>Fecha de lanzamiento:</label>
                    <input
                        type="date"
                        value={input.released}
                        name="released"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div>   {/**COMO HACER CHECKBOX */}
                    <label>rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={input.rating}
                        onChange= {(e) => handleChange(e)}
                        required
                    />
                </div>
                <div>   {/**COMO HACER CHECKBOX */}
                    <label>imagen:</label>
                    <input
                        type="url"
                        name="background_image"
                        value={input.background_image}
                        onChange= {(e) => handleChange(e)}
                        required
                    />
                </div>
                <div>
                    <select onChange = {(e) =>handleSelect(e)}>
                        {genres.map((e)=> (  //ES IMPORTANTE QUE EL MAP TENGA AQUI PARENTESIS EN VEZ DE LLAVES
                            <option value = {e.name}> {e.name} </option> //LA VARIABLE OCUPATIONS TIENE TODA LA INFO QUE TRAIGO DEL BACKEND, ACCEDO A ELLA COMO OBJETITO QUE ES
                        ))}
                    </select>
                    <ul><li> {input.genres.map(e => e + ",")}  </li></ul>  {/**Sirve para renderizar todo lo que vas seleccionando en el SELECT */}
                    <button  onSubmit = { (e) => handleSubmit(e)} type= "submit">Crear Personaje</button>
                </div>
            </form>
        </div>
    )
}