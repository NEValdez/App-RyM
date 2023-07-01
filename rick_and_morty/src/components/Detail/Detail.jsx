import axios from 'axios';
import style from './Detail.module.css'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Detail(){
    const {id} = useParams();
    const [character, setCharacter] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
     }, [id]);

    return(
        <div className={style.container}>
            <div className={style.info}>
                {character.name && (<h1>{character.name}</h1>)}
                {character.status && (<p><b>Status: </b>{character.status}</p>)}
                {character.species && (<p><b>Species: </b>{character.species}</p>)}
                {character.gender && (<p><b>Gender: </b>{character.gender}</p>)}
                {character.origin && (<p><b>Origin: </b>{character.origin.name}</p>)}
            </div>
            <img className={style.image} src={character.image}/>
            <button className={style.button} onClick={()=> navigate('/home')}> Home </button> 
        </div>
        
    )
}