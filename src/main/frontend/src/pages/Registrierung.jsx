
import React, {useState} from 'react';
import './Registrierung.css'
import {useNavigate} from "react-router-dom";

//TODO Handle Error missing Data

function Layout() {
    const [inputs, setInputs] = useState({});
    const [showMessage, setShowMessage] = useState(false); // <-- modal flag
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/home");
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

       // alert(JSON.stringify(inputs));

        if (inputs.passwort !== inputs.repasswort) {
            alert("pass?")
            return;
        }

        let query = await fetch("/users/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": inputs.nachname,
                "vorname": inputs.vorname,
                "email": inputs.email,
                "passwort": inputs.passwort
            })
        });

        if (query.status !== 200) {
            let json = await query.json();
            alert(JSON.stringify(json));
            return;
        }

      //  alert("OK")
        setShowMessage(true);
    }

    const handleOk = () => {
        setShowMessage(false);
        navigate("/home");
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={"register-form-container"}>
                <h2>Neues Konto erstellen</h2>

                <div className="register-form-row">
                    <label>Vorname: </label>
                    <input type="text" placeholder="Vorname" id="vname" name="vorname" onChange={handleChange}
                    />
                </div>

                <div className="register-form-row">
                    <label>Nachname: </label>
                    <input type="text" placeholder="Nachname" id="nachname" name="nachname" onChange={handleChange}
                    />
                </div>

                <div className="register-form-row">
                    <label>E-mail: </label>
                    <input type="text" placeholder="E-Mail Adresse" id="email" name="email" onChange={handleChange}
                    />
                </div>

                <div className="register-form-row">
                    <label>Passwort: </label>
                    <input type="password" placeholder="Passwort" id="passwort" name="passwort" onChange={handleChange}
                    />
                </div>

                <div className="register-form-row">
                    <label>Passwort wiederholen: </label>
                    <input type="password" placeholder="Passwort" id="repasswort" name="repasswort" onChange={handleChange}
                    />
                </div>

                <div className="register-form-actions">
                    <input type="submit" id="adduser" value="Registrieren"/>
                    <input type="button" id="cancel" value="Abbrechen" onClick={handleClick}/>
                </div>
            </form>

            {showMessage && (
                <div className="register-modal-overlay">
                    <div className="register-modal-box">
                        <p>Konto angelegt!</p>
                        <button onClick={handleOk}>OK</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Layout;