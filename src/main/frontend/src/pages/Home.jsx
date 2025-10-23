
//import React, {useState} from 'react';
import './Home.css'
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";

//TODO - when Email connection is added, add function to Forgot Password Button

function Layout() {

    // const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const neuesKonto = () => {
        navigate("/registrierung");
    }

    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({...values, [name]: value}))
    // }
    const handleSubmit = (event) => {
        let formdata = new FormData(event.target);
        cookies.set("username",formdata.get("j_username"))
        return true;
    }

    return (
        <form action="/j_security_check" method="POST" onSubmit={handleSubmit}>
        <br/>
        <h2>Was ist Secret Santa?</h2>
            <h3><center>Hier hast du die Möglichkeit dich zusammen mit Familie, Freunden oder Kollegen </center>
                <center>für eine unterhaltsame Wichtelrunde anzumelden. Sobald die Wichtelrunde durch den Organisator </center>
                <center>gestartet wird, wirst du per Zufall einer Person zugewiesen werden,</center>
                <center>für die du ein Geschenk kaufen kannst.</center>
                <center>Lass die Vorfreude beginnen und registrier dich heute noch.</center>
            </h3>
            <div className="kontoanlegen">
                <input
                type ="button"
                id="kontoanlegen"
                value="Neues Konto erstellen"
                onClick={neuesKonto}/>
            </div>
            <br/>
            <div className="anmelden">
                <h3 className="a">Du hast bereits einen Account bei uns?</h3>
                <br/>
                <div className="email">
                    <label> E-Mail-Adresse: </label>
                    &nbsp;
                    <input
                        type="text"
                        placeholder="E-Mail-Adresse"
                        id="email"
                        name="j_username"
                    />
                </div>
                <br/>
                <div className="passwort">
                    <label>Passwort: </label>
                    &emsp;&emsp;&emsp;
                    <input
                        type="password"
                        placeholder="Passwort"
                        id="passwort"
                        name="j_password"
                    />
                </div>
                <br/>
                <div className="anmeldenBT">
                    <input type="submit" id="anmelden" value="Login"/>
                </div>
                <br/>
                <div className="pwvergessenBT">
                    <input
                        type="button"
                        id="neuespasswortanfordern"
                        value="Passwort vergessen?"
                        onClick={() => {}}
                    />
                </div>
            </div>
        </form>
    );
}

export default Layout;