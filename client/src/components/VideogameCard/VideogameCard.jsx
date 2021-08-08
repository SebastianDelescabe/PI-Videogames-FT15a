import React from 'react'
import cardCss from './VideogameCard.module.css'

export default function VideogameCard({ name, img, genres, rating }) {
    return (
        <div className={cardCss.cnt}>
            <h1 className={cardCss.h1}>{name}</h1>
            <img src={img} alt="img not found" width="350" height="200" />
            <p className={cardCss.p}>{genres.map(e => e + "-")}</p>
            <p className={cardCss.p}>{rating}</p>
        </div>
    )
}

