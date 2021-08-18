import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import GenreFilter from "./Filters/GenreFilter";
import DbFilter from "./Filters/DbFilter";
import RatingOrder from "./Filters/RatingOrder"
import PlatformFilter from "./Filters/PlatformFilter";
import Home from "./Home/Home"
import RandomAndFormButton from "./Filters/RandomAndFormButton";
import styleIndex from "./index.module.css"

export default function Index() {

    return (
        <div className={styleIndex.background}>
            <div>
                <RandomAndFormButton/>
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
