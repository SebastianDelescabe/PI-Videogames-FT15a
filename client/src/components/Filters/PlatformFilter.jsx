import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlatforms } from '../../actions'
import { filterPlatforms } from '../../actions'
import styleFilter from './Filters.module.css'

export default function PlatformFilter() {

    const dispatch = useDispatch()
    const platforms = useSelector(state => state.platforms)

    useEffect(() => {
        dispatch(getPlatforms())
    }, [dispatch])

    function handlePlatformFilter(e) { 
        dispatch(filterPlatforms(e.target.value))
    }

    return (
        <div className={styleFilter.caja}>
            <select className={styleFilter.select} onChange={(e) => handlePlatformFilter(e)}>
                <option value="all">All Platforms</option>
                {
                    platforms && platforms.map(e => (
                        <option key={e.name} value={e.name}> {e.name} </option>

                    ))
                }
            </select>
        </div>
    )
}