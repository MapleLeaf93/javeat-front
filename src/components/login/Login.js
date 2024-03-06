import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { client } from "../../App";
import { useAtom } from 'jotai';
import '../../styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'


export default function Login() {
    const [data, setData] = useAtom(client);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [login, setLogin] = useState(
        {
            mail: "",
            password: ""
        }
    );

    function synchronize(e) {
        let clone = { ...login };
        clone[e.target.name] = e.target.value;
        setLogin(clone);
    }

    function sendForm() {
        axios.post("/login", login)
            .then((response) => {

                setData(response.data);
                navigate("/allrestaurants");

            }
            )
            .catch((error) => {
                if (error.response) {
                    if (error.response.status == 401) {
                        setErrorMessage("Invalid credentials. Please check your mail and password.");
                    } else if (error.response.status == 404) {
                        setErrorMessage("Account not found. Please check the mail.");
                    } else {
                        setErrorMessage("Invalid credentials. Please check your mail and password.");
                    }
                    setShowErrorPopup(true);
                } else {
                    console.error("An error occurred while logging in:", error);
                }
            });
    }

    function ErrorPopup({ message, onClose }) {
        return (
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog mt-10" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title">Error</h5>
                            <FontAwesomeIcon className="btn btn-outline-secondary" icon={faXmark} onClick={onClose} />
                        </div>
                        <div className="modal-body">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <>
            <div className="container form-container p-4 my-5 col-5">
                <form>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input name="mail" type="email" className="form-control" value={login.mail} id="date" aria-describedby="emailHelp" onChange={synchronize} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input name="password" type="password" className="form-control" value={login.password} id="exampleInputPassword1" aria-describedby="emailHelp" onChange={synchronize} />
                    </div>

                    {showErrorPopup && <ErrorPopup message={errorMessage} onClose={() => setShowErrorPopup(false)} />}
                    <div className="text-center">
                        <input className="btn bg-rasta-orange" type="button" onClick={sendForm} value="Login" />
                    </div>

                </form>
            </div>

        </>
    );
}