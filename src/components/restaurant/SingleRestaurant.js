import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { client } from "../../App";
import '../../styles.scss';


export default function SingleRestaurant(props) {
    const [user, setUser] = useAtom(client);
    //vedere tutti i ristoranti (solo nome, immagine, se APERTO, foodTypes e DISTANZA)

    return (
        <div className='col col-4'>
            <div className="card p-3 d-flex flex-column h-100">
                <img src={props.r.imgUrl} className="card-img-top img-overview" alt="Restaurant image" />
                <div className="card-body mt-auto">
                    <h3 className="card-title">{props.r.name}</h3>
                    <h4 className="card-title">{props.r.open ? "open" : "closed"}</h4>
                    <div>
                        {props.r.foodTypes.map((foodType, index) => (
                            <span key={index} className="badge me-2 bg-rasta-green">{foodType}</span>
                        ))}
                    </div>
                    <p className="card-text">distance: {props.r.distance}</p>
                    <Link className="btn  bg-rasta-green" to={"/restaurantsdetails/" + props.r.id}>Detail</Link>
                </div>
            </div>
        </div>
    );
    
    
    
}