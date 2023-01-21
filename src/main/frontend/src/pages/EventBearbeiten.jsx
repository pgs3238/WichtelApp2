
import React, {useState} from 'react';
import './EventBearbeiten.css'
import * as PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
/*import ReactDOM from "react-dom/client";*/


function Layout() {
    const [inputs, setInputs] = useState({});
    const [date, setDate] = useState();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
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
            <h2>Event Bearbeiten:</h2>
            <div className="eventname">
                <label> Wie soll das Event heißen? </label>
                &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                <input
                    type="text"
                    placeholder="Eventname"
                    id="eventname"
                    name="eventName"
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="eventdatum">
                <label>Wann soll das Event starten? </label>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                <input
                    type="date"
                    name="eventDate"
                    onChange= {e=>setDate(e.target.value)}
                />
            </div>
            <br/>
            <div className="eventregeln">
                <label> Welche Regeln liegen für das Event vor? </label>
                &nbsp;
                <input
                    type="text"
                    placeholder="Eventregeln"
                    id="eventegeln"
                    name="eventRegeln"
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="sstermin">
                <label> Secret Santa Termin: </label>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                <input
                    type="date"
                    name="eventDeadline"
                    onChange= {e=>setDate(e.target.value)}
                />
            </div>
            <br/>
            <div className="bsave">
                <input type="submit" id="saveevent" value="Event speichern"/>
            </div>
            <br/>
            <div className="bcancel">
                <input type="button" id="cancel" value="Abbrechen - TODO FEHLT EINE OBERSEITE!!" onClick={handleClick}/>
            </div>
            <br/>
        </form>

    );
}

export default Layout;