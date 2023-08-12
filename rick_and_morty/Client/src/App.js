import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Favoritos from './components/Favoritos/Favoritos';

function App() {
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const navigate = useNavigate();
   
   const URL = 'http://localhost:3001/rickandmorty/'

async function login({ email, password }) {
  try {
   const { data } = await axios(`${URL}login?email=${email}&password=${password}`)
   const { access } = data

   setAccess(access)
   access && navigate('/home')
   
  } catch ({ response }) {
      const { data } = response
      alert(data.message)
  }
}

useEffect(() => {
   !access && navigate('/');
}, [access]);

   const onSearch = async (id) => {
      if (id > 826) {
         window.alert("No hay tantos personajes!");
         return;
      }
      if (id <= 0){
         window.alert("El id sólo puede ser un número positivo");
         return;
      }
      const existingCharacter = characters.find((characters) => characters.id === Number(id));
      if (existingCharacter) {
         window.alert("Ese personaje ya está en la lista");
         return;
      }
      try {
         const { data } = await axios(`${URL}/character/${id}`)

         setCharacters(oldChars => [...oldChars, data])

      } catch(error) {
         alert(error.response.data)
      }
      }
   }



   function onClose(id){
      setCharacters(characters.filter((character)=> character.id !== id));
   }

   const location = useLocation(); 

   return (
      <div className="App">
         {location.pathname !== '/' && (<Nav onSearch={onSearch}/>)}
         <Routes>
               <Route path="/" element={<Form login={login}/>}></Route>
               <Route path="/home" element={<Cards characters={characters} onClose={onClose}/>}/>
               <Route path="/about" element={<About/>}/>
               <Route path="/detail/:id" element={<Detail/>}/>
               <Route path="/favoritos" element={<Favoritos/>} />
            
         </Routes>
      </div>
   );


export default App;
