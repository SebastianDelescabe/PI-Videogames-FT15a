import axios from 'axios'

export async function getVideogames(){
    const info = await axios.get('http://localhost:3001/games')
    return{
        type:"GET_VIDEOGAMES",
        payload:info.data
    }
}