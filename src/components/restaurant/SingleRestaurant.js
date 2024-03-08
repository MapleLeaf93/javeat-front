import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { client } from "../../App";
import '../../styles.scss';


export default function SingleRestaurant(props) {
    const [user, setUser] = useAtom(client);
    //vedere tutti i ristoranti (solo nome, immagine, se APERTO, foodTypes e DISTANZA)

    return (
        <div className='col-md-4' style={{minWidth:"310px"}}>
            {/* <div className='col-md-4' style={{minWidth:"220px"}}></div> */}
            <div className="card d-flex flex-column">
                <div>
                    <img src={props.r.imgUrl} className="card-img-top" alt="Restaurant image" style={{ Width: '100%', height: '200px', objectFit: 'cover' }} />
                </div>
                <div className="card-body d-flex row p-4">
                    <h3 className="card-title fw-bold">{props.r.name}</h3>
                    <h4 className="card-title">{props.r.open ? "open" : "closed"}</h4>
                    <div>
                        {props.r.foodTypes.map((foodType, index) => (
                            <span key={index} className="badge me-2 bg-rasta-green">{foodType}</span>
                        ))}
                    </div>
                    <div className="row align-items-center cart-item " style={{ marginTop: 'auto' }}>
                        <div className=" col ">
                            <p className="card-text">distance: {props.r.distance}</p>
                        </div>
                        <div className="col-auto mt-3">
                            <Link className="btn btn-rasta-green " to={"/restaurantsdetails/" + props.r.id}>Detail</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



}