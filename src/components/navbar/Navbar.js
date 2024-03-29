import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { client } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react";

export default function Navbar() {
    const [loggato, setLoggato] = useAtom(client);
    const navigate = useNavigate();

    const handleLogoClick = () => {
            navigate("/");
    };

    const handleLogout = () => {
        // Imposta lo stato di `client` su null per indicare che l'utente non è più loggato
        setLoggato(null);

        // Rimuovi o aggiorna il valore in localStorage
        localStorage.removeItem('clientState'); // Oppure localStorage.setItem('clientState', JSON.stringify(null));

        // Reindirizza l'utente alla homepage o alla pagina di login
        navigate('/login'); // Assicurati di avere `useNavigate` hook da `react-router-dom`
    };



    return (
        <>
            <nav className="navbar navbar-expand-lg bg-rasta-orange">
                <div className="container-fluid">
                    <img
                        className="p-0 rounded-4 m-1 logo-img"
                        src="https://cdn.discordapp.com/attachments/1211974633369116723/1213082430123278377/J_1.png?ex=65f42e0d&is=65e1b90d&hm=2a04bd4dc2956ae109c73d72ff15b3cf973e8c089bdc0c852d35e68f378ab032&"
                        alt="Logo"
                        onClick={handleLogoClick}
                    />

                    {loggato ? (<>
                        <Link className="fw-semibold btn btn-rasta-navbar p-2 ps-5 pe-5 d-flex justify-content-start" to="/allrestaurants">All Restaurants</Link>
                        <h6>Hi {loggato.name}!</h6>
                        <Link className="fw-semibold btn btn-rasta-navbar me-3 p-2 ps-5 pe-5 d-flex justify-content-start" to="/myorders">My Orders</Link>
                    </>
                    ) : (
                        <></>
                    )}
                    <div className="">
                        {loggato ? (
                            <div>

                                <button className="btn btn-outline-danger me-2" onClick={handleLogout}>Logout  <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
                            </div>

                        ) : (
                            <>
                                <Link className="btn bg-rasta-yellow me-2" to="/login">Login</Link>
                                <Link className="btn btn-outline-light" to="/register">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav >
        </>
    );
}