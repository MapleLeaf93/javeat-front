import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { client } from "../../App";
import '../../styles.scss';


export default function SingleRestaurant(props) {
    const [user, setUser] = useAtom(client);
    //vedere tutti i ristoranti (solo nome, immagine, se APERTO, foodTypes e DISTANZA)

    return (
        <div className='col col-4'>
            <div className="card  d-flex flex-column h-100">
                <img src={props.r.imgUrl} className="card-img-top" alt="Restaurant image" style={{ Width: '100%', height: '200px', objectFit: 'cover' }} />
                <div className="card-body mt-auto p-4">
                    <h3 className="card-title fw-bold">{props.r.name}</h3>
                    <h4 className="card-title">{props.r.open ? "open" : "closed"}</h4>
                    <div>
                        {props.r.foodTypes.map((foodType, index) => (
                            <span key={index} className="badge me-2 bg-rasta-green">{foodType}</span>
                        ))}
                    </div>
                    <div className="row align-items-center cart-item" style={{ marginTop: 'auto' }}>
                        <div className=" col ">
                            <p className="card-text">distance: {props.r.distance}</p>
                        </div>
                        <div className="col-auto">
                            <Link className="btn bg-rasta-green " to={"/restaurantsdetails/" + props.r.id}>Detail</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



}