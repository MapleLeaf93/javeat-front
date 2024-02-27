import axios from "axios";
import { useAtom } from "jotai";
import { client } from "../../App";
import { useEffect, useState } from "react";
import SingleRestaurant from "./SingleRestaurant";

export default function AllRestaurants() {
    //filtro in base a tipologia di cibo e DISTANZA
    
    
    
    const [loggato, setLoggato] = useAtom(client);
    const [restaurants, setRestaurants] = useState([]);

    if (Object.keys(loggato).length == 0) {
        setLoggato(JSON.parse(localStorage.getItem.apply('clientState')));
    }

    useEffect(() => {
                                //id utente loggato nel contesto globale
        axios.get("/restaurants/"+loggato.id).then(
            response => {
                setRestaurants(response.data);
            }
        )

    }, []);

    return (
        <>
            <div>
            {restaurants && restaurants.map((r)=><SingleRestaurant key={r.id} r={r} index={r.id}/>)}
            </div>
        </>
    );
}