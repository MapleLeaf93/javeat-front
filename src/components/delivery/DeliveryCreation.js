import { useAtom } from "jotai";
import { cartGlobal, client, restaurantGlobal } from "../../App";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DeliveryConfirmed from "./DeliveryConfirmed";

export default function DeliveryCreation({expectedArrivalOptions, r_id}) {
    //scegliere l'orario di consegna (solo in giornata) a scatti di 15 minuti 
    //(a partire da ora attuale + 2 min per unità di distanza) e si devono poter inserire 
    //delle note (allergie, scala, citofono e simili)

    //Una volta confermato l'orario portare ad una pagina dove viene scelto 
    //il pagamento e confermato l'ordine--> deliveryConfirmed
    const navigate = useNavigate();
    const [user, setUser] = useAtom(client);
    const [cartG, setCartG] = useAtom(cartGlobal);
    const [restaurant, setRestaurant] = useAtom(restaurantGlobal);
    const [distance, setDistance] = useState(restaurant.distance);
    
    const [selectedExpectedArrival, setSelectedExpectedArrival] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [note, setNote] = useState("");
    
    // const [dishDescription, setDishDescription] = useState({
    //     quantita:cartG.quantity,
    //     added_ingredients:cartG.added_ingredients,
    //     removed_ingredients:""
    // });
    const [dto, setDto] = useState({
        user_id: user.id,
        restaurant_id: r_id,
        idPiattoToQuantita: cartG.reduce((accumulator, dishtodelivery) => {
            accumulator[dishtodelivery.id] = dishtodelivery.quantity;
                                            //dishtodelivery.quantity;
            return accumulator;
        }, {}),
        expected_arrival: "",
        payment_method: "",
        notes: ""
    });
    
    
    // const [dto, setDto] = useState({
    //     user_id: user.id,
    //     restaurant_id: r_id,
    //     idPiattoToQuantita: cartG.reduce((accumulator, dishtodelivery) => {
    //         accumulator[dishtodelivery.id] = dishtodelivery.dishDescription;
    //         return accumulator;
    //     }, {}),
    //     expected_arrival: "",
    //     payment_method: "",
    //     notes: ""
    // });
    
    // useEffect(() => {
    //     const calculateExpectedArrival = () => {
    //         const baseTime = new Date();  // Orario attuale
    //         const deliveryTimeOptions = [];
    //         // Calcolo del tempo di consegna previsto per opzioni specifiche (ogni 15 minuti)
    //         for (let i = 0; i < 6; i++) {
    //             const deliveryTime = new Date(baseTime);
    //             const minutesToAdd = (i + 1) * 15 + distance * 0.2;  // Aggiungi 15 minuti più 2 minuti per unità di distanza
    //             deliveryTime.setMinutes(baseTime.getMinutes() + minutesToAdd);

    //             const deliveryTimeHoursMinutes = deliveryTime.getHours() * 100 + deliveryTime.getMinutes();
    //             const openingTimeHoursMinutes = parseInt(restaurant.openingHour.replace(':', ''));
    //             const closingTimeHoursMinutes = parseInt(restaurant.closingHour.replace(':', ''));

    //             // Verifica se l'orario di consegna è compreso tra l'orario di apertura e chiusura del ristorante
    //             if (deliveryTimeHoursMinutes >= openingTimeHoursMinutes && deliveryTimeHoursMinutes < closingTimeHoursMinutes) {
    //                 deliveryTimeOptions.push(deliveryTime);
    //             }
    //         }
            
            
    //         return deliveryTimeOptions;
    //     };

    //     setExpectedArrivalOptions(calculateExpectedArrival());
    // }, [restaurant]);

    // Funzione per gestire il cambiamento dell'orario di consegna selezionato
    // Questo esempio assume che hai già un oggetto Date valido per ogni opzione
    // e che lo converti in stringa ISO per il valore dell'opzione, qualcosa del genere:
    // <option value={option.toISOString()}>...</option>

    const handleExpectedArrivalChange = (e) => {
        const isoDateString = e.target.value; // La stringa ISO 8601 selezionata
        const date = new Date(isoDateString); // Convertila in un oggetto Date
        setSelectedExpectedArrival(date);
    };

    function sendForm(paymentMethod) {

        let updatedDto = {
            ...dto,
            payment_method: paymentMethod,
            notes: note,
            expected_arrival: selectedExpectedArrival
        };
        let mappa = {};
        for(let d of cartG)
        {
            mappa[d.id]={quantita:d.quantity,added_ingredients:d.added_ingredients}
        }
        updatedDto["idPiattoToQuantita"]=mappa;
        axios.post("/delivery", updatedDto)
            .then((response) => {
                alert("Hooray, soon you will be able to taste our delicacies!!! YUM")
                // Effettua la navigazione o altre azioni necessarie dopo il completamento della richiesta
                navigate("/allrestaurants");
            })
            .catch((error) => {
                // Gestisci eventuali errori durante la richiesta
                console.error("Error while submitting the form:", error);
            });

    }

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    function handleConfirmed() {
        setShowConfirm(true);
    }
    
    return (
        <>
            <div className="container form-container p-5 mt-2 mb-5">
                <div className=" d-flex justify-content-center">
                    {!showConfirm &&
                        <form className="" onSubmit={handleConfirmed}>
                            {/* Delivery TIME*/}
                            <div className="mb-3 ">
                                <label htmlFor="inputTime" className="form-label">Choose delivery time</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={handleExpectedArrivalChange}
                                    value={selectedExpectedArrival}
                                >
                                    <option value="" disabled>Select arrival time</option>
                                    {expectedArrivalOptions.map((option, index) => (
                                        <option key={index} value={option}>{formatTime(option)}</option>
                                    ))}
                                </select>
                            </div>
                            {/* NOTE*/}
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Insert Notes</label>
                                <textarea rows="5"  type="note" className="form-control" id="inputNote" onChange={(e) => setNote(e.target.value)} placeholder="allergies, floor or intercom" />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-outline-success ">Confirm order</button>
                            </div>
                        </form>}
                    {showConfirm &&
                        <DeliveryConfirmed sendForm={sendForm} />}
                </div>
            </div>
        </>
    );
}

