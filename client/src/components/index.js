import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import GenreFilter from "./Filters/GenreFilter";
import DbFilter from "./Filters/DbFilter";
import RatingOrder from "./Filters/RatingOrder"
import PlatformFilter from "./Filters/PlatformFilter";
import Home from "./Home/Home"
import styleIndex from "./index.module.css"
import RandomGame from "./Filters/RandomGame";

export default function Index() {

    return (
        <div className={styleIndex.background}>
            <img className={styleIndex.img} src="https://i.ibb.co/D7dp7b5/banner-2.png" width="1400px" height="" />
            <div className={styleIndex.buttons}>
                <Link to="/form">
                    <button className={styleIndex.btnForm}>CREATE GAME</button>
                </Link>
                <RandomGame />
            </div>
            <div className={styleIndex.banner}>
                <div className={styleIndex.filters}>
                    <PlatformFilter />
                    <GenreFilter />
                    <DbFilter />
                    <RatingOrder />
                    <SearchBar />
                </div >
            </div>
            <Home />
        </div>
    )
}
