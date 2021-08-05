import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames } from '../actions'
import VideogameCard from "./VideogameCard";

export default function Home() {

  const dispatch = useDispatch()
  const videogames = useSelector((state) => state.stateVideogames)
  console.log(videogames)

  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  return (
    <div>
      <h1>Componente HOME</h1>
      <hr/>
      {
        videogames && videogames.map(e => (
          <VideogameCard name = {e.name} img = {e.background_image} genres = {[e.genres]} />
        ))
      }
    </div>
  )
}

//                name: e.name,
//background_image: e.background_image,
//genres: e.genres.map(e => e.name)