
import React, {useState} from 'react';

import './EventAnlegen.css'

function Layout() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const eventName = event.target.eventName;
        const value = event.target.value;
        setInputs(values => ({...values, [eventName]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    const [date, setDate] = useState();

    return (
        <form onSubmit={handleSubmit}>
            <h1>Secret Santa</h1>
            <h2>Erstellen Sie ein neues Event:</h2>
            <div className="eventname">
                <label> Wie soll das Event heißen? </label>
                &nbsp;
                <input
                    type = "text"
                    placeholder="Eventname"
                    id = "ename"
                    name = "eventName"
                    value = {inputs.eventName || ""}
                    onChange = {handleChange}
                />
            </div>
            <br/>
            <div className="eventdatum">
                <label>Wann soll das Event starten? </label>
                &emsp;&nbsp;&nbsp;&nbsp;
                <input

                    type = "date"
                    onChange = {e=>setDate(e.target.value)}
                />
                <p>Gewähltes Datum: {date}</p>
            </div>
            <div className="eventlocation">
                <label> Wo findet das Event statt? </label>
                &nbsp;&nbsp;
                <input
                    type="text"
                    placeholder="Eventlocation"
                    id = "location"
                    value = {inputs.eventLocation || ""}
                    onChange = {handleChange}
                    />
            </div>
            <br/>
            <div className="sstermin">
                <label> Secret Santa Termin: </label>
                &emsp;&emsp;&emsp;&emsp;&emsp;
                <input
                    type = "date"
                    onChange = {e=>setDate(e.target.value)}
                />
                <p>Gewähltes Datum: {date}</p>
            </div>
            <div className="bsave">
                <button>Event speichern</button>
            </div>
            <br/>
            <div className="bcancel">
                <button>Abbrechen</button>
            </div>
            <br/>


        </form>
    );
}

export default Layout;