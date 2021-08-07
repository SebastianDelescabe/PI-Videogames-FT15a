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
            const genreFilterApi = action.payload === "all" ? state.backUpVideogames : state.backUpVideogames.filter(e => e.genres.includes(action.payload))
            return {
                ...state,
                videogamesState: genreFilterApi
            }
        case "FILTER_BD":
            const bdFilter = action.payload === "true" ? state.backUpVideogames.filter(e => e.createdDb) : state.backUpVideogames
            return {
                ...state,
                videogamesState: bdFilter
            }
        case "FILTER_RATING":
            const ratingFilter = action.payload === 'best' ?
                state.backUpVideogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                }) :
                state.backUpVideogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
            return {
                ...state,
                videogamesState: ratingFilter
            }
        default:
            return state
    }
}

export default rootReducer