import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../../styles.css';

export default function Register() {
    const [register, setRegister] = useState({})

    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@#$%^&+=!]).{8,}$/;

    function sendRegistration(e) 
    {
        if (!passwordRegex.test(e.target.name === "password")) 
        {
            alert('La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola, un carattere speciale e un numero.');
            return;
        }
        
        if ((e.target.name === "password") !== (e.target.name === "passwordConfirm"))
        {
            alert("Le password non corrispondono!");
            return;
        }

        axios.post("/register", register)
        .then(response => { 
            if (response.data && response.status === 200) 
            {
                alert("Registrazione completata con Successo")
                Navigate("/");
            }
        })
        .catch(error => {
            console.error('Errore durante la registrazione:', error);
            alert('Errore durante la registrazione. Riprova.');
        });
    }

    return (
        <>
            <div className="container form-container">
                <form>
                    <div className="mb-3">
                        <label className="form-label">Insert e-mail</label>
                        <input name="mail" type="email" className="form-control" id="date" aria-describedby="emailHelp" onChange={synchronize} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Insert Password</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" onChange={synchronize} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input name="passwordConfirm" type="password" className="form-control" id="exampleInputPassword2" aria-describedby="emailHelp" onChange={synchronize} />
                    </div>

                    <input className="btn btn-primary" type="button" onClick={sendRegistration} value="Register" />
                </form>
            </div>

        </>
    );
}