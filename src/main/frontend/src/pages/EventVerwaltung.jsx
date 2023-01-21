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
            <h1>Secret Santa</h1>
            <h2>Eventverwaltung</h2>
            <br/>
            <div className="eventanlegen">
                <label>Neues Event Anlegen: </label>
                &emsp;
                <input type="button" id="eventanlegen" value="EventAnlegen" onClick={eventAnlegen}/>
            </div>
            <br/>
            <div className="eventansehen">
                <label>Alle Events Ansehen: </label>
                &emsp;
                <input type="button" id="eventansehen" value="EventAnsehen" onClick={eventAnsehen}/>
            </div>
        </form>


    );
}

export default Layout;