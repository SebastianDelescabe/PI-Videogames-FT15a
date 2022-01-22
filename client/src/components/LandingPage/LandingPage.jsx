import React from 'react'
import { Link } from 'react-router-dom'
import styledLanding from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={styledLanding.background}>
            <div className={styledLanding.flex}>
                <h1 className={styledLanding.h1} >ABOUT</h1>
                <span className={styledLanding.span}>Developer:  Sebastian Delescabe</span>
                <span className={styledLanding.span}>Purpose:  Project in Bootcamp SoyHenry!!</span>
                <span className={styledLanding.span}>Programming Language:  JavaScript</span>
                <span className={styledLanding.span}>Techs:  React - Redux - NodeJs - CSS - PostgreSQL - Sequelize - Express </span>
            </div>
            <div>
            <Link to="/home">
                <button className={styledLanding.btn}>START</button>
            </Link>
            </div>
        </div>
    )
}
