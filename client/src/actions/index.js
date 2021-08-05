import axios from 'axios'

export function getVideogames() {
    return async function (dispatch) {
        const info = await axios.get('http://localhost:3001/games')
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: info.data
        })
    }
}