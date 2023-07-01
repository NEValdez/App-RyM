import Card from '../Card/Card';
import style from './Cards.module.css';

export default function Cards(props) {
   const {characters, onClose} = props;
   return (
      <div className={style.container}>
         {characters.map((c) => (
         <Card 
         name = {c.name}
         status = {c.status}
         species = {c.species}
         gender = {c.gender}
         origin = {c.origin}
         image = {c.image}
         id = {c.id}
         key = {c.id}
         onClose = {() => onClose(c.id)}
         />
         ))}
      </div>
)};
