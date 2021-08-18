import React from 'react'
import { Link } from 'react-router-dom'
import styleRandom from './Filters.module.css'

export default function RandomGame() {
    return (
        <div>
            <Link to = {`/detail/${Math.floor(Math.random() * 500000)}`}> 
            <button className = {styleRandom.btnRandomGame}>RANDOM GAME</button>
            </Link>
        </div>
    )
}