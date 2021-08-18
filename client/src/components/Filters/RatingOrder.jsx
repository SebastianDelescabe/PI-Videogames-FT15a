import React from 'react'
import { useDispatch } from 'react-redux'
import { filterRating, filterNameOrder } from '../../actions'

export default function RatingFilter() {

    const dispatch = useDispatch()

    function handleFilterRating(e) {
        e.preventDefault()
        if (e.target.value === "best" || e.target.value === "worst") {
            dispatch(filterRating(e.target.value))
        } else {
            dispatch(filterNameOrder(e.target.value))
        }
    }

    return (
        <div>
            <select onChange={(e) => handleFilterRating(e)} >
                <option value="best">Best Rating</option>
                <option value="worst">Worst rating</option>
            </select>
            <select onChange={(e) => handleFilterRating(e)} >
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
        </div>
    )

}
