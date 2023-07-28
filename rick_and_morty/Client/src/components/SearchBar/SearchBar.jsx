import style from "./SearchBar.module.css";
import { useState } from "react";

export default function SearchBar(props) {
   const [id, setId] = useState('');

   const handleChange = (event) => {
      let {value} = event.target;
      setId(value);
   }
   return (
      <div className={style.container}>
         <input className={style.search}  type='search' onChange={handleChange} value={id}/>
         <button className={style.agregar} onClick={() => props.onSearch(id)}>
            Agregar
         </button>
         
      </div>
   );
}
