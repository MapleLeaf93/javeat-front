import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { client } from "../../App";

export default function Navbar()
{
    const [loggato, setLoggato] = useAtom(client);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        if (loggato) {
            navigate("/allrestaurants");
        } else {
            navigate("/");
        }
    };

    const handleLogout = () => {
        // Imposta lo stato di `client` su null per indicare che l'utente non è più loggato
        setLoggato(null);
    
        // Rimuovi o aggiorna il valore in localStorage
        localStorage.removeItem('clientState'); // Oppure localStorage.setItem('clientState', JSON.stringify(null));
    
        // Reindirizza l'utente alla homepage o alla pagina di login
        navigate('/login'); // Assicurati di avere `useNavigate` hook da `react-router-dom`
    };

    return(
        <>
            <nav className="navbar navbar-expand-lg bg-warning ps-2 pe-5">
                <div className="container-fluid">
                    <img
                        className="p-0 rounded-4 m-1 logo-img"
                        src="https://pngimg.com/d/burger_king_PNG11.png"
                        alt="Logo"
                        onClick={handleLogoClick}
                    />
                    <div className="">
                        {loggato ? (
                            <button className="btn btn-outline-danger me-2" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <Link className="btn btn-outline-success me-2" to="/login">Login</Link>
                                <Link className="btn btn-outline-light" to="/register">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}