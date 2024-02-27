import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar()
{
    return(
        <>
            <nav className="mb-3 navbar navbar-expand-lg bg-warning">
                <div className="container-fluid">
                    <img
                        className="p-0 rounded-4 m-1"
                        style={{ width: "60px"}}
                        src="https://pngimg.com/d/burger_king_PNG11.png"
                        alt="Logo"
                        onClick=""
                    />

                    <div className="navbar-nav">
                        <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                        <Link className="btn btn-outline-light" to="/register">Register</Link>
                    </div>
                </div>
            </nav>
        </>
    );
}