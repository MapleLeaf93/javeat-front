import axios from "axios";
import { useEffect, useState } from "react";

export default function AllRestaurants()
{
    //filtro in base a tipologia di cibo e DISTANZA
    //+
    //vedere tutti i ristoranti (solo nome, immagine, se APERTO, foodTypes e DISTANZA)

    const [restaurants, setRestaurants] = useState([]);
    useEffect(()=>{

        axios.get("/reastaurants").then(
            response => {
                setRestaurants(response.data);
            }
        )

    },[]);
}