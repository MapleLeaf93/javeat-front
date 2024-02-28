import { useState } from "react";

export default function RestaurantDetail()
{
    const { id } = useParams();
    const[restaurant, setRestaurant] = useState({});

    useEffect(() => {
        axios.get(`/restaurants/${id}`).then((resp) => {
            console.log("Dati ottenuti dalla richiesta API:", resp.data); // Verifica i dati ottenuti dalla richiesta API
           
            setRestaurant(resp.data);
        
        }).catch(error => {
            console.error('Errore durante il recupero dei dettagli della quest:', error);
        });
        }, [id, setQuest]);
    
        function save() {
            axios.put("/quests/" + id, quest).then(() => setUpdating(false));
          }
        
          function synchronize(e) {
            setQuest({ ...quest, [e.target.name]: e.target.value });
          }

    //Mostrare Menu diviso per categorie dei piatti
    //+
    // Creare Sistema di Aggiunta Piatti:
    //Aggiungere su ogni piatto del menù un pulsante per aggiungerlo alla delivery
    //Mostrare in una colonna a destra i nomi di tutti i piatti aggiunti, 
    //il prezzo di ognuno, il costo di consegna e il costo totale
    //Permettere in tale colonna l'aggiunta e la rimozione rapida di un piatto inserito
    //e aggiungere pulsante "buy" --> porta a deliveryCreation

 	return(
        <>
            <div className="container d-flex justify-content-center text-center">
                <div className="card">
                    <div className="card-body ">
                        <div className="mb-auto">
                            <h3 className="card-title"><b>Type:</b> {quest.type}</h3>
                            <h4 className="card-subtitle mb-2 text-muted">Rank: {quest.rank}</h4>
                            <h4 className="card-subtitle mb-2 text-muted">Status: {quest.status}</h4>
                            <h5 className="card-subtitle mb-2 text-muted">Reward: {quest.reward}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Area: {quest.area}</h6>
                            {quest.date_completed ? (
                            <>
                                <div>
                                <h6 className="card-subtitle mb-2 text-muted">Date Completed: {quest.date_completed}</h6>
                                </div>
                            </>
                        ) : null}
                            <p> Description: {quest.description}</p>
                        </div>
                        <div className="mt-auto">
                            <img style={{ width: "100%", maxWidth: "300px" }} src={quest.map_url} alt="Map" />
                        </div>
                        
                        {(guild || party) && (guild.id || party.id) == questOwner ? (
                            <>
                                <div>
                                    <Link className='btn btn-outline-dark mt-3' to={"/questupdate/"+quest.id}>Update</Link>
                                    <Link className='btn btn-outline-danger mt-3'>Delete</Link>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>

        </>
    )

}

