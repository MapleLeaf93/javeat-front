import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { cartGlobal, client, restaurantGlobal } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPen, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import '../../styles.scss';
import DeliveryCreation from "../delivery/DeliveryCreation";

export default function RestaurantDetail() {
    const { r_id } = useParams();
    const [restaurant, setRestaurant] = useAtom(restaurantGlobal);
    const [user, setUser] = useAtom(client);
    const [cart, setCart] = useState([]);
    const [cartGlob, setCartGlob] = useAtom(cartGlobal);
    const [quantity, setQuantity] = useState({});
    const [showIngredients, setShowIngredients] = useState({});
    const [ingredients, setIngredients] = useState({});
    const [expectedArrivalOptions, setExpectedArrivalOptions] = useState([]);
    const [showDelivery, setShowDelivery] = useState(false);


    // const addToCart = (dish) => setCart([...cart, dish]); 
    //ritorna una lista di dishtodelivery: dish id, id delivery, quantità

    // rendo la lunghezza del div cart responsive
    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.style.height = divRef.current.scrollHeight + 'px';
        }
    }, []);


    //SISTEMARE MOLTIPLICATORE PER UNITA DI DISTANZA (IMPOSTATO A 0.2 -> 2)
    useEffect(() => {
        const calculateExpectedArrival = () => {
            const baseTime = new Date();  // Orario attuale
            const deliveryTimeOptions = [];
            // Calcolo del tempo di consegna previsto per opzioni specifiche (ogni 15 minuti)
            for (let i = 0; i < 6; i++) {
                const deliveryTime = new Date(baseTime);
                const minutesToAdd = (i + 1) * 15 + restaurant.distance * 0.2;  // Aggiungi 15 minuti più 2 minuti per unità di distanza
                deliveryTime.setMinutes(baseTime.getMinutes() + minutesToAdd);

                const deliveryTimeHoursMinutes = deliveryTime.getHours() * 100 + deliveryTime.getMinutes();
                const openingTimeHoursMinutes = parseInt(restaurant.openingHour.replace(':', ''));
                const closingTimeHoursMinutes = parseInt(restaurant.closingHour.replace(':', ''));

                // Verifica se l'orario di consegna è compreso tra l'orario di apertura e chiusura del ristorante
                if (deliveryTimeHoursMinutes >= openingTimeHoursMinutes && deliveryTimeHoursMinutes < closingTimeHoursMinutes) {
                    deliveryTimeOptions.push(deliveryTime);
                }
            }


            return deliveryTimeOptions;
        };
        if(restaurant)
            setExpectedArrivalOptions(calculateExpectedArrival());
    }, [restaurant]);

    const addToCart = (dish) => {
        let addedIngredients = "";
        for (let i in ingredients[dish.id]) {
            if (ingredients[dish.id][i])
                addedIngredients += i + ",";
        }
        if (addedIngredients.length != 0)
            addedIngredients = addedIngredients.substring(0, addedIngredients.length - 1);

        let tempDish = { ...dish, added_ingredients: addedIngredients };

        const existingDish = cart.find(item => item.id === dish.id);
        if (existingDish) {
            const updatedCart = cart.map(dishInCart => {
                if (dishInCart.id === dish.id) {
                    return { ...tempDish, quantity: dishInCart.quantity + 1 };
                }
                return dishInCart;
            });
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...tempDish, quantity: 1 }]);
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
            setDeliveryCost(parseFloat(calculatedDeliveryCost.toFixed(2)));
        }
    }, [r_id, restaurant]);

    useEffect(() => {
        axios.get(`/restaurant/full/` + user.id + `/` + r_id)
            .then((resp) => {
                setRestaurant(resp.data);
                let tempShow = {};
                let menu = resp.data.menu;
                let temp = {};
                for (let dish of menu) {
                    temp[dish.id] = {
                        mayonese: false,
                        ketchup: false,
                        mustard: false,
                        yogurt_sauce: false,
                        garlic: false,
                        onion: false,
                    }
                    tempShow[dish.id] = false;
                }
                setIngredients(temp);
                setShowIngredients(tempShow);
            }).catch(error => {
                console.error('Error loading details:', error);

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
                <h4>{category}<hr/></h4>
                {dishes.map(dish => (
                    <div  key={dish.id}>
                        <span className="fw-bold ">{dish.name}</span>
                        <span> - {dish.price.toFixed(2)}€</span>
                        <button className="btn btn-sm btn-outline-success m-2"
                            onClick={() => addToCart(dish)}><FontAwesomeIcon icon={faPlus} /></button>
                        <br />
                        <div>
                            {dish.ingredients.map((ingredient, index) => (
                                <span key={index} className=" fw-lighter me-2">{ingredient} {index === dish.ingredients.length - 1 ? "." : ","}</span>
                            ))}
                            {dish.customizable &&
                                <button className="btn btn-sm btn-outline-dark m-2"
                                    onClick={() => handleClick(dish.id)}> {showIngredients[dish.id] ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faPen} size="xs" />}</button>
                            }
                            <div>
                                {showIngredients[dish.id] && (
                                    <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                        <input type="checkbox" className="btn-check" onChange={() => handleCheckboxChange("mayonese", dish.id)} checked={ingredients[dish.id].mayonese}
                                            id={dish.id+"btncheck1"} autocomplete="off" />
                                        <label className="btn btn-outline-rasta-orange" for={dish.id+"btncheck1"}>Mayonese</label>

                                        <input type="checkbox" className="btn-check" onChange={() => handleCheckboxChange("ketchup", dish.id)} checked={ingredients[dish.id].ketchup} id={dish.id+"btncheck2"}autocomplete="off" />
                                        <label className="btn btn-outline-rasta-orange" for={dish.id+"btncheck2"}>Ketchup</label>

                                        <input type="checkbox" className="btn-check" onChange={() => handleCheckboxChange("mustard", dish.id)} checked={ingredients[dish.id].mustard} id={dish.id+"btncheck3"} autocomplete="off" />
                                        <label className="btn btn-outline-rasta-orange" for={dish.id+"btncheck3"}>Mustard</label>

                                        <input type="checkbox" className="btn-check" onChange={() => handleCheckboxChange("yogurt_sauce", dish.id)} checked={ingredients[dish.id].yogurt_sauce} id={dish.id+"btncheck4"} autocomplete="off" />
                                        <label className="btn btn-outline-rasta-orange" for={dish.id+"btncheck4"}>Yogurt sauce</label>

                                        <input type="checkbox" className="btn-check" onChange={() => handleCheckboxChange("garlic", dish.id)} checked={ingredients[dish.id].garlic} id={dish.id+"btncheck5"} autocomplete="off" />
                                        <label className="btn btn-outline-rasta-orange" for={dish.id+"btncheck5"}>Garlic</label>

                                        <input type="checkbox" className="btn-check" onChange={() => handleCheckboxChange("onion", dish.id)} checked={ingredients[dish.id].onion}
                                            id={dish.id+"btncheck6"} autocomplete="off" />
                                        <label className="btn btn-outline-rasta-orange" for={dish.id+"btncheck6"}>Onion</label>
                                    </div>)
                                }
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        ));
    };

    const handleCheckboxChange = (name, dish_id) => {
        let temp = { ...ingredients };
        temp[dish_id][name] = !temp[dish_id][name];
        setIngredients(temp);
    };

    const handleClick = (dish_id) => {
        let temp = { ...showIngredients };
        temp[dish_id] = !temp[dish_id];
        setShowIngredients(temp);
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

    // const handleConfirm = () => {

    //     let stringOfIngredients=ingredients.join(",");

    // };


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
            {cart.length > 0 && expectedArrivalOptions ? (
                <button className="btn btn-outline-success" onClick={() => { setCartGlob(cart); showDeliveryCreation() }}>Proceed to Order</button>
            ) : (
                <button className="btn btn-outline-success" disabled>Proceed to Order</button>
            )}
            {!expectedArrivalOptions ? (<p className="small-msg mt-2">Delivery options are too late!</p>):("")}
        </div>
    );

    function showDeliveryCreation() {
        setShowDelivery(true);
    }

    return (
        <div className="container d-flex  mt-5 mb-5 text-center">
            { !showDelivery &&
                <>
                    <div className="col-7 d-flex justify-content-center ">
                        <div className="card-body form-container-menu p-4">
                            {restaurant ? (
                                <>
                                    <div className="mb-auto ">
                                        <img className="card-img-top rounded justify-content-center mb-3" src={restaurant.imgUrl} alt="Restaurant" style={{ maxWidth: '100%', height: '300px', objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h3 className="card-title"><b> {restaurant.name} </b></h3><br />
                                            <p className="card-text">Phone number: {restaurant.phone}</p>
                                            <p className="card-text">Open at: {restaurant.openingHour} - Close at: {restaurant.closingHour}</p>
                                        </div>
                                        <div className="mt-auto mx-4 text-start">
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
                </>
            }

            {showDelivery && <DeliveryCreation expectedArrivalOptions={expectedArrivalOptions} r_id={r_id}/>}

        </div>

    );
}