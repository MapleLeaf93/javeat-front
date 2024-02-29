import axios from "axios";
import { useAtom } from "jotai";
import { client } from "../../App";
import { useEffect, useRef, useState } from "react";
import SingleRestaurant from "./SingleRestaurant";
import '../../styles.css';

export default function AllRestaurants() {
    //filtro in base a tipologia di cibo e DISTANZA
    const [restaurantToShow, setRestaurantToShow] = useState([]);
    const [loggato, setLoggato] = useAtom(client);
    const [restaurants, setRestaurants] = useState([]);
    const [maxDistance, setMaxDistance] = useState(500);
    const [checkboxes, setCheckboxes] = useState({
        italian: false,
        mexican: false,
        chinese: false,
        american: false,
        indian: false,
    });

    useEffect(() => {
        //id utente loggato nel contesto globale
        axios.get("/restaurants/" + loggato.id).then(
            response => {
                setRestaurants(response.data);
                setRestaurantToShow(response.data);
            }
        )

    }, []);

    useEffect(() => {
        const filtered = restaurants.filter((r) => {
            const restaurantFoodTypes = r.foodTypes.map((type) => type.toLowerCase());
            return (
                (!checkboxes.american || restaurantFoodTypes.includes("american")) &&
                (!checkboxes.italian || restaurantFoodTypes.includes("italian")) &&
                (!checkboxes.mexican || restaurantFoodTypes.includes("mexican")) &&
                (!checkboxes.chinese || restaurantFoodTypes.includes("chinese")) &&
                (!checkboxes.indian || restaurantFoodTypes.includes("indian"))
            );
        });

        setRestaurantToShow(filtered);
    }, [checkboxes, restaurants]);

    const handleCheckboxChange = (foodTypes) => {
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [foodTypes]: !prevCheckboxes[foodTypes],
        }));
    };

    function isShowable(r, maxdistance) {
        if (r.distance > maxdistance)
            return false;

        return true;
    }

    return (
        <div className="">
            <div className="row">
                <div className="col-3 bg-warning text">
                    <hr/>
                    <div className="px-3 text-center">
                        <div className="p-2 px-4" >
                            <label htmlFor="customRange1" className="form-label" style={{ color: "white" }}><b>Distance</b> <br/>{maxDistance}</label>
                            <input type="range" min={0} max={1000} onChange={(e) => setMaxDistance(e.target.value)} value={maxDistance} className="form-range" id="customRange1" />
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Italian
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.italian}
                                            onChange={() => handleCheckboxChange("italian")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        American
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.american}
                                            onChange={() => handleCheckboxChange("american")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Mexican
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.mexican}
                                            onChange={() => handleCheckboxChange("mexican")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Chinese
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.chinese}
                                            onChange={() => handleCheckboxChange("chinese")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Indian
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.indian}
                                            onChange={() => handleCheckboxChange("indian")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-9 px-4 pt-4">
                    <div className="row gy-4">
                        {restaurantToShow && restaurantToShow.filter(r => isShowable(r, maxDistance)).map((r) => (
                            <SingleRestaurant key={r.id} r={r} index={r.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}