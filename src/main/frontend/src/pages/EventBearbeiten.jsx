
import React, {useState} from 'react';
import './EventBearbeiten.css'
import * as PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
/*import ReactDOM from "react-dom/client";*/


function Layout() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/eventVerwaltung/eventAnsehen")
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs));


    }

    return (

        <form onSubmit={handleSubmit}>

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
                    type="datetime-local"
                    name="eventDate"
                    onChange= {handleChange}
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
            <div className="ort">
                <label> Wo findet Secret Santa statt: </label>
                <input
                    type="text"
                    placeholder="Ort"
                    id="ort"
                    name="eventOrt"
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="sstermin">
                <label> Secret Santa Termin: </label>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                <input
                    type="datetime-local"
                    name="eventDeadline"
                    onChange= {handleChange}
                />
            </div>
            <br/>
            <div className="bsave">
                <input type="submit" id="saveevent" value="Event speichern"/>
            </div>
            <br/>
            <div className="bcancel">
                <input type="button" id="cancel" value="Abbrechen" onClick={handleClick}/>
            </div>
            <br/>
        </form>

    );
}

export default Layout;