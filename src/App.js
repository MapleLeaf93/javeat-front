import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { atom, useAtom } from 'jotai';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AllRestaurants from './components/restaurant/AllRestaurants';

export const client=atom({});

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path='' element={<AllRestaurants/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
