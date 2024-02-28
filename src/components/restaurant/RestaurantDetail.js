    //Mostrare Menu diviso per categorie dei piatti
    //+
    // Creare Sistema di Aggiunta Piatti:
    //Aggiungere su ogni piatto del menù un pulsante per aggiungerlo alla delivery
    //Mostrare in una colonna a destra i nomi di tutti i piatti aggiunti, 
    //il prezzo di ognuno, il costo di consegna e il costo totale
    //Permettere in tale colonna l'aggiunta e la rimozione rapida di un piatto inserito
    //e aggiungere pulsante "buy" --> porta a deliveryCreation

    import { useState, useEffect } from "react";
    import { useParams, Link } from "react-router-dom";
    import axios from "axios";
    
    export default function RestaurantDetail() {
        const { id } = useParams();
        const [restaurant, setRestaurant] = useState({});
        const [updating, setUpdating] = useState(false);
    
        useEffect(() => {
            axios.get(`/restaurants/${id}`).then((resp) => {
                setRestaurant(resp.data);
            }).catch(error => {
                console.error('Errore durante il recupero dei dettagli del ristorante:', error);
            });
        }, [id]);
    
    
        // Implementa la logica per mostrare il menu diviso per categorie dei piatti e gestire l'aggiunta/rimozione di piatti
    
        return (
            <div className="container d-flex justify-content-center text-center">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-auto">
                            <h3 className="card-title"><b>Name:</b> {restaurant.name}</h3>
                            <img className="card-img-top" src={restaurant.phone}/>
                            <h3 className="">Phone: {restaurant.phone}</h3>
                            <h3 className="">Open at: {restaurant.openingHour} - Close at: {restaurant.closingHour}</h3>
                        </div>
                        <div className="mt-auto">
                            {/* Aggiungi la logica per mostrare il menu del ristorante */}
                            {/* Esempio: <MenuComponent menu={restaurant.menu} /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }