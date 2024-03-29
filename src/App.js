import './App.css';
import './styles.scss';
import "bootstrap/dist/css/bootstrap.css";
import { atom, useAtom } from 'jotai';
import { BrowserRouter, Route, Routes, json } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AllRestaurants from './components/restaurant/AllRestaurants';
import Login from './components/login/Login';
import Register from './components/register/Register';
import SingleRestaurant from './components/restaurant/SingleRestaurant';
import RestaurantDetail from './components/restaurant/RestaurantDetail';
import DeliveryCreation from './components/delivery/DeliveryCreation';
import DeliveryConfirmed from './components/delivery/DeliveryConfirmed';
import Homepage from './components/homepage/Homepage';
import Footer from './components/footer/Footer';
import DeliveryOverview from './components/delivery/DeliveryOverview';

const CartInMemory = atom(localStorage.getItem('cartState') ? JSON.parse(localStorage.getItem('cartState')) : null);
const clientInMemory = atom(localStorage.getItem('clientState') ? JSON.parse(localStorage.getItem('clientState')) : null);
const restaurantInMemory = atom(localStorage.getItem('restaurantState') ? JSON.parse(localStorage.getItem('restaurantState')) : null);

export const restaurantGlobal = atom(
  (get) => get(restaurantInMemory),
  (get, set, newRestaurant) => {
    set(restaurantInMemory, newRestaurant);
    localStorage.setItem('restaurantState', JSON.stringify(newRestaurant));
  }
)

export const cartGlobal = atom(
  (get) => get(CartInMemory),
  (get, set, newCart) => {
    set(CartInMemory, newCart);
    localStorage.setItem('cartState', JSON.stringify(newCart));
  }
);

export const client = atom(
  (get) => get(clientInMemory),
  (get, set, newClient) => {
    set(clientInMemory, newClient);
    localStorage.setItem('clientState', JSON.stringify(newClient));
  }


);

function App() {
  const [restaurantState, setRestaurantState] = useAtom(restaurantGlobal);
  const [cartState, setCartState] = useAtom(cartGlobal);
  const [clientState, setClientState] = useAtom(client);


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Homepage />}></Route>
        <Route path='/allrestaurants' element={<AllRestaurants />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/restaurants/:user_id/:r_id' element={<SingleRestaurant />}></Route>
        <Route path='/restaurantsdetails/:r_id' element={<RestaurantDetail />}> </Route>
        <Route path='/deliverycreation/:r_id' element={<DeliveryCreation />}> </Route>
        <Route path='/deliveryconfirmed' element={<DeliveryConfirmed />} ></Route>
        <Route path='/myorders' element={<DeliveryOverview />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
