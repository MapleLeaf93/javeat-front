import axios from "axios";
import { useAtom } from "jotai";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { dtoDelivery } from "../../App";

export default function DeliveryConfirmed() {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("");
    const [dto,setDto] = useAtom(dtoDelivery);
    

    function sendForm() {
        const updatedDto = { ...dto, payment_method: paymentMethod };
        console.log(dto+" prima"); //undefined
        axios.post("/delivery", updatedDto)
            .then((response) => {
                // Effettua la navigazione o altre azioni necessarie dopo il completamento della richiesta
                navigate("/deliveryconfirmed");
                console.log(updatedDto+" dopo")
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