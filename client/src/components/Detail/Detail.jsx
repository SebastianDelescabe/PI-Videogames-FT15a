import React, { useEffect } from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { getDetail } from '../../actions'

export default function Detail(){
    
    const dispatch = useDispatch()
    const details = useSelector(state => state.detail)

    return(
        <div>
            <h1>SAPE</h1>
            <p> {details.description} </p>
        </div>
    )
}