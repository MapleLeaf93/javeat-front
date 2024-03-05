import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { cartGlobal, client, restaurantGlobal } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import '../../styles.scss';
import { faDribbbleSquare } from "@fortawesome/free-brands-svg-icons";

export default function RestaurantDetail() {
    const { r_id } = useParams();
    const [restaurant, setRestaurant] = useAtom(restaurantGlobal);
    const [user, setUser] = useAtom(client);
    const [cart, setCart] = useState([]);
    const [cartGlob, setCartGlob] = useAtom(cartGlobal);
    const [quantity, setQuantity] = useState({});

    // const addToCart = (dish) => setCart([...cart, dish]); 
    //ritorna una lista di dishtodelivery: dish id, id delivery, quantità

    // rendo la lunghezza del div cart responsive
    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.style.height = divRef.current.scrollHeight + 'px';
        }
    }, []);

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
        let tot = dishesCost + deliveryCost;
        return (Math.round(tot * 100) / 100).toFixed(2);
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
                <br />
                <h4>{category}</h4>
                {dishes.map(dish => (
                    <div key={dish.id}>
                        <span className="fw-bold">{dish.name}</span>
                        <span> - {dish.price}€</span>
                        <button className="btn btn-sm btn-outline-success m-2"
                            onClick={() => addToCart(dish)}><FontAwesomeIcon icon={faPlus} /></button>
                        <br />
                        <div>
                            {dish.customizable &&
                                <button className="btn btn-sm btn-outline-success m-2"
                                    onClick={() => addIngredients(dish)}>add ingredients</button>}

                            {dish.ingredients.map((ingredient, index) => (
                                <span key={index} className=" fw-lighter me-2">{ingredient} {index === dish.ingredients.length - 1 ? "" : ","}</span>
                            ))}

                        </div>
                    </div>
                ))}
            </div>
        ));
    };

    const addQuantity = (dish) => {
        const updatedCart = cart.map(dishInCart => {
            if (dishInCart.id === dish.id) {
                return { ...dishInCart, quantity: dishInCart.quantity + 1 }; // Incrementa la quantità di uno
            }
            return dishInCart;
        });
        setCart(updatedCart);
    };

    const addIngredients = (dish) => {
        return (

            <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" />
                <label class="btn btn-outline-primary" for="btncheck1">Mayonese</label>

                <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" />
                <label class="btn btn-outline-primary" for="btncheck2">Ketchup</label>

                <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" />
                <label class="btn btn-outline-primary" for="btncheck3">Mustard</label>

                <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" />
                <label class="btn btn-outline-primary" for="btncheck3">Yogurt sauce</label>

                <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" />
                <label class="btn btn-outline-primary" for="btncheck3">Garlic</label>

                <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" />
                <label class="btn btn-outline-primary" for="btncheck3">Onion</label>


                <div>
                    <button type="submit" className="btn btn-outline-success" >Confirm</button>
                </div>
            </div>

        );
    }

    const renderCart = () => (
        <div className="cart-container">
            <h3 className="mt-2">Your Cart</h3>
            <div className="cart-items">
                {cart.map((dish) => (
                    <div key={dish.id} className=" cart-item">
                        <FontAwesomeIcon className="dark-hover" style={{ color: "#92ce5a", fontSize: "1.5rem" }} icon={faPlus} onClick={() => addQuantity(dish)} />
                        <span className="lh-sm">{dish.quantity}x</span>
                        <span className="fw-medium"> {dish.name} {dish.price}€</span>
                        <FontAwesomeIcon className="mt-auto ms-2 dark-hover " onClick={() => removeFromCart(dish)} size="lg" icon={faMinus} style={{ color: "#ff0000", fontSize: "1.5rem" }} />
                    </div>
                ))}
            </div>
            <hr />
            <p>Delivery Cost: {deliveryCost}€</p>
            <p>Total Cost: {calculateTotalCost()}€</p>
            {cart.length > 0 ? (
                <Link className="btn btn-outline-success" to={"/deliverycreation/" + r_id} onClick={() => setCartGlob(cart)}>Proceed to Order</Link>
            ) : (
                <button className="btn btn-outline-success" disabled>Proceed to Order</button>
            )}
        </div>
    );


    return (
        <div className="container d-flex  mt-5 mb-5 text-center">
            <div className="col-7 d-flex justify-content-center ">
                <div className="card-body form-container">
                    {restaurant ? (
                        <>
                            <div className="mb-auto ">


                                <img className="card-img-top rounded-top justify-content-center mb-3" src={restaurant.imgUrl} alt="Restaurant" style={{ maxWidth: '100%', height: '300px', objectFit: "cover" }} />
                                <div className="card-body">
                                    <h3 className="card-title"><b> {restaurant.name} </b></h3><br />
                                    <p className="card-text">Phone number: {restaurant.phone}</p>
                                    <p className="card-text">Open at: {restaurant.openingHour} - Close at: {restaurant.closingHour}</p>
                                </div>
                                <div className="mx-4">

                                    {renderDishesByCategory(restaurant.menu)}
                                </div>
                            </div>
                            <br />
                        </>
                    ) : (
                        <p>Loading restaurant...</p>
                    )}
                </div>
            </div>
            <div ref={divRef} className="col-md-5  pb-2 sticky-top p-4  justify-content-center ">
                <div className="sticky-top background-yellow-shape ">
                    {renderCart()}

                </div>
            </div>
        </div>

    );
}