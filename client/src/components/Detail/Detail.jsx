import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../../actions'
import parse from 'html-react-parser'

export default function Detail() {


    let { id } = useParams();

    const dispatch = useDispatch()
    const details = useSelector(state => state.detail)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getDetail(id))
            .then(response => {
                setLoading(false);
            })
            .catch(error => console.log(error));
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
            {
                <div>
                    <h1> {details[0].name} </h1>
                    <p> {parse(`${details[0].description}`)} </p>
                    <h2>lanzamiento</h2>
                    <p> {details[0].released} </p>
                    <h2>Rating</h2>
                    <p> {details[0].rating} </p>
                    <h2>plataformas</h2>
                    <p> {details[0].platforms.map(e => e.name + "-")} </p>
                    <img src={details[0].background_image} alt="" width="500px" height="500px" />
                </div>
            }
            <Link to="/home">
                <button>Volver</button>
            </Link>
        </div>
    )
}