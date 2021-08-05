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

export function getNameVideogame(payload) {
    return async function (dispatch) {
        try {
            const videogame = await axios.get('http://localhost:3001/games?name=' + payload)
            return dispatch({
                type: "GET_NAME_VIDEOGAME",
                payload: videogame.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}