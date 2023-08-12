import axios from 'axios'
export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';
export const FILTER = "FILTER";
export const ORDER = "ORDER";

const URL = 'http://localhost:3001/rickandmorty/fav'

export const addFav = (personaje) => {
    return async function(dispatch) {
        try {
            const {data} = await axios.post(`${URL}`, personaje)
            return dispatch({
                type: ADD_FAV,
                payload: data
            })
        } catch (error) {
            
        }
    }
}

export const removeFav = (id) => {
    return async function(dispatch) {
        try {
            const {data} = await axios.delete(`${URL}/${id}`)
            return dispatch({
                type: REMOVE_FAV,
                payload: data
            })
        } catch (error) {
            
        }
    }
}

export function filterCards(gender){
    return {
        type: FILTER,
        payload: gender,
    }
}

export function orderCards(orden){
    return {
        type: ORDER,
        payload: orden,
    }
}