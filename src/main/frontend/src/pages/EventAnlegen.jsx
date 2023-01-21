
import React, {useState} from 'react';

import './EventAnlegen.css'
import {useNavigate} from "react-router-dom";

function Layout() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    const handleChange = (event) => {
        const eventName = event.target.eventName;
        const value = event.target.value;
        setInputs(values => ({...values, [eventName]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        alert(JSON.stringify(inputs));

        let query = await fetch("/events/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": inputs.eventName,
                "regeln": inputs.eventRegeln,
                "deadline": inputs.eventDeadline,
                "eventDate": inputs.eventDate

            })
        });

        if (query.status !== 200) {
            let json = await query.json();
            alert(JSON.stringify(json));
            return
        }


        alert("OK");
    }


    const [date, setDate] = useState();

    return (
        <form onSubmit={handleSubmit}>
            <h1>Secret Santa</h1>
            <h2>Erstellen Sie ein neues Event:</h2>
            <div className="eventname">
                <label> Wie soll das Event heißen? </label>
                &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                <input
                    type = "text"
                    placeholder="Eventname"
                    id = "ename"
                    name = "eventName"
                    onChange = {handleChange}
                />
            </div>
            <br/>
            <div className="eventdatum">
                <label>Wann soll das Event starten? </label>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                <input
                    type = "date"
                    name = "eventDate"
                    onChange = {e=>setDate(e.target.value)}
                />
            </div>
            <br/>
            <div className="eventregeln">
                <label> Welche Regeln liegen für das Event vor? </label>
                &nbsp;
                <input
                    type="text"
                    placeholder="Eventregeln"
                    id = "eventregel"
                    name="eventRegeln"
                    onChange = {handleChange}
                />
            </div>
            <br/>
            <div className="sstermin">
                <label> Secret Santa Termin: </label>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                <input
                    type = "date"
                    name = "eventDeadline"
                    onChange = {e=>setDate(e.target.value)}
                />
            </div>
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
