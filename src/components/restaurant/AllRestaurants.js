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

        asianfusion: false,
        beverages: false,
        desserts: false,
        fishchips: false,
        fried: false,
        glutenfree: false,
        healthy: false,
        grill: false,
        icecream: false,
        japanese: false,
        kebab: false,
        kosher: false,
        latinamerican: false,
        fish: false,
        vegan: false,
        vegetarian: false,
        sandwich: false,
        salads: false,
        pinsa: false,
        pizza: false,
        poke: false,
        hamburger: false,
        sweets: false
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
                (!checkboxes.indian || restaurantFoodTypes.includes("indian")) &&
                (!checkboxes.asianfusion || restaurantFoodTypes.includes("asianfusion")) &&
                (!checkboxes.beverages || restaurantFoodTypes.includes("beverages")) &&
                (!checkboxes.desserts || restaurantFoodTypes.includes("desserts")) &&
                (!checkboxes.fishchips || restaurantFoodTypes.includes("fishchips")) &&
                (!checkboxes.fried || restaurantFoodTypes.includes("fried")) &&
                (!checkboxes.glutenfree || restaurantFoodTypes.includes("glutenfree")) &&
                (!checkboxes.healthy || restaurantFoodTypes.includes("healthy")) &&
                (!checkboxes.grill || restaurantFoodTypes.includes("grill")) &&
                (!checkboxes.icecream || restaurantFoodTypes.includes("icecream")) &&
                (!checkboxes.japanese || restaurantFoodTypes.includes("japanese")) &&
                (!checkboxes.kebab || restaurantFoodTypes.includes("kebab")) &&
                (!checkboxes.kosher || restaurantFoodTypes.includes("kosher")) &&
                (!checkboxes.latinamerican || restaurantFoodTypes.includes("latinamerican")) &&
                (!checkboxes.fish || restaurantFoodTypes.includes("fish")) &&
                (!checkboxes.vegan || restaurantFoodTypes.includes("vegan")) &&
                (!checkboxes.vegetarian || restaurantFoodTypes.includes("vegetarian")) &&
                (!checkboxes.sandwich || restaurantFoodTypes.includes("sandwich")) &&
                (!checkboxes.salads || restaurantFoodTypes.includes("salads")) &&
                (!checkboxes.pinsa || restaurantFoodTypes.includes("pinsa")) &&
                (!checkboxes.pizza || restaurantFoodTypes.includes("pizza")) &&
                (!checkboxes.poke || restaurantFoodTypes.includes("poke")) &&
                (!checkboxes.hamburger || restaurantFoodTypes.includes("hamburger")) &&
                (!checkboxes.sweets || restaurantFoodTypes.includes("sweets"))

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
                    <hr />
                    <div className="px-3 text-center" >
                        <div className="p-2 px-4" >
                            <label htmlFor="customRange1" className="form-label" style={{ color: "white" }}><b>Distance</b> <br />{maxDistance}</label>
                            <input type="range" min={0} max={1000} onChange={(e) => setMaxDistance(e.target.value)} value={maxDistance} className="form-range" id="customRange1" />
                        </div>
                        <div className="p-2 px-4"  >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>

                                        <input className="ms-2 me-2 "
                                            type="checkbox"
                                            checked={checkboxes.italian}
                                            onChange={() => handleCheckboxChange("italian")}
                                        />
                                        Italian
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>

                                        <input className="ms-2 me-2 "
                                            type="checkbox"
                                            checked={checkboxes.american}
                                            onChange={() => handleCheckboxChange("american")}
                                        />
                                        American
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
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Asianfusion
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.asianfusion}
                                            onChange={() => handleCheckboxChange("asianfusion")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Pinsa
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.pinsa}
                                            onChange={() => handleCheckboxChange("pinsa")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Pizza
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.pizza}
                                            onChange={() => handleCheckboxChange("pizza")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Poke
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.poke}
                                            onChange={() => handleCheckboxChange("poke")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Hamburger
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.hamburger}
                                            onChange={() => handleCheckboxChange("hamburger")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Beverages
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.beverages}
                                            onChange={() => handleCheckboxChange("beverages")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Fishchips
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.fishchips}
                                            onChange={() => handleCheckboxChange("fishchips")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Fried
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.fried}
                                            onChange={() => handleCheckboxChange("fried")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Gluten free
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.glutenfree}
                                            onChange={() => handleCheckboxChange("glutenfree")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Healthy
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.healthy}
                                            onChange={() => handleCheckboxChange("healthy")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Grill
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.grill}
                                            onChange={() => handleCheckboxChange("grill")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Ice cream
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.icecream}
                                            onChange={() => handleCheckboxChange("icecream")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 px-4" >
                            <div className="text-left">
                                <div >
                                    <label style={{ color: "white" }}>
                                        Japanese
                                        <input className="ms-2"
                                            type="checkbox"
                                            checked={checkboxes.japanese}
                                            onChange={() => handleCheckboxChange("japanese")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="p-2 px-4" >
                                <div className="text-left">
                                    <div >
                                        <label style={{ color: "white" }}>
                                            Kebab
                                            <input className="ms-2"
                                                type="checkbox"
                                                checked={checkboxes.kebab}
                                                onChange={() => handleCheckboxChange("kebab")}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 px-4" >
                                <div className="text-left">
                                    <div >
                                        <label style={{ color: "white" }}>
                                            Kosher
                                            <input className="ms-2"
                                                type="checkbox"
                                                checked={checkboxes.kosher}
                                                onChange={() => handleCheckboxChange("kosher")}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 px-4" >
                                <div className="text-left">
                                    <div >
                                        <label style={{ color: "white" }}>
                                            Latinamerican
                                            <input className="ms-2"
                                                type="checkbox"
                                                checked={checkboxes.latinamerican}
                                                onChange={() => handleCheckboxChange("latinamerican")}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 px-4" >
                                <div className="text-left">
                                    <div >
                                        <label style={{ color: "white" }}>
                                            Fish
                                            <input className="ms-2"
                                                type="checkbox"
                                                checked={checkboxes.fish}
                                                onChange={() => handleCheckboxChange("fish")}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 px-4" >
                                <div className="text-left">
                                    <div >
                                        <label style={{ color: "white" }}>
                                            Vegan
                                            <input className="ms-2"
                                                type="checkbox"
                                                checked={checkboxes.vegan}
                                                onChange={() => handleCheckboxChange("vegan")}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 px-4" >
                                <div className="text-left">
                                    <div >
                                        <label style={{ color: "white" }}>
                                            Vegetarian
                                            <input className="ms-2"
                                                type="checkbox"
                                                checked={checkboxes.vegetarian}
                                                onChange={() => handleCheckboxChange("vegetarian")}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 px-4" >
                                <div className="text-left">
                                    <div >
                                        <label style={{ color: "white" }}>
                                            Sandwich
                                            <input className="ms-2"
                                                type="checkbox"
                                                checked={checkboxes.sandwich}
                                                onChange={() => handleCheckboxChange("sandwich")}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 px-4" >
                                <div className="text-left">
                                    <div >
                                        <label style={{ color: "white" }}>
                                            Salads
                                            <input className="ms-2"
                                                type="checkbox"
                                                checked={checkboxes.salads}
                                                onChange={() => handleCheckboxChange("salads")}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 px-4" >
                                <div className="text-left">
                                    <div >
                                        <label style={{ color: "white" }}>
                                            Desserts
                                            <input className="ms-2"
                                                type="checkbox"
                                                checked={checkboxes.desserts}
                                                onChange={() => handleCheckboxChange("desserts")}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 px-4" >
                                <div className="text-left">
                                    <div >
                                        <label style={{ color: "white" }}>
                                            Sweets
                                            <input className="ms-2"
                                                type="checkbox"
                                                checked={checkboxes.sweets}
                                                onChange={() => handleCheckboxChange("sweets")}
                                            />
                                        </label>
                                    </div>
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