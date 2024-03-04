import axios from 'axios';
import React, { useState } from 'react';
import '../../styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [registrationData, setRegistrationData] = useState({
        mail: '',
        name: '',
        password: '',
        passRep: '',
        phone: '',
        posx: '',
        posy: '',
    });

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

    function synchronize(e) {
        const { name, value } = e.target;
        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function sendRegistration() {

        if (!passwordRegex.test(registrationData.password)) {
            setErrorMessage('The password must contain at least 8 characters, one uppercase letter, one lowercase letter, one special character, and one number.');
            setShowErrorPopup(true);
            return;
        }

        if (registrationData.password !== registrationData.passRep) {
            setErrorMessage('Passwords do not match!');
            setShowErrorPopup(true);
            return;
        }

        axios.post("/register", registrationData)
            .then(response => {
                if (response.data && response.status === 200) {
                    alert("Registration completed successfully.")
                    navigate('/')
                }
            })
            .catch(error => {
                console.error('Error during registration!', error);
                setErrorMessage('Error during registration. Please try again.');
                setShowErrorPopup(true);
            });
    }

    function ErrorPopup({ message, onClose }) {
        return (
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog mt-10" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title">Error</h5>
                            <FontAwesomeIcon className="btn btn-outline-secondary" icon={faXmark} onClick={onClose}/>
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
            <div className="container  form-container mt-4">
                <form className="p-4">
                <div className="mb-3">
                        <label className="form-label">Insert Name</label>
                        <input name="name" type="text" className="form-control" onChange={synchronize} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Insert Email</label>
                        <p className='small-descr'>At least 8 characters,min 1 MAIUSC, 1 minusc, 1 number, 1 special char</p>
                        <input name="mail" type="email" className="form-control" aria-describedby="emailHelp" onChange={synchronize} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Insert New Password</label>
                        <input name="password" type="password" className="form-control" onChange={synchronize} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input name="passRep" type="password" className="form-control" onChange={synchronize} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input name="phone" type="text" className="form-control" onChange={synchronize} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Position X</label>
                        <input name="posx" type="text" className="form-control" onChange={synchronize} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Position Y</label>
                        <input name="posy" type="text" className="form-control" onChange={synchronize} />
                    </div>

                    <div className="d-flex justify-content-center">
                        <input className="btn btn-dark" type="button" onClick={sendRegistration} value="Register" />
                    </div>
                </form>
            </div>

            {showErrorPopup && <ErrorPopup message={errorMessage} onClose={() => setShowErrorPopup(false)} />}
        </>
    );
}
