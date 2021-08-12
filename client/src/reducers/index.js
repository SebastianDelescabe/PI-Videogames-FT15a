const initialState = {
    videogames: [],
    backUpVideogames: [],
    genres: [],
    detail: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                backUpVideogames: action.payload
            }

        case "GET_NAME_VIDEOGAME":
            return {
                ...state,
                videogames: action.payload
            }

        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }

        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
            }

        case "FILTER_GENRE":
            const genreFilter = action.payload === "all" ? state.backUpVideogames :
                state.backUpVideogames.filter(e => {
                    for (let i = 0; i < e.genres.length; i++) {
                        if (e.genres[i].name === action.payload) {
                            return true
                        }
                    }
                    return undefined
                })
            return {
                ...state,
                videogames: genreFilter

            }

        case "FILTER_BD":
            const bdFilter = action.payload === "true" ? state.backUpVideogames.filter(e => e.createdDb) : state.backUpVideogames
            return {
                ...state,
                videogames: bdFilter
            }

        case "FILTER_RATING":
            const ratingFilter =
                action.payload === 'best' ?
                    [...state.videogames].sort((b, a) => a.rating - b.rating)
                    :
                    [...state.videogames].sort((b, a) => b.rating - a.rating)
            return {
                ...state,
                videogames: ratingFilter
            }

        case "FILTER_NAME_ORDER":
            let sortedGames = action.payload === 'asc' ?
                [...state.videogames].sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                [...state.videogames].sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                videogames: sortedGames
            }
        case "POST_VIDEOGAMES":  //NO HACE NADA PERO TIENE QUE ESTAR EN EL REDUCER
            return {
                ...state,
            }

        default:
            return state
    }
}

export default rootReducer
