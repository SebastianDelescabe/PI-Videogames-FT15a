import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames } from '../../actions'
import { Link } from 'react-router-dom'
import VideogameCard from "../VideogameCard/VideogameCard";
import Pagination from '../Pagination/Pagination '
import styleHome from './Home.module.css'


export default function Home() {


  const dispatch = useDispatch()
  const videogames = useSelector((state) => state.videogames)

  //-------Paginado---------
  const [currentPage, setCurrentPage] = useState(1)
  const [videogamesPerPage, setVideogmesPerPage] = useState(9)
  const indexLastVideogames = currentPage * videogamesPerPage //9 1*9 = 9
  const indexFirstVideogames = indexLastVideogames - videogamesPerPage// = 0 9-9 = 0

  const currentVideogames = videogames.slice(indexFirstVideogames, indexLastVideogames)

  function pagination(pageNumber) {
    setCurrentPage(pageNumber)
  }


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getVideogames())
      .then(response => {
        setLoading(false)
      })
      .catch(error => console.log(error))
  }, [dispatch])


  if (loading) {
    return (
      <div className="loading">
        <h1>Loading</h1>
      </div>
    )
  }

  return (
    <div>
      <div className={styleHome.divCard} >
        {
          currentVideogames && currentVideogames.map(e => (
            <Link to={"/" + e.id} >
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
