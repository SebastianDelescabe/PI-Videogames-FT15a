import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterBd } from '../../actions'
import styleFilter from './Filters.module.css'

export default function DbFilter() {
    const dispatch = useDispatch()

    const [checkBd, setCheckBd] = useState(true)

    function handleCheck(e) {
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
            <input className={styleFilter.input} onChange={(e) => handleCheck(e)} type="checkbox" value={checkBd} />
            <label className={styleFilter.label}  >Games Created</label>
        </div>
    )

}