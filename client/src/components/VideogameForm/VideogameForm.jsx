import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getGenres, postVideogame } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';


function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Se requiere Nombre"
    } else if (!input.description) {
        errors.description = "Debe completar la descripcion"
    } else if (!input.rating || input.rating > 5 || input.rating < 0) {
        errors.rating = "Rating de 0 al 5"
    }
    return errors
}


export default function CharacterForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)


    const [input, setInput] = useState({
        name: "",
        description: "",
        platforms: "",
        released: "",
        rating: "",
        background_image: "",
        genres: []
    })


    const [errors, setErrors] = useState({})
  
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    function handleSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }


    function handleSubmit(e) {
        if(input.name === ""){
            e.preventDefault()
            alert("Completar correctamente el formulario")
        }else{
            e.preventDefault();
            dispatch(postVideogame(input))
            alert("Videojuego Creado!!")
            setInput({
                name: "",
                description: "",
                platforms: "",
                released: "",
                rating: "",
                background_image: "",
                genres: []
            })
            history.push('/home')
        }
    }

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crear Videojuego!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.name && (
                            <p> {errors.name} </p>
                        )
                    }
                </div>
                <div>
                    <label>descripcion:</label>
                    <textarea
                        type="text"
                        value={input.description}
                        name="description"
                        onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.description && (
                            <p> {errors.description} </p>

                        )
                    }
                </div>
                <div>
                    <label>Plataformas:</label>
                    <input
                        type="text"
                        value={input.platforms}
                        name="platforms"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Fecha de lanzamiento:</label>
                    <input
                        type="date"
                        value={input.released}
                        name="released"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={input.rating}
                        onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.rating && (
                            <p> {errors.rating} </p>
                        )
                    }
                </div>
                <div>
                    <label>imagen:</label>
                    <input
                        type="url"
                        name="background_image"
                        value={input.background_image}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <select onChange={(e) => handleSelect(e)}>
                        {genres.map((e) => (
                            <option value={e.name}> {e.name} </option>
                        ))}
                    </select>
                    <p>{input.genres.map(e => e + ",")}</p>
                </div>
                {
                    errors && errors.name || errors.rating || errors.description ? <p>Completar Formulario</p>
                    :
                    <button onSubmit={(e) => handleSubmit(e)} type="submit">Crear Personaje</button>
                }
            </form>
        </div>
    )
}