import { ADD_FAV, REMOVE_FAV, FILTER, ORDER, RESET } from "./actions";

const initialState = {
    favoritos: [],
    allCharacters: [],
}

const reducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ADD_FAV:
            const addFavoritos =[...state.favoritos, payload]
            return {
                ...state,
                favoritos: [...addFavoritos],
                allCharacters: [...addFavoritos],
            }
        case REMOVE_FAV:
            return {
                ...state,
                allCharacters: state.allCharacters.filter(e => e.id !== Number(payload)),
            }
        case FILTER:
            return {
                ...state,
                favoritos: state.allCharacters.filter((e) => e.gender === payload),
            }
        case ORDER:
            let orderFavorites;
            if(payload === "A"){
                orderFavorites = state.favoritos.sort((a, b) => a.id > b.id ? 1: -1)
            } else {
                orderFavorites = state.favoritos.sort((a, b) => a.id < b.id ? 1: -1)
            }
            return {
                ...state,
            }
        case "RESET":
            return{
                ...state,
                favoritos: [...state.allCharacters],
            }
        default:
            return {
                ...state,
            }
    }
}

export default reducer;