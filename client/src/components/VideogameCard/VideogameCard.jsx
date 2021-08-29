import React from 'react'
import { useDispatch } from 'react-redux'
import { Link} from 'react-router-dom'
import { deleteDbGame, getVideogames } from '../../actions'
import cardCss from './VideogameCard.module.css'

export default function VideogameCard({ name, img, genres, rating, id, createdDb }) {

    const dispatch = useDispatch()

    function handleDelete(e) {
        e.preventDefault()
        dispatch(deleteDbGame(id))
        dispatch(getVideogames())
            .then(() => {
                alert("juego borrado")
            })
    }

    return (
        <div className={cardCss.cnt}>
            <div className = {cardCss.h1btn}> 
                <Link to = {`/detail/${id}`} style={{ textDecoration: 'none' }} >
                    <h1 className={cardCss.h1}>{name}</h1>
                </Link>
                {
                    createdDb === true ? (
                        <button className={cardCss.btonClose} onClick={e => handleDelete(e)}>X</button>
                    )
                        : null
                }
            </div>
            <img src={img} alt="img not found" width="350" height="200" />
            <p className={cardCss.p}>{genres.map(e => e + " / ")}</p>
            <div className ={cardCss.div}>
            <img src="https://lh3.googleusercontent.com/proxy/62uscdg2-9h9xqvmz5nd1zeJgHbYk6PBdX2XrtLhGSHHtAx2HgAM6LOVDCHVzcmzomvNX3SIHKM8HAtJ-7FtbpukY-EfQnqYiAogNe94IHvJ1kX826gf7AkCiQ1671XXv7-NVSl1yQI1zzQ" alt="not found"  width="20" height="20" />
            <p className={cardCss.pgame}>{rating}</p>
            </div>
        </div>
    )
}

