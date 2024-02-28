import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { client } from "../../App";
import '../../styles.css';

export default function RestaurantDetail() {
    const { r_id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [user, setUser] = useAtom(client);
    const [cart, setCart] = useState([]);

    const addToCart = (dish) => setCart([...cart, dish]);
    const removeFromCart = (dish) => setCart(cart.filter((item) => item.id !== dish.id));

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
                        <button className="btn btn-sm btn-outline-success ms-3" onClick={() => addToCart(dish)}>Add to your Order</button>
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
                    <span>{dish.name} - Price: {dish.price}€</span>
                    <button onClick={() => removeFromCart(dish)}>Remove</button>
                </div>
            ))}
            <hr />
            <p>Delivery Cost: {deliveryCost}€</p>
            <p>Total Cost: {calculateTotalCost()}€</p>
        </div>
    );

    return (
        <div className="container d-flex justify-content-center text-center">
            <div className="col-8">
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
            <div className="col-4">
                {renderCart()}
            </div>
        </div>
    );
}