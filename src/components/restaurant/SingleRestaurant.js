import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { client } from "../../App";


export default function SingleRestaurant(props) {
    const [user, setUser] = useAtom(client);
    //vedere tutti i ristoranti (solo nome, immagine, se APERTO, foodTypes e DISTANZA)

    return (
        <><div className='col col-md-3'>
            <div className="card" >
                <img src={props.r.imgUrl} className="card-img-top" alt="Restaurant image" style={{ width: "100%", height: "100%" }} />
                <div className="card-body">
                    <h3 className="card-title">{props.r.name}</h3>
                    <h4 className="card-title">{props.r.open ? "open" : "closed"}  </h4>
                    <div >
                        {props.r.foodTypes.map((foodType, index) => (
                            <span key={index} className="badge bg-primary me-2">{foodType}</span>
                        ))}
                    </div>

                    <p className="card-text">distance: {props.r.distance}</p>
                    <Link className="btn btn-primary" to={"/restaurants/" + user.id + "/" + props.r.id} >Detail</Link>
                </div>
            </div>
        </div>
        </>
    );
}