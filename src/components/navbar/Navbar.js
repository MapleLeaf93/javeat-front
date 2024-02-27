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
                        <Link className="text-white btn btn-outline-light me-2 " to="/"><h4>Login</h4></Link>
                        <Link className="text-white btn btn-outline-light  " to="/"><h4>Register</h4></Link>
                    </div>
                </div>
            </nav>
        </>
    );
}