import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { atom, useAtom } from 'jotai';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AllRestaurants from './components/restaurant/AllRestaurants';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { useEffect } from 'react';
import SingleRestaurant from './components/restaurant/SingleRestaurant';


const clientInMemory = atom(localStorage.getItem('clientState') ? JSON.parse(localStorage.getItem('clientState')) : null);


export const client = atom(
  (get) => get(clientInMemory),
  (get,set,newClient) =>{
    set(clientInMemory,newClient);
    localStorage.setItem('clientState',JSON.stringify(newClient));
  }


);

function App() {

  const [clientState, setClientState] = useAtom(client);

  
   return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path='/allrestaurants' element={<AllRestaurants />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/restaurants/:id' element={<SingleRestaurant />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
