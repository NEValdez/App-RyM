import SearchBar from "../SearchBar/SearchBar.jsx";
import style from './Nav.module.css';
import { Link } from "react-router-dom";

export default function Nav({onSearch}){
    return (
        <nav className={style.nav}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1920px-Rick_and_Morty.svg.png"
            alt=""
            width="20%"/>
            <button className={style.button} onClick={() => onSearch(Math.floor(Math.random() * (827 - 1) + 1))}>
            Personaje aleatorio
            </button>
            <Link to='/home' className={style.links}>Home</Link>
            <Link to='/about' className={style.links}>About</Link>
            <Link to='/favoritos' className={style.links}>Favoritos</Link>
            <SearchBar onSearch={onSearch}/> 
        </nav>
    );
}