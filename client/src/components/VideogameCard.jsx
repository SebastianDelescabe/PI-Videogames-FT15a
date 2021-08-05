import React from 'react'

export default function VideogameCard({ name, img, genres }) {
    return (

        <div>
            <h1>{name}</h1>
            <img src={img} alt="img not found" width="400" height="200" />
            <p>{genres.map(e => e + "-")}</p>
        </div>
    )
}


//{genres.map(e => "Genres :" + e )} GENEROS PARA FRONTs