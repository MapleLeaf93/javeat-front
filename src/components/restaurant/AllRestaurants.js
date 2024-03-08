import axios from "axios";
import { useAtom } from "jotai";
import { client } from "../../App";
import { useEffect, useRef, useState } from "react";
import SingleRestaurant from "./SingleRestaurant";
import '../../styles.scss';
import { faL } from "@fortawesome/free-solid-svg-icons";

export default function AllRestaurants() {
    //filtro in base a tipologia di cibo e DISTANZA
    const [restaurantToShow, setRestaurantToShow] = useState([]);
    const [loggato, setLoggato] = useAtom(client);
    const [restaurants, setRestaurants] = useState([]);
    const minDistance = Math.min(...restaurants.map(r => r.distance));
    const maxDistanceFilter = Math.max(...restaurants.map(r => r.distance));
    const [searchKeyword, setSearchKeyword] = useState("");
    const averageDistance = restaurants.reduce((total, r) => total + r.distance, 0) / restaurants.length;
    const [maxDistance, setMaxDistance] = useState("");
    const [flicker, setFlicker] = useState(false);
    const nomIn = useRef(null);
    const [boldText, setBoldText] = useState({});
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [checkboxes, setCheckboxes] = useState({
        italian: false,
        mexican: false,
        chinese: false,
        american: false,
        indian: false,
        desserts: false,
        glutenfree: false,
        grill: false,
        japanese: false,
        kebab: false,
        fish: false,
        vegan: false,
        vegetarian: false,
        salads: false,
        pizza: false,
        poke: false,
        hamburger: false,
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
        if (restaurants.length > 0) {
            const totalDistance = restaurants.reduce((total, r) => total + r.distance, 0);
            const averageDistance = (Math.round((totalDistance / restaurants.length) * 100) / 100).toFixed(0);
            setMaxDistance(averageDistance);
        }
    }, [restaurants]);


    useEffect(() => {
        const filtered = restaurants.filter((r) => {
            const restaurantFoodTypes = r.foodTypes.map((type) => type.toLowerCase());

            let res = true;
            res &= r.name.toLowerCase().includes(searchKeyword.toLowerCase());
            res &= r.distance <= maxDistance;
            let oneOrMoreSelected = false;
            let found = false;
            for (let type in checkboxes) {
                oneOrMoreSelected |= checkboxes[type]; // se le checkboxes sono false, oneOrMoreSelected resterà false
                if (checkboxes[type] && restaurantFoodTypes.includes(type))
                    found = true;
            }

            return res && (found || !oneOrMoreSelected);
        });

        setRestaurantToShow(filtered);
    }, [checkboxes, restaurants, searchKeyword, maxDistance]);

    const handleCheckboxChange = (foodTypes, isChecked) => {
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            // [foodTypes]: isChecked,
            [foodTypes]: !prevCheckboxes[foodTypes],
        }));
        setBoldText(prevBoldText => ({
            ...prevBoldText,
            [foodTypes]: !prevBoldText[foodTypes]
        }));
    };

    function filteredRestaurantsByName(e)
    {
        let key = e.target.value;
        setSearchKeyword(key);

    }

    return (
        <div className="">
            <div className="row">
                <div className="col-3 bg-dark">
                    <div className="px-3 text-center mt-5 border-top-1" >
                        <div className="input-group mb-3 justify-content-center row" >
                            {/* <label htmlFor="y" className="fw-bold form-label me-2 mb-3" style={{ color: "white" }}>Insert name</label> */}
                            <input id="y" className="input-group-text ms-4" placeholder="Search by name..." value={searchKeyword}  onChange={filteredRestaurantsByName} type="text" aria-label="Recipient's username" aria-describedby="button-addon2">
                            </input>
                        </div>
                        <div className="p-2 px-4 ">
                            <label htmlFor="customRange1" className="form-label" style={{ color: "white" }}>
                                <b>Distance</b> <br />
                                {maxDistance}
                            </label>
                            <input type="range" min={minDistance} max={maxDistanceFilter} onChange={(e) => setMaxDistance(e.target.value)} value={maxDistance} className="form-range " id="customRange1" />
                        </div>

                        {Object.keys(checkboxes).map((foodType) => (
                            <div className="p-2 px-4 row" key={foodType}>
                                <div className="col-6 d-flex justify-content-end " style={{ color: "white" }}>
                                    <span style={{ fontWeight: boldText[foodType] ? 'bold' : 'normal' }}>{foodType.charAt(0).toUpperCase() + foodType.slice(1)}</span>
                                </div>
                                <div className="col-6">
                                    <label className="switch d-flex justify-content-end" htmlFor={`${foodType}-checkbox`}>
                                        <input
                                            id={`${foodType}-checkbox`}
                                            type="checkbox"
                                            checked={checkboxes[foodType]}
                                            onChange={(e) => handleCheckboxChange(foodType, e.target.checked)}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* <div className="col-9 px-5 pt-4 pb-4 d-flex flex-wrap"> */}
                <div className="col-9  d-flex flex-wrap">
                <div className="row gy-4 my-4 mx-1">
                    {/* <div className="row gy-4 pt-4 px-3"> */}
                        {restaurantToShow && restaurantToShow.map((r) => (
                            <SingleRestaurant key={r.id} r={r} index={r.id} />
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}