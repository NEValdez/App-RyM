import { ADD_FAV, REMOVE_FAV } from "./actions";

const initialState = {
    favoritos: [],
}

const reducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ADD_FAV:
            return {
                ...state,
                favoritos: [...state.favoritos, payload]
            }
        case REMOVE_FAV:
            return {
                ...state,
                favoritos: state.favoritos.filter(e => e.id !== Number(payload)),
            }
        default:
            return {
                ...state,
            }
    }
}

export default reducer;