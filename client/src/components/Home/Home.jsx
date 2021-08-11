import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames, filterRating } from '../../actions'
import { Link } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar";
import VideogameCard from "../VideogameCard/VideogameCard";
import Pagination from '../Pagination/Pagination '
import GenreFilter from "../Filters/GenreFilter";
import DbFilter from "../Filters/DbFilter";
import styleHome from './Home.module.css'


export default function Home() {

  //--------Traigo info desde el backend y lo que me permite usar las funciones de las actions---------
  const dispatch = useDispatch()
  const videogames = useSelector((state) => state.videogamesState)

  //-------Paginado---------
  const [currentPage, setCurrentPage] = useState(1)
  const [videogamesPerPage, setVideogmesPerPage] = useState(9)
  const indexLastVideogames = currentPage * videogamesPerPage //9 1*9 = 9
  const indexFirstVideogames = indexLastVideogames - videogamesPerPage// = 0 9-9 = 0

  const currentVideogames = videogames.slice(indexFirstVideogames, indexLastVideogames)

  function pagination(pageNumber) {
    setCurrentPage(pageNumber)
  }

  //--------Ordenar por rating----------
  const [orden, setOrden] = useState("")

  function handleFilterRating(e) {
    e.preventDefault()
    dispatch(filterRating(e.target.value))
    setOrden(e.target.value)
  }
  
  useEffect(() => {
      dispatch(getVideogames())
  }, [dispatch])

  return (
    <div className = {styleHome.body}>
      <h1 className={styleHome.h1}>Videogames APP</h1>
      <Link to="/form">
        <button>Crea tu Videojuego</button>
      </Link>
      <SearchBar />
      <div className={styleHome.filters}>
        <GenreFilter />
        <DbFilter />
        <div>
          <select onChange={(e) => handleFilterRating(e)} >
            <option value="best">Mejor rating</option>
            <option value="worst">Peor rating</option>
          </select>
        </div>
      </div>
      <div className={styleHome.divCard} >
        {
          currentVideogames && currentVideogames.map(e => (
            <Link to={"/detail/" + e.id} >
            <VideogameCard name={e.name} genres={e.genres.map(e => e.name)} img={e.background_image} rating={e.rating} key={e.id} />
            </Link>
          ))
        }
      </div>
      <Pagination
        videogamesPerPage={videogamesPerPage}
        videogames={videogames.length}
        pagination={pagination}
      />
    </div>
  )
}
