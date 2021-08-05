import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames } from '../actions'
import SearchBar from "./SearchBar";
import VideogameCard from "./VideogameCard";

export default function Home() {

  const dispatch = useDispatch()
  const videogames = useSelector((state) => state.videogamesState)



  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  return (
    <div>
      <h1>Componente HOME</h1>
      <hr/>
      <SearchBar/>
      {
        videogames && videogames.map(e =>  (
          e.createdDb === true ? <VideogameCard name = {e.name} genres = {e.genres.map(e => e.name)} img = {e.background_image}/> 
          : 
          <VideogameCard name = {e.name} genres = {e.genres} img = {e.background_image}/>
        ))
      }
    </div>
  )
}
