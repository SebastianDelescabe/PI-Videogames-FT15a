import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterBd } from '../../actions'

export default function DbFilter() {
    const dispatch = useDispatch()

    const [checkBd, setCheckBd] = useState(true)

    function handleCheck(e) {
        console.log(e.target.value)
        if (checkBd === false) {
            dispatch(filterBd(e.target.value))
            setCheckBd(true)
        } else {
            dispatch(filterBd(e.target.value))
            setCheckBd(false)
        }
    }

    return (
        <div>
            <input onChange={(e) => handleCheck(e)} type="checkbox" value={checkBd} />
            <label >Juegos creados</label>
        </div>
    )

}