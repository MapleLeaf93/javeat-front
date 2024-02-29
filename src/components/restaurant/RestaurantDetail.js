import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { client } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark} from '@fortawesome/free-solid-svg-icons'
import '../../styles.css';

export default function RestaurantDetail() {
    const { r_id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [user, setUser] = useAtom(client);
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState({});

    // const addToCart = (dish) => setCart([...cart, dish]); 
    const addToCart = (dish) => {
        const existingDish = cart.find(item => item.id === dish.id);
        if (existingDish) {
            const updatedCart = cart.map(dishInCart => {
                if (dishInCart.id === dish.id) {
                    return { ...dishInCart, quantity: dishInCart.quantity + 1 };
                }
                return dishInCart;
            });
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...dish, quantity: 1 }]);
        }
    };
    
    // const removeFromCart = (dish) => setCart(cart.filter((item) => item.id !== dish.id));
    const removeFromCart = (dish) => {
        const updatedCart = cart.map(dishInCart => {
            if (dishInCart.id === dish.id) {
                if (dishInCart.quantity > 1) {
                    return { ...dishInCart, quantity: dishInCart.quantity - 1 };
                } else {
                    // Rimuovi completamente il piatto se la quantità è 1
                    return null;
                }
            }
            return dishInCart;
        });
        // Creazione di un nuovo array senza elementi null
        const filteredCart = updatedCart.filter(Boolean);
        setCart(filteredCart);
    };
        


    const [deliveryCost, setDeliveryCost] = useState(0);

    const calculateTotalCost = () => {
        const dishesCost = cart.reduce((total, dish) => total + dish.price, 0);
        return dishesCost + deliveryCost;
    };

    useEffect(() => {
        if (restaurant && restaurant.distance) {
            const costPerKilometer = restaurant.deliveryPricePerUnit;
            const calculatedDeliveryCost = restaurant.distance * costPerKilometer;
            setDeliveryCost(calculatedDeliveryCost);
        }
    }, [r_id, restaurant]);

    useEffect(() => {
        axios.get(`/restaurant/full/` + user.id + `/` + r_id)
            .then((resp) => {
                setRestaurant(resp.data);
            }).catch(error => {
                console.error('Errore durante il recupero dei dettagli del ristorante:', error);
            });
    }, [user.id, r_id]);

    const renderDishesByCategory = (menu) => {
        if (!menu) return <p>Loading menu...</p>;

        const groupedDishes = menu.reduce((acc, dish) => {
            const category = dish.category || 'Others';
            acc[category] = [...(acc[category] || []), dish];
            return acc;
        }, {});

        return Object.entries(groupedDishes).map(([category, dishes]) => (
            <div key={category}>
                <h4>{category}</h4>
                {dishes.map(dish => (
                    <div key={dish.id}>
                        <span>{dish.name} - Price: {dish.price}€</span>
                        <button className="btn btn-sm btn-outline-success m-2" onClick={() => addToCart(dish)}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                ))}
            </div>
        ));
    };

    const renderCart = () => (
        <div>
            <h3>Your Cart</h3>
            {cart.map((dish) => (
                <div key={dish.id}>
                    <span>{dish.name} - Price: {dish.price}€ - Quantity: {dish.quantity}</span>
                    <FontAwesomeIcon className="mt-auto ms-2 dark-hover" onClick={() => removeFromCart(dish)} size="lg" icon={faXmark} style={{color: "#ff0000",}} />
                </div>
            ))}
            <hr />
            <p>Delivery Cost: {deliveryCost}€</p>
            <p>Total Cost: {calculateTotalCost()}€</p>
            <div className="text-center">
                <button className="btn btn-outline-success">Proceed to Order</button>
            </div>
            
        </div>
    );

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="col-8 pe-4">
                <div className="card-body">
                    {restaurant ? (
                        <>
                            <div className="mb-auto">
                                <h2 className="card-title"><b> {restaurant.name} </b></h2>
                                <img className="card-img-top" src={restaurant.imgUrl} alt="Restaurant" style={{ maxWidth: '100%', height: 'auto' }} />
                                <p>Phone number: {restaurant.phone}</p>
                                <p>Open at: {restaurant.openingHour} - Close at: {restaurant.closingHour}</p>
                            </div>
                            <div className="mt-auto">
                                {renderDishesByCategory(restaurant.menu)}
                            </div>
                        </>
                    ) : (
                        <p>Loading restaurant...</p>
                    )}
                </div>
            </div>
            <div className="col-4 ps-5 sticky-top">
                <div className="sticky-top">
                    {renderCart()}
                </div>
                
            </div>
        </div>
    );
}