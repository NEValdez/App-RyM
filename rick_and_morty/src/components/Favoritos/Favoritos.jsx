import Card from '../Card/Card';
import { connect } from 'react-redux';

export function Favoritos({favoritos}){
    return (
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
    )
}

export function mapStateToProps(state){
    return {
        favoritos: state.favoritos,
    };
}

export default connect(mapStateToProps, null)(Favoritos);