import axios from "axios";
import { useAtom } from "jotai";
import { client } from "../../App";
import { useEffect, useState } from "react";
import SingleRestaurant from "./SingleRestaurant";

export default function AllRestaurants() {
    //filtro in base a tipologia di cibo e DISTANZA


    const [restaurantToShow, setRestaurantToShow] = useState([]);
    const [loggato, setLoggato] = useAtom(client);
    const [restaurants, setRestaurants] = useState([]);
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

        //     return (
        //         (!checkboxes.american || r.foodTypes.toLowerCase().includes("american")) &&
        //         (!checkboxes.italian || r.foodTypes.toLowerCase().includes("italian")) &&
        //         (!checkboxes.mexican || r.foodTypes.toLowerCase().includes("mexican")) &&
        //         (!checkboxes.chinese || r.foodTypes.toLowerCase().includes("chinese")) &&
        //         (!checkboxes.indian || r.foodTypes.toLowerCase().includes("indian"))
        //     );
        // });
        setRestaurantToShow(filtered);
    }, [checkboxes, restaurants]);

    const handleCheckboxChange = (foodTypes) => {
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [foodTypes]: !prevCheckboxes[foodTypes],
        }));
    };


    return (
        <>
            <div className="text-center">
                <div className="row">
                    <div className="sticky-top col col-4" >
                        <div className=" card px-3 mx-4 py-3 bg-warning" >
                            <div className="p-2 px-4" >
                                <label htmlFor="customRange1" className="form-label" style={{ color: "white" }}>distance</label>
                                <input type="range" className="form-range" id="customRange1" />
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
                </div>
            </div>

            <div className="col col-8 px-4">
                <div className="row">
                    {restaurantToShow && restaurantToShow.map((r) => <SingleRestaurant key={r.id} r={r} index={r.id} />)}
                </div>
            </div>
        </>
    );
}