import React from 'react'
import { Link } from 'react-router-dom'
import styleRandom from './Filters.module.css'

export default function RandomAndFormButton() {
    return (
        <div>
            <div>
                <img src="https://i.ibb.co/D7dp7b5/banner-2.png" alt="not found" width="1100px" height="" />
            </div>
            <div className={styleRandom.buttons}>
                <Link to="/form">
                    <button className={styleRandom.btnForm}>CREATE GAME</button>
                </Link>
                <Link to={`/detail/${Math.floor(Math.random() * 100000)}`}>
                    <button className={styleRandom.btnRandomGame}>RANDOM GAME</button>
                </Link>
            </div>
        </div>
    )
}