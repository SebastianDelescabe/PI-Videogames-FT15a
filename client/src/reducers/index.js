const initialState = {
    videogamesState: [],
    backUpVideogames: [],
    genres: [],
    detail:[],
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
        
        case "GET_DETAIL":
            return{
                ...state,
                detail:action.payload
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
                videogamesState: genreFilter

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
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                })
            return {
                ...state,
                videogamesState: ratingFilter
            }
            case "POST_VIDEOGAMES":  //NO HACE NADA PERO TIENE QUE ESTAR EN EL REDUCER
            return{
                ...state,
            }

        default:
            return state
    }
}

export default rootReducer
