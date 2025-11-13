
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
        <>
            <form action="/j_security_check" method="POST" className={"home-form-container"} onSubmit={handleSubmit}>
                <h2 className="home-form-title">Was ist Secret Santa?</h2>

                <h3 className="home-form-description">
                    Wichteln (Secret Santa) ist eine schöne Tradition, bei der sich Freunde,
                    Familie oder Kollegen gegenseitig kleine Überraschungen machen
                    – ohne zu wissen, von wem das Geschenk kommt.
                    <br/>
                    <br/>
                    Mit dieser App wird das Organisieren kinderleicht: Der Ersteller der Runde legt den
                    Wichtel-Termin und das Budget fest, und die App lost automatisch die Paare aus.
                    So bleibt das Geheimnis gewahrt – und die Vorfreude kann beginnen!
                </h3>

                <div className="home-form-actions">
                    <input type="button" id="kontoanlegen" value="Neues Konto anlegen" onClick={neuesKonto}/>
                </div>

                <div className="anmelden">
                    <h3 className="home-form-description">🎅 Schon Teil des Wichtelspaßes? Dann logge dich unten ein!</h3>

                    <div className="home-form-row">
                        <label> E-Mail: </label>
                        <input type="text" placeholder="E-Mail-Adresse" id="email" name="j_username"/>
                    </div>

                    <div className="home-form-row">
                        <label>Passwort: </label>
                        <input type="password" placeholder="Passwort" id="passwort" name="j_password"/>
                    </div>

                    <div className="home-form-actions">
                        <input type="submit" id="anmelden" value="Login"/>
                        <input type="button" id="neuespasswortanfordern" value="Passwort vergessen?" onClick={() => {}}/>
                    </div>
                </div>
            </form>
        </>

    );
}

export default Layout;