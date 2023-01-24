
import React, {useState} from 'react';
import './Home.css'
import {useNavigate} from "react-router-dom";

function Layout() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

     const registrierung = () => {
        navigate("/home/registrierung");
     }

    const anmelden = () => {
        navigate("/home/anmelden");
    }

    return (
        <form onSubmit={handleSubmit}>


        <br/>
        <h2>Was ist Secret Santa?</h2>

            <h3><center>Hier hast du die Möglichkeit dich zusammen mit Familie, Freunden oder Kollegen </center>
                <center>für eine unterhaltsame Wichtelrunde anzumelden. Sobald die Wichtelrunde durch den Organisator </center>
                <center>gestartet wird, wirst du per Zufall einer Person zugewiesen werden,</center>
                <center>für die du ein Geschenk kaufen kannst.</center>
                <center>Lass die Vorfreude beginnen und registrier dich heute noch.</center>
            </h3>

            <div className="registrierung">
                <input
                type ="button"
                id="registrierung"
                value="Registrieren"
                onClick={registrierung}/>
            </div>

            <br/>
            <br/>

            <div className="anmelden">
                <h3 className="a">Du hast bereits einen Account bei uns?</h3>
                <input
                    type="button"
                    id="anmelden"
                    value="Anmelden"
                    onClick={anmelden}/>

            </div>




        </form>




            );
}

export default Layout;