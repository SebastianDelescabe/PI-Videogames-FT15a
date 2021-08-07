import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames } from '../../actions'
import { Link } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar";
import VideogameCard from "../VideogameCard/VideogameCard";
import Pagination from '../Pagination/Pagination '
import GenreFilter from "../Filters/GenreFilter";
import styleHome from './Home.module.css'

export default function Home() {

  //--------Traigo info desde el backend y lo que me permite usar las funciones de las actions
  const dispatch = useDispatch()
  const videogames = useSelector((state) => state.videogamesState)

  //---Paginado 
  const [currentPage, setCurrentPage] = useState(1)
  const [charactersPerPage, setCharactersPerPage] = useState(9)
  const indexLastCharacter = currentPage * charactersPerPage //9 1*9 = 9
  const indexFirstCharacter = indexLastCharacter - charactersPerPage// = 0 9-9 = 0

  const currentCharacter = videogames.slice(indexFirstCharacter, indexLastCharacter)

  function pagination(pageNumber) {
    setCurrentPage(pageNumber)
  }
  //--Fin paginado


  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  return (
    <div>
      <h1>Videogames APP</h1>
      <Link to="/formulario">
        <button>Crea tu Videojuego</button>
      </Link>
      <SearchBar />
      <GenreFilter/>
      <div className={styleHome.divCard} >
        {
          currentCharacter && currentCharacter.map(e => (
            e.createdDb === true ? <VideogameCard name={e.name} genres={e.genres.map(e => e.name)} img={e.background_image} />
              :
              <VideogameCard name={e.name} genres={e.genres} img={e.background_image} />
          ))
        }
      </div> 
       <Pagination
        charactersPerPage={charactersPerPage}
        videogames={videogames.length}
        pagination={pagination}
      />
    </div>
  )
}
