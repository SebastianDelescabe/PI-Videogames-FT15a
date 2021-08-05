const initialState = {
    videogamesState:[],
    backUpVideogames:[],

}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return{
                ...state,
                videogamesState:action.payload,
                backUpVideogames:action.payload
            }
        case "GET_NAME_VIDEOGAME":
            return{
                ...state,
                videogamesState:action.payload
            }
            
        default:
            return state
    }
}

export default rootReducer