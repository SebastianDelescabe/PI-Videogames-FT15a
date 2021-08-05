const initialState = {
    stateVideogames:[]
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return{
                ...state,
                stateVideogames:action.payload
            }
            
        default:
            return state
    }
}

export default rootReducer