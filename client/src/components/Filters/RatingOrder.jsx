import React from 'react'
import { useDispatch } from 'react-redux'
import { filterRating, filterNameOrder } from '../../actions'
import styleFilter from './Filters.module.css'

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
        <div className= {styleFilter.flexDistance}>
            <div className={styleFilter.cajaRating}>
                <select className={styleFilter.selectRating} onChange={(e) => handleFilterRating(e)} >
                    <option value="best">Best rating</option>
                    <option value="worst">Worst rating</option>
                </select>
            </div>
            <div className={styleFilter.cajaOrder}>
                <select className={styleFilter.selectOrder} onChange={(e) => handleFilterRating(e)} >
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
        </div>
    )

}
