const initialState = {
    videogamesState: [],
    backUpVideogames: [],
    genres: [],

}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogamesState: action.payload,
                backUpVideogames: action.payload
            }
        case "GET_NAME_VIDEOGAME":
            return {
                ...state,
                videogamesState: action.payload
            }
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }
        case "FILTER_GENRE": //payload === action //
        const genreFilterApi = action.payload === "all" ? state.backUpVideogames :state.backUpVideogames.filter(e => e.genres.includes(action.payload))
            return {
                ...state,
                videogamesState: genreFilterApi
            }

        default:
            return state
    }
}

export default rootReducer