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
                        // style={{ width: "75px", height: "60px" }}
                        src=""
                        alt="Logo"
                        onClick=""
                    />

                    <div className="navbar-nav">
                        <Link className="btn btn-outline-light text-light me-2" to="/login"><h3>Login</h3></Link>
                        <Link className="btn btn-outline-light text-light" to="/register"><h3>Register</h3></Link>
                    </div>
                </div>
            </nav>
        </>
    );
}