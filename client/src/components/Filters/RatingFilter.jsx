import React , {useState} from 'react'
import { filterRating } from '../../actions'
import { useDispatch  } from 'react-redux'


export default function IdFilter({setCurrentPage}){

    const [orden, setOrden] = useState("") 

    const dispatch = useDispatch()

 //----------SELECT PARA ELEGIR SI FILTRAR ASC O DESC--------------
 function handleFilterRating(e) {
    e.preventDefault()
    dispatch(filterRating(e.target.value))
    setCurrentPage(1); //Cuardo ordeno mostrame la primera pagina
    setOrden(e.target.value)
}

    return(
        <div>
            <select onChange = {(e) => handleFilterRating(e)} >
                <option value="best">Mejor rating</option>
                <option value="worst">Peor rating</option>
            </select>
        </div>
    )
}