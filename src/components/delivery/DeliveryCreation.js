import { useAtom } from "jotai";
import { cartGlobal, client } from "../../App";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function DeliveryCreation() {
    //scegliere l'orario di consegna (solo in giornata) a scatti di 15 minuti 
    //(a partire da ora attuale + 2 min per unità di distanza) e si devono poter inserire 
    //delle note (allergie, scala, citofono e simili)

    //Una volta confermato l'orario portare ad una pagina dove viene scelto 
    //il pagamento e confermato l'ordine--> deliveryConfirmed
    const navigate = useNavigate();
    const [user, setUser] = useAtom(client);
    const [cartG,setCartG] = useAtom (cartGlobal);
    const { r_id } = useParams();
    const [dto,setDto] = useState(
        {
            user_id:user.id,
            restaurant_id:r_id,
            dishesDeliveries:cartG
        }
    )

    function sendForm()
    {
        axios.post("/delivery",dto)
        .then((response)=>{
            //navigate("/deliveryconfirmed")
        }
        );
    }


    return (
        <>
            <div className="col ">
                <form>
                    <div className="mb-3">
                        <label htmlFor="inputTime" className="form-label">Choose delivery time</label>
                        <div>
                            <input
                                type="number"
                                min="0"
                                max="23"
                                placeholder="HH"
                                name="hours"
                                value=""
                                onChange=""
                            /> :
                            <input
                                type="number"
                                min="0"
                                max="59"
                                step="15"
                                placeholder="MM"
                                name="minutes"
                                value=""
                                onChange=""
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Insert notes</label>
                        <input type="note" className="form-control" id="inputNote" placeholder="allergie, scala, citofono e simili" />
                    </div>
                    <Link type="submit" className="btn btn-primary" onClick={sendForm} to="/deliveryconfirmed">Confirm order</Link>
                </form>
            </div>
        </>
    );
}

