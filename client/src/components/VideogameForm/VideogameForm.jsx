import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getGenres, getPlatforms, postVideogame } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import styleForm from './VideogameForm.module.css'


function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Se requiere nombre"
    }
    if (!input.description) {
        errors.description = "Debe completar la descripcion"
    }
    if (!input.rating || input.rating > 5 || input.rating < 0) {
        errors.rating = "Rating de 0 al 5"
    }
    if(!input.released){
        errors.released = "Ingresar fecha"
    }else if(!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(input.released)){
        errors.released = "ingresar formato valido"
    }else{
        errors.released = ""
    }
    if (input.platforms.length < 1) {
        errors.platforms = "Ingresar plataformas"
    }else{
        errors.platforms = ""
    }
    if (input.genres < 1) {
        errors.genres = "Ingresar generos"
    }else{
        errors.platforms = ""
    }
    return errors
}


export default function CharacterForm() {
    const dispatch = useDispatch()
    const history = useHistory()

    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)


    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        background_image: "",
        genres: [],
        platforms: []
    })



    //----------Inputs---------
    function handleInputChange(e) {
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    //-----Select genres----
    function handleGenreSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.genres]: e.target.value
        }))
    }
    //-----Select platfroms----
    function handlePlatformsSelect(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.platforms]: e.target.value
        }))
    }

    //---------Send form--------
    function handleSubmit(e) {
        if (input.name === "") {
            e.preventDefault()
            alert("Completar correctamente el formulario")
        } else {
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
                genres: [],
                platforms: []
            })
            history.push('/home')
        }
    }

    //---------Delete genres---------
    function handleGenreDelete(el) {
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== el)
        })
    }

    //---------Delete platforms--------
    function handlePlatformDelete(el) {
        setInput({
            ...input,
            platforms: input.platforms.filter(platform => platform !== el)
        })
    }

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms())

    }, [dispatch]);




    return (
        <div>
            <h1 className={styleForm.h1}>Formulario videojuegos</h1>
            <form className={styleForm.form} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className={styleForm.label}>Nombre:</label>
                    <input
                        className={styleForm.inputs}
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.name && (
                            <p className={styleForm.danger}> {errors.name} </p>
                        )
                    }
                </div>

                <div>
                    <label className={styleForm.label}>Rating:</label>
                    <input
                        className={styleForm.inputs}
                        type="number"
                        name="rating"
                        value={input.rating}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.rating && (
                            <div className={styleForm.danger} > {errors.rating} </div>
                        )
                    }
                </div>

                <div>
                    <label className={styleForm.label}>Fecha de lanzamiento:</label>
                    <input
                        className={styleForm.inputs}
                        type="text"
                        value={input.released}
                        name="released"
                        onChange={(e) => handleInputChange(e)}
                    />
                                        {
                        errors.released && (
                            <div className={styleForm.danger} > {errors.released} </div>
                        )
                    }
                </div>

                <div >
                    <label className={styleForm.label} >Imagen:</label>
                    <input
                        className={styleForm.inputImage}
                        type="url"
                        name="background_image"
                        value={input.background_image}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div>
                    <label className={styleForm.label} >Descripcion:</label>
                    <textarea
                        type="text"
                        value={input.inputDescription}
                        name="description"
                        onChange={(e) => handleInputChange(e)}
                        rows="10" cols="50"
                    />
                    {
                        errors.description && (
                            <p className={styleForm.danger} > {errors.description} </p>
                        )
                    }
                </div>

                <div className={styleForm.platforms} >
                    <label className={styleForm.labelPlatforms} >Plataformas:</label>
                    <select onChange={(e) => handlePlatformsSelect(e)}>
                        {
                            platforms.map((e) => (
                                <option value={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                    {input.platforms.map(e => (
                        <div>
                            <li className = {styleForm.li}>{e}<button
                                className={styleForm.buttonClose}
                                type="button"
                                onClick={() => handlePlatformDelete(e)}
                            >X</button>
                            </li>
                        </div>
                    ))}
                    {
                        errors.platforms && (
                            <p className={styleForm.danger} > {errors.platforms} </p>
                        )
                    }
                </div >

                <div className={styleForm.genres}>
                    <label className={styleForm.labelGenre} >Generos:</label>
                    <select onChange={(e) => handleGenreSelect(e)}>
                        {
                            genres.map((e) => (
                                <option value={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                    <ul>
                        {input.genres.map(e => (
                            <div>
                                <li className = {styleForm.li}>{e}<button
                                    className={styleForm.buttonClose}
                                    type="button"
                                    onClick={() => handleGenreDelete(e)}
                                >X</button>
                                </li>
                            </div>
                        ))}
                    </ul>
                    {
                        errors.genres && (
                            <p className={styleForm.danger} > {errors.genres} </p>
                        )
                    }
                </div>
                {
                    errors && (errors.name || errors.rating || errors.description || errors.genres || errors.platforms) ? <p className={styleForm.buttonDanger} >Completar formulario</p>
                        :
                        <button
                            type="submit"
                            className={styleForm.button}
                        >Agregar videojuego
                        </button>
                }
            </form>
            <Link to="/home">
                <button className={styleForm.buttonVolver}>Volver a Home</button>
            </Link>
        </div>
    )
}