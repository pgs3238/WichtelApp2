import React, {useState} from "react";
import './EventVerwaltung.css'
import {useNavigate} from "react-router-dom";


function Layout() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const eventAnlegen = () => {
        navigate("/eventVerwaltung/eventAnlegen");
    }

    const eventAnsehen = () => {
        navigate("/eventVerwaltung/eventAnsehen");
    }

    const email = () => {
        navigate("/fehlt");
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    return (
        <form onSubmit={handleSubmit}>

            <h2>Eventverwaltung</h2>
            <br/>
            <div className="hier">
                <label>Hier fehlt eine Tabelle Aller Events an denen der Benutzer zugriff hat...</label>
            </div>
            <br/>
            <div className="eventansehen">
                <input
                    type="submit"
                    id="eventansehen"
                    value="An Event teilnehmen"/>
                &emsp;
                <input type="button" id="eventansehen" value="E-Mail an Eventverwalter" onClick={email}/>
            </div>
            <br/>
            <div className="eventanlegen">
                <input type="button" id="eventanlegen" value="Event Anlegen" onClick={eventAnlegen}/>
                &emsp;&emsp;&emsp;&emsp;
                <input type="button" id="eventansehen" value="Eigene Events anzeigen" onClick={eventAnsehen}/>
            </div>
        </form>


    );
}

export default Layout;