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


export const client = atom({});

function App() {

  const [clientState, setClientState] = useAtom(client);

  useEffect(() => {
    const storedClientState = localStorage.getItem('clientState');
    if (storedClientState) {
      setClientState(JSON.parse(storedClientState));
    }
  },
    [setClientState]
  );

  useEffect(()=>{
    if(Object.keys(clientState).length >0)
    {
      localStorage.setItem('ClientState', JSON.stringify(clientState));
    }
  },[clientState]);


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
