import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterRating } from '../../actions'

export default function RatingFilter() {

    const dispatch = useDispatch()

    const [orden, setOrden] = useState("")

    function handleFilterRating(e) {
      e.preventDefault()
      dispatch(filterRating(e.target.value))
      setOrden(e.target.value)
    }

    return (
        <div>
            <select onChange={(e) => handleFilterRating(e)} >
                <option value="best">Mejor rating</option>
                <option value="worst">Peor rating</option>
                <option value = "default">Default</option>
            </select>
        </div>
    )

}
