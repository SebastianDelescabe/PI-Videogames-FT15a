import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames } from '../../actions'
import VideogameCard from "../VideogameCard/VideogameCard";
import Pagination from '../Pagination/Pagination '
import styleHome from './Home.module.css'


export default function Home() {

  const dispatch = useDispatch()
  const videogames = useSelector((state) => state.videogames)

  //-------Paginado---------
  const [currentPage, setCurrentPage] = useState(1)
  const [videogamesPerPage, setVideogmesPerPage] = useState(9)  //eslint-disable-line
  const indexLastVideogames = currentPage * videogamesPerPage //9 1*9 = 9
  const indexFirstVideogames = indexLastVideogames - videogamesPerPage// = 0 9-9 = 0

  const currentVideogames = videogames.slice(indexFirstVideogames, indexLastVideogames)

  function pagination(pageNumber) {
    setCurrentPage(pageNumber)
  }
  //---------------------------

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(getVideogames())
      .then(response => {
        setLoading(false)
      })
      .catch(error => setError(error.message))
  }, [dispatch])


  if (error) {
    return (
      <div className="ERROR">
        <h1>{error}</h1>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styleHome.loading}>
        <h1>-</h1> 
      </div>
    )
  }

  return (
    <div>
      <div className={styleHome.divCard} >
        {
          currentVideogames && currentVideogames.map(e => (
            <VideogameCard
              name={e.name}
              genres={e.genres.map(e => e.name)}
              img={e.background_image}
              rating={e.rating}
              id={e.id}
              createdDb={e.createdDb}
              key={e.id}
            />
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
