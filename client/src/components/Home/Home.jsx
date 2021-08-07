import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames, filterBd } from '../../actions'
import { Link } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar";
import VideogameCard from "../VideogameCard/VideogameCard";
import Pagination from '../Pagination/Pagination '
import GenreFilter from "../Filters/GenreFilter";
import IdFilter from "../Filters/IdFilter";
import styleHome from './Home.module.css'


export default function Home() {

  //--------Traigo info desde el backend y lo que me permite usar las funciones de las actions---------
  const dispatch = useDispatch()
  const videogames = useSelector((state) => state.videogamesState)

  //-------Paginado---------
  const [currentPage, setCurrentPage] = useState(1)
  const [videogamesPerPage, setVideogamesPerPage] = useState(9)
  const indexLastVideogames = currentPage * videogamesPerPage //9 1*9 = 9
  const indexFirstVideogames = indexLastVideogames - videogamesPerPage// = 0 9-9 = 0

  const currentVideogames = videogames.slice(indexFirstVideogames, indexLastVideogames)

  function pagination(pageNumber) {
    setCurrentPage(pageNumber)
  }
  //--------Fin Paginado-------

  //--------Check box ---------
  const [checkBd, setCheckBd] = useState(false)

  function handleCheck(e) {
    console.log(checkBd)
    if (checkBd === false) {
      dispatch(filterBd(e.target.value))
      setCheckBd(true)
    } else {
      setCheckBd(false)
      dispatch(getVideogames())
    }
  }

  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  return (
    <div>
      <h1>Videogames APP</h1>
      <Link to="/formulario">
        <button>Crea tu Videojuego</button>
      </Link>
      <div>
        <SearchBar />
        <GenreFilter />
        <IdFilter/>
      </div>
      {/**------------Renderizo Checkbox filtro BD------------ */}
      <div>
        <input onChange={(e) => handleCheck(e)} type="checkbox" value="true" defaultChecked={checkBd} />
        <label >Juegos creados</label>
      </div>
      {/*--------Renderizo cada carta en el home------------*/}
      <div className={styleHome.divCard} >
        {
          currentVideogames && currentVideogames.map(e => (
            e.createdDb === true ? <VideogameCard name={e.name} genres={e.genres.map(e => e.name)} img={e.background_image} />
              :
              <VideogameCard name={e.name} genres={e.genres} img={e.background_image} />
          ))
        }
        {/**-------Renderizo Paginado---------------- */}
      </div>
      <Pagination
        videogamesPerPage={videogamesPerPage}
        videogames={videogames.length}
        pagination={pagination}
      />
    </div>
  )
}
