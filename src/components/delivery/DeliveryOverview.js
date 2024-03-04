import { useAtom } from "jotai";
import { client } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";


export default function DeliveryOverview() {
    const [loggato, setLoggato] = useAtom(client);
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        // id utente loggato nel contesto globale
        axios.get("/delivery/" + loggato.id).then(
            response => {
                if (response.status === 200) {
                    // Se la risposta ha successo, aggiorna lo stato con i dati
                    setDeliveries(response.data);
                } else {
                    // Se la risposta non ha successo, gestisci l'errore
                    console.error("Errore durante il recupero degli ordini:", response.statusText);
                }
            }
        ).catch(error => {
            // Gestisci eventuali errori durante la richiesta
            console.error("Errore durante la richiesta:", error);
        });
    }, []);


    return (
        <>
            <div className="container my-5">
                <h2 className="mb-4">Your Order History</h2>
                {deliveries.length > 0 ? (
                    <ul>
                        {deliveries.map((delivery) => (
                            <li key={delivery.id}>
                                <strong>Order ID:</strong> {delivery.id} - <strong>Delivery Time:</strong>{" "}
                                {delivery.expected_arrival} - <strong>Payment Method:</strong>{" "}
                                {delivery.payment_method} - <strong>Notes:</strong> {delivery.notes}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </>
    );
}