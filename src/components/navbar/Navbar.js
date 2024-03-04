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
        if (loggato) {
            navigate("/");
        } else {
            navigate("/login");
        }
    };

    const handleLogout = () => {
        // Imposta lo stato di `client` su null per indicare che l'utente non è più loggato
        setLoggato(null);

        // Rimuovi o aggiorna il valore in localStorage
        localStorage.removeItem('clientState'); // Oppure localStorage.setItem('clientState', JSON.stringify(null));

        // Reindirizza l'utente alla homepage o alla pagina di login
        navigate('/'); // Assicurati di avere `useNavigate` hook da `react-router-dom`
    };



    return (
        <>
            <nav className="navbar navbar-expand-lg bg-rasta-orange ps-2 pe-5">
                <div className="container-fluid">
                    <img
                        className="p-0 rounded-4 m-1 logo-img"
                        src="https://cdn.discordapp.com/attachments/1211974633369116723/1213082430123278377/J_1.png?ex=65f42e0d&is=65e1b90d&hm=2a04bd4dc2956ae109c73d72ff15b3cf973e8c089bdc0c852d35e68f378ab032&"
                        alt="Logo"
                        onClick={handleLogoClick}
                    />
                    {loggato && (
                        <div className="d-flex justify-content-start align-items-center flex-grow-1">
                            <Link className="mx-3 my-auto btn bg-rasta-yellow" to="/myorders">My Orders</Link>
                        </div>
                    )}
                    {loggato ? (
                        <div className="d-flex justify-content-end">
                            <p className="me-3 my-auto">{loggato.mail.split('@')[0]}</p>
                            <button className="btn btn-outline-danger me-2" onClick={handleLogout}>
                                Logout <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            </button>
                        </div>
                    ) : (
                        <div className="ms-auto">
                            <Link className="btn btn-rasta-yellow me-2" to="/login">
                                Login
                            </Link>
                            <Link className="btn btn-outline-light" to="/register">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}