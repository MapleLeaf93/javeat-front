import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function DeliveryConfirmed({dto}) {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("");
    // const {dto} = useParams();
    // // Funzione per aggiornare il DTO con il campo payment_method
    // const updateDtoWithPaymentMethod = (paymentMethod) => {
    // const updatedDto = { ...JSON.parse(dto), payment_method: paymentMethod };
    // return updatedDto;
    // };



    function sendForm() {
        const updatedDto = { ...dto, payment_method: paymentMethod };
        axios.post("/delivery", updatedDto)
            .then((response) => {
                // Effettua la navigazione o altre azioni necessarie dopo il completamento della richiesta
                navigate("/deliveryconfirmed");
            })
            .catch((error) => {
                // Gestisci eventuali errori durante la richiesta
                console.error("Errore durante l'invio del modulo:", error);
            });
    }

    const handlePaymentMethodChange = (e) => {
        const value = e.target.value;
        setPaymentMethod(value);
    };

    return (
      
        <>
            < div >
                <label htmlFor="inputTime" className="form-label">Choose Payment Method</label>
                <select
                    className="form-select"
                    aria-label="Default select example"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                >
                    <option value="" disabled>Select One</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Credit/Debit Card">Credit/Debit Card</option>
                    <option value="Cash">Cash</option>
                </select>
            </div >
            <div>
            <button type="submit" className="btn btn-primary" onClick={sendForm} to="/deliveryconfirmed">Confirm order</button>
            </div>
        </>
    );

}