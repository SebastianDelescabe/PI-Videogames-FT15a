import React from 'react'
import { Link } from 'react-router-dom'
import styledLanding from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={styledLanding.background}>
            <div className= {styledLanding.flex}>
                <Link to="/home">
                    <button className = {styledLanding.btn}>GET IN</button>
                </Link>
            </div>
        </div>
    )
}
