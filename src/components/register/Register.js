import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';

export default function Register() {

    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [passRep, setPassRep] = useState('');
    const [phone, setPhone] = useState('');
    const [posx, setPosx] = useState('');
    const [posy, setPosy] = useState('');
    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;


    function sendRegistration() {

        const register = {
            "mail": mail,
            "password": pass,
            "phone": phone,
            "positionX": posx,
            "positionY": posy
        }

        if (!passwordRegex.test(pass)) 
        {
            alert('La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola, un carattere speciale e un numero.');
            return;
        }

        if (pass !== passRep) {
            alert("Le password non corrispondono!");
            return;
        }


        axios.post("/register", register)
            .then(response => {
                if (response.data && response.status === 200) {
                    alert("Registrazione completata con Successo")
                    navigate("/");
                }
            })
            .catch(error => {
                console.error('Errore durante la registrazione!', error);
                alert('Errore durante la registrazione. Riprova.');
            });
    }

    return (
        <>
            <div className="container  form-container">
                <form className="p-4">
                    <div className="mb-3">
                        <label className="form-label">Insert e-mail</label>
                        <input name="mail" type="email" className="form-control" aria-describedby="emailHelp" onChange={(e) => setMail(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Insert Password</label>
                        <input name="password" type="password" className="form-control" onChange={(e) => setPass(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input name="passwordConfirm" type="password" className="form-control" onChange={(e) => setPassRep(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input name="phone" type="text" className="form-control" onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Position X</label>
                        <input name="positionx" type="text" className="form-control" onChange={(e) => setPosx(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Position Y</label>
                        <input name="positiony" type="text" className="form-control" onChange={(e) => setPosy(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <input className="btn btn-dark" type="button" onClick={sendRegistration} value="Register" />
                    </div>
                </form>
            </div>

        </>
    );
}