import { useAtom } from "jotai";
import { cartGlobal, client } from "../../App";
import { useState, useEffect} from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DeliveryConfirmed from "./DeliveryConfirmed";

export default function DeliveryCreation() {
    //scegliere l'orario di consegna (solo in giornata) a scatti di 15 minuti 
    //(a partire da ora attuale + 2 min per unità di distanza) e si devono poter inserire 
    //delle note (allergie, scala, citofono e simili)

    //Una volta confermato l'orario portare ad una pagina dove viene scelto 
    //il pagamento e confermato l'ordine--> deliveryConfirmed
    const navigate = useNavigate();
    const [user, setUser] = useAtom(client);
    const [cartG, setCartG] = useAtom(cartGlobal);
    const { r_id, dist } = useParams();
    const [distance, setDistance] = useState(dist);
    const [expectedArrivalOptions, setExpectedArrivalOptions] = useState([]);
    const [selectedExpectedArrival, setSelectedExpectedArrival] = useState("");
    const [note, setNote] = useState("");

    const [dto, setDto] = useState({
        user_id: user.id,
        restaurant_id: r_id,
        idPiattoToQuantita: cartG.reduce((accumulator, dishtodelivery) => {
            accumulator[dishtodelivery.id] = dishtodelivery.quantity;
            return accumulator;
        }, {}),
        expected_arrival: selectedExpectedArrival,
        payment_method: "",
        notes: note
    });

    useEffect(() => {

        // Calcola l'orario di consegna previsto
        const calculateExpectedArrival = () => {
            const baseTime = new Date();  // Orario attuale
            const deliveryTimeOptions = [];

            // Calcolo del tempo di consegna previsto per opzioni specifiche (ogni 15 minuti)
            for (let i = 0; i < 4; i++) {
                const deliveryTime = new Date(baseTime);
                const minutesToAdd = (i + 1) * 15 + distance * 2;  // Aggiungi 15 minuti più 2 minuti per unità di distanza
                deliveryTime.setMinutes(baseTime.getMinutes() + minutesToAdd);
                deliveryTimeOptions.push(deliveryTime);
            }

            return deliveryTimeOptions;
        };

        // Imposta le opzioni di orario di consegna previsto nello stato
        setExpectedArrivalOptions(calculateExpectedArrival());

    }, []); // Dipendenza vuota per eseguire l'effetto solo al montaggio del componente

    // Funzione per gestire il cambiamento dell'orario di consegna selezionato
    const handleExpectedArrivalChange = (e) => {
        setSelectedExpectedArrival(e.target.value);
    };


    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    return (
        <>
            <div className="col ">
                <form>
                    {/* Delivery TIME*/}
                    <div className="mb-3">
                        <label htmlFor="inputTime" className="form-label">Choose delivery time</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handleExpectedArrivalChange}
                            value={selectedExpectedArrival}
                        >
                            <option value="" disabled>Select One</option>
                            {expectedArrivalOptions.map((option, index) => (
                                <option key={index} value={option}>{formatTime(option)}</option>
                            ))}
                        </select>
                    </div>
                    

                    {/* NOTE*/}
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Insert Notes</label>
                        <input type="note" className="form-control" id="inputNote" onChange={setNote} placeholder="allergies, floor, intercom and similar" />
                    </div>

                    <Link type="submit" className="btn btn-primary"  to={"/deliveryconfirmed/"+dto}>Confirm order</Link>
                    {/* <DeliveryConfirmed dto={dto} /> */}
                </form>
            </div>
        </>
    );
}

