import React from 'react'
import { useState} from 'react'
import { useDispatch } from 'react-redux'
import { getNameVideogame } from '../../actions'

export default function SearchBar() {

    const dispatch = useDispatch()

    const [name, setName] = useState("")

    //*MANJO DE ERROR INPUTTTTTT !!! QUE PASA SI NO TRAIGO NADA?  O COMO TRAIGO DE A POCO SIN EL BOTON?  */

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value) //e.target.value es lo que se va escribiendo en el imput ... se ira guardando en el setState
        console.log(name)
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getNameVideogame(name))
    }

    return (
        <div>
            <input onChange={((e) => handleInputChange(e))} placeholder="Nombre..." type="text" />
            <button onClick={((e) => handleSubmit(e))} type = "submit">Buscar</button>
        </div>
    )
}