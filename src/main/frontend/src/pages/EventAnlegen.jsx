
import React, {useState} from 'react';
import cookies from "js-cookie";
import './EventAnlegen.css'
import {useNavigate} from "react-router-dom";

function Layout() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/eventVerwaltung")
    }

    const ausloggen = () => {
        cookies.remove("quarkus-credential");
        cookies.remove("username");
        navigate("/anmelden");
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

       // alert(JSON.stringify(inputs));

        let query = await fetch("/events/create", {
            method: "POST",
            headers: {
                //"":JSON.parse(document.cookie)["quarkus-credential"],
                "Content-Type": "application/json",
                "quarkus-credential": cookies.get("quarkus-credential")

            },

            body: JSON.stringify({
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


       // alert("OK");
    }


    return (
        <form onSubmit={handleSubmit}>

            <h2>Erstellen Sie ein neues Event:</h2>
            <br/>
            <br/>
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
                    type = "datetime-local"
                    name = "eventDate"
                    onChange = {handleChange}
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
                    type = "datetime-local"
                    name = "eventDeadline"
                    onChange = {handleChange}
                />
            </div>
            <div className="bsave">
                <input type="submit" id="saveevent" value="Event speichern"/>
            </div>
            <br/>
            <div className="bcancel">
                <input type="button" id="cancel" value="Abbrechen" onClick={handleClick}/>
            </div>
            <br/>
            <div className="logout">
                <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
            </div>
        </form>
    );
}

export default Layout;
