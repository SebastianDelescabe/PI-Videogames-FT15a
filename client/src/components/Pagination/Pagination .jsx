import React from 'react'
import style from "./Pagination.module.css"

export default function Pagination({ videogamesPerPage, videogames, pagination }) {
    const pageNumbers = []
    for (let i = 0; i < Math.ceil(videogames / videogamesPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <div>
            <ul className = {style.paginado}>
                {
                    pageNumbers && pageNumbers.map(e => (
                        <li className={style.number}  key={e}>
                            <div onClick={() => pagination(e)}>{e}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}