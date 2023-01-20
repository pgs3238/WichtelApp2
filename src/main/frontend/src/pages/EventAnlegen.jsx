
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

            <label>
                <div className="eventname">
                <input
                    type = "text"
                    placeholder="Eventname"
                    id = "ename"
                    name = "eventName"
                    value = {inputs.eventName || ""}
                    onChange = {handleChange}
                />
                </div>
            </label>
            <br/>
            <label>Wann soll das Event stattfinden?:
                <input
                    type = "date"
                    onChange = {e=>setDate(e.target.value)}
                />
                <p>Selected Date: {date}</p>
            </label>
            <br/>

            <label>Event location:
                <input
                    type="text"
                    id = "location"
                    value = {inputs.eventLocation || ""}
                    onChange = {handleChange}
                    />
            </label>
            <br/>

            <label>Secret Santa distribution:
                <input
                    type = "date"
                    onChange = {e=>setDate(e.target.value)}
                />
                <p>Selected Date: {date}</p>
            </label>
            <br/>

            <button>cancel</button>

            <button>save event</button>

        </form>
    );
}

export default Layout;