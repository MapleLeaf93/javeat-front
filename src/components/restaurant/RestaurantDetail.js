    //Mostrare Menu diviso per categorie dei piatti
    //+
    // Creare Sistema di Aggiunta Piatti:
    //Aggiungere su ogni piatto del menù un pulsante per aggiungerlo alla delivery
    //Mostrare in una colonna a destra i nomi di tutti i piatti aggiunti, 
    //il prezzo di ognuno, il costo di consegna e il costo totale
    //Permettere in tale colonna l'aggiunta e la rimozione rapida di un piatto inserito
    //e aggiungere pulsante "buy" --> porta a deliveryCreation

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";

export default function RestaurantDetail() {
    const { resId } = useParams();
    const [restaurant, setRestaurant] = useState(null); // Cambiato in null per gestire meglio il caricamento
    const [utente, setUtente] = useAtom(client);

    useEffect(() => {
        axios.get(`/restaurant/full/${utente.id} /${resId}`)
        .then((resp) => {
            setRestaurant(resp.data);
        }).catch(error => {
            console.error('Errore durante il recupero dei dettagli del ristorante:', error);
        });
    }, [utente.id, resId]);

    // Funzione per raggruppare e visualizzare i piatti per categoria
    const renderDishesByCategory = (menu) => {
        if (!menu) return <p>Caricamento menu...</p>;

        const groupedDishes = menu.reduce((acc, dish) => {
            const category = dish.category || 'Altro';
            acc[category] = [...(acc[category] || []), dish];
            return acc;
        }, {});

        return Object.entries(groupedDishes).map(([category, dishes]) => (
            <div key={category}>
                <h4>{category}</h4>
                {dishes.map(dish => (
                    <div key={dish.id}>
                        <span>{dish.name} - Prezzo: {dish.price}€</span>
                        {/* Qui potresti aggiungere i pulsanti per aggiungere/rimuovere i piatti */}
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div className="container d-flex justify-content-center text-center">
            <div className="card">
                <div className="card-body">
                    {restaurant ? (
                        <>
                            <div className="mb-auto">
                                <h2 className="card-title"><b>Name:</b> {restaurant.name}</h2>
                                <img className="card-img-top" src={restaurant.imgUrl} alt="Restaurant" style={{ maxWidth: '100%', height: 'auto' }}/>
                                <p>Phone: {restaurant.phone}</p>
                                <p>Open at: {restaurant.openingHour} - Close at: {restaurant.closingHour}</p>
                            </div>
                            <div className="mt-auto">
                                {renderDishesByCategory(restaurant.menu)}
                            </div>
                        </>
                    ) : (
                        <p>Caricamento dettagli del ristorante...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
