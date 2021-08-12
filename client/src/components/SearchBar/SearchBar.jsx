import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNameVideogame } from '../../actions'

export default function SearchBar() {

    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleInputChange(e) {
        setError(false)
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        dispatch(getNameVideogame(name))
            .then(response => {
                !response ? setError(true) : setError(false)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            {
                error && (
                    <p>Juego no encontrado</p>
                )
            }
            {
                loading && loading ? <p>Buscando...</p> : (
                    <input onChange={((e) => handleInputChange(e))} placeholder="Nombre..." type="text" />
                )
            }
            <button onClick={((e) => handleSubmit(e))} type="submit">Buscar</button>
        </div>
    )
}