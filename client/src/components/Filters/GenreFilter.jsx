import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres } from '../../actions'
import { filterGenre } from '../../actions'

export default function GenreFilter(){

    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    function handleGenreFilter(e) { //Uso la accion que definimos en el action (filteredByStatus)
        dispatch(filterGenre(e.target.value))//e.target.value es el value del select, me pasa a la funcion el payload de acuerdo a lo que elija el usuario
        console.log(e.target.value)
    }

    return(
        <div>
            <select onChange={(e)=> handleGenreFilter(e)}>
                <option value= "all">All Genre</option>
                {
                    genres&&genres.map( e => (
                        <option value={e.name}> {e.name} </option>
                        
                    ))
                }
            </select>
        </div>
    )
}