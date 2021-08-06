import React from 'react'
import cardCss from './VideogameCard.module.css'

export default function VideogameCard({ name, img, genres }) {
    return (

        <div className = {cardCss.cnt}>
            <h1 className = {cardCss.h1}>{name}</h1>
            <div className = {cardCss.image}>
            <img  src={img} alt="img not found" width="350" height="200" />
            </div>
            <p className = {cardCss.p}>{genres.map(e => e + "-")}</p>
        </div>
    )
}

