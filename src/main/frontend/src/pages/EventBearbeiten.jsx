
import React, {useState} from 'react';
import './EventBearbeiten.css'
import * as PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
/*import ReactDOM from "react-dom/client";*/


function Layout() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    //TODO URL-ID
    const id = 1;

    const handleClick = () => {
        navigate("/eventVerwaltung/eventAnsehen")
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs));
        let query = await fetch("/events/update", {
            method: "POST",
            headers: {
                //"":JSON.parse(document.cookie)["quarkus-credential"],
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                "id": inputs.id,
                "name": inputs.eventName,
                "regeln": inputs.eventRegeln,
                "deadline": inputs.eventDeadline,
                "ort": inputs.eventOrt,
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

    return (

        <form onSubmit={handleSubmit}>

            <h2>Event Bearbeiten:</h2>
            <input
                type="hidden"
                name = "id"
                value = {id}
                />
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