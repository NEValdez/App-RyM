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
   
   const EMAIL = 'ejemplo@gmail.com';
   const PASSWORD = 'Nico123';

function login(userData) {
   if (userData.password === PASSWORD && userData.email === EMAIL) {
      setAccess(true);
      navigate('/home');
   }
}

useEffect(() => {
   !access && navigate('/');
}, [access]);

   function onSearch(id){
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
      axios("http://localhost:3001/rickandmorty/character/${id}")
      .then(({ data }) => {
         if (data.name) {
            setCharacters([data, ...characters]);
         }
       })
       .catch(err => alert(err.response.data.error)); 
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
