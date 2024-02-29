import axios from "axios";

import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { dtoDelivery } from "../../App";

export default function DeliveryConfirmed({sendForm}) {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("");
    

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
            <button type="submit" className="btn btn-primary" onClick={()=>sendForm(paymentMethod)}>Confirm order</button>
            </div>
        </>
    );

}