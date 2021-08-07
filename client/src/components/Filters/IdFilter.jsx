import React from 'react'
import { filterId } from '../../actions'
import { useDispatch  } from 'react-redux'

export default function IdFilter(){

    const dispatch = useDispatch()

    function handleSelect (e){
        dispatch(filterId(e.target.value))
    }

    return(
        <div>
            <select onChange = {(e) => handleSelect(e)} >
                <option value="best">Mejor rating</option>
                <option value="worst">Peor rating</option>
            </select>
        </div>
    )
}