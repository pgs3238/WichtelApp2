
import React, {useState} from 'react';
import './Registrierung.css'
import {useNavigate} from "react-router-dom";

function Layout() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/anmelden");
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        alert(JSON.stringify(inputs));

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

        alert("OK")
    }


    return (
        <form onSubmit={handleSubmit}>

            <h2>Register</h2>
            <br/>
            <br/>
            <div className="name">
                <label>Vorname: </label>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                <input
                    type="text"
                    placeholder="Vorname"
                    id="vname"
                    name="vorname"
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="nname">
                <label>Nachname: </label>
                &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                <input
                    type="text"
                    placeholder="Nachname"
                    id="nachname"
                    name="nachname"
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="email">
                <label>Email-Addresse: </label>
                &emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                <input
                    type="text"
                    placeholder="E-Mail Adresse"
                    id="email"
                    name="email"
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="passwort">
                <label>Passwort eingeben: </label>
                &emsp;&emsp;&nbsp;&nbsp;&nbsp;
                <input
                    type="password"
                    placeholder="Passwort"
                    id="passwort"
                    name="passwort"
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="repasswort">
                <label>Passwort erneut eingeben: </label>
                &nbsp;
                <input
                    type="password"
                    placeholder="Passwort"
                    id="repasswort"
                    name="repasswort"
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="register">
                <input type="submit" id="adduser" value="Registrieren"/>
            </div>
            <br/>
            <div className="bcancel">
                <input type="button" id="cancel" value="Abbrechen" onClick={handleClick}/>
            </div>
        </form>
    );
}

export default Layout;