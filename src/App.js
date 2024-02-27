import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { atom, useAtom } from 'jotai';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AllRestaurants from './components/restaurant/AllRestaurants';
import Login from './components/login/Login';
import Register from './components/register/Register';


export const client=atom({});

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route index element={<AllRestaurants/>}></Route>
      <Route path='/allrestaurants' element={<AllRestaurants/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
