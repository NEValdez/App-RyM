import style from "./Card.module.css";
import {Link} from "react-router-dom";
import {addFav, removeFav} from '../../redux/actions'
import { useState, useEffect } from "react";
import { connect } from "react-redux";

export function Card(props) {
   const [isFav, setIsFav] = useState(props.fav);

   useEffect(()=> {
      props.favoritos &&
      props.favoritos.forEach((fav)=>{
         if (fav.id === props.id) {
            setIsFav(true);
         }
      })
   });

   function handleFavorite(){
      if(isFav){
         setIsFav(false);
         props.removeFav(props.id);
      }else {
         setIsFav(true);
         props.addFav(
            {
               name: props.name,
               species: props.species,
               gender: props.gender,
               image: props.image,
               status: props.status,
               origin: props.origin,
               id: props.id,
            }
         )
      }
   }
   
   return (
      <div className={style.container}>
         
         <img className={style.imagen} src={props.image} alt='' /> 
         <button className={style.boton} onClick={props.onClose}>X</button>      
         <Link to={`/detail/${props.id}`}><h1 className={style.nombre}>{props.name}</h1> </Link>
         {/* <h4 className={style.lodemas}>{props.status}</h4> */}
         <h4 className={style.lodemas}>{props.species}</h4>
         <h4 className={style.lodemas}>{props.gender}</h4>
         {/* <h4 className={style.lodemas}>{props.origin.name}</h4>  */}
         {
            isFav ? (
               <favor onClick={handleFavorite}>❤️</favor>
            ) : (
               <favor onClick={handleFavorite}>🤍</favor>
            )
         }
      </div>
   );
}

export function mapStateToProps(state) {
   return {
     favoritos: state.allCharacters,
   };
 }

export function mapDispatchToProps(dispatch){
   return {
      addFav: function(personaje){
         dispatch(addFav(personaje));
      },
      removeFav: function (id){
         dispatch(removeFav(id));
      },
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
