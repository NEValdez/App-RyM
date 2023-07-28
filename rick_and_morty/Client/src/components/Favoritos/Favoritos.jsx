import Card from '../Card/Card';
import { connect, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { filterCards, orderCards } from '../../redux/actions';

export function Favoritos({favoritos}){
    const filter = useRef(null);
    const order = useRef(null)

    const dispatch = useDispatch();

    function handleReset(e){
        dispatch({type: "RESET"});
        filter.current.value = "";
        order.current.value = "";
    }

    function handleOrder(e){
        dispatch(orderCards(e.target.value))
    }

    function handleFilter(e){
        dispatch(filterCards(e.target.value))
    }
    return (
        <>
        <select ref = {order} onChange={handleOrder}>
            <option value="">Order:</option>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
        </select>
        <select ref = {filter} onChange={handleFilter}>
            <option value="">Filter:</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
        </select>
        <button value='reset' onClick={handleReset}>Reset</button>
        <div>
            {favoritos.map((e,i)=>
                <Card 
                name = {e.name}
                status = {e.status}
                species = {e.species}
                gender = {e.gender}
                origin = {e.origin}
                image = {e.image}
                id = {e.id}
                key = {e.id}
                onClose = {false}
                />  
            )}
        </div>
        </>
    )
}

export function mapStateToProps(state){
    return {
        favoritos: state.favoritos,
    };
}

export default connect(mapStateToProps, null)(Favoritos);