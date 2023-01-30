import React, {useState} from "react";
import cookies from "js-cookie";
import './GastEinladen.css'
import {useNavigate} from "react-router-dom";





let events = [
    {user_email:"doduck@entenhausen.de", event_eventid: "1"},
    {user_email:"dagoduck@entenhausen.de", event_eventid:"1"}
]




const Row = (props) => {
    const {user_email, event_eventid} = props
    return(<tr>
        <td>{user_email}</td>
        <td>{event_eventid}</td>
    </tr>)
}



const Table = (props) => {
    const{data} = props
    return (<center><table>
        <thead>
        <td>Gast E-Mail</td>
        <td>Event ID</td>
        </thead>
        <tbody>
        {data.map(row =>
            <Row user_email = {row.user_email}
                 event_eventid = {row.event_eventid}/>
        )}
        </tbody>
    </table></center>)
}


function Layout () {

    const [inputs, setInputs] = useState ({});
    const navigate = useNavigate();
    const [rows, setRows] = useState(events);
    //TODO URL-ID
    const id = 1;

    const abbrechen = () => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen");
    }

    const ausloggen = () => {
        cookies.remove("quarkus-credential");
        cookies.remove("username");
        navigate("/anmelden");
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        alert(JSON.stringify(inputs));

        let query = await fetch("/teilnehmer/einladen", {
            method: "POST",
            headers: {
                //"":JSON.parse(document.cookie)["quarkus-credential"],
                "Content-Type": "application/json",
                "quarkus-credential": cookies.get("quarkus-credential")
            },

            body: JSON.stringify({
                "eventID": inputs.id,
                "email": inputs.email

            })
        });

        if (query.status !== 200) {
            let json = await query.json();
            alert(JSON.stringify(json));
            return
        }


        alert("OK");
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs (values => ({...values, [name]: value}))
    }
    return (
        <form onSubmit={handleSubmit}>

            <h2>Gäste Einladen</h2>
            <br/>
            <br/>
            <div className="hier">
                <label> Das ist eine Demo Tabelle und symbolisiert nur wie der Endzustand hätte aussehen sollen</label>
            </div>
            <br/>
            <Table data={rows}/>
            <br/>
            <div className="eventId">
                <label>Event ID: </label>
                <input
                    type="text"
                    placeholder="Number"
                    id="eventid"
                    name = "id"
                    onChange={handleChange}
                />
            </div>

            <br/>
            <div className="email">
                <label>E-Mail: </label>
                &emsp;
                <input
                    type = "text"
                    placeholder= "Email"
                    id = "email"
                    name = "email"
                    onChange = {handleChange}
                />
            </div>
            <br/>
            <div className="submit">
                <input type="submit" id="emailZuListe" value="E-Mail hinzufügen"/>
                &nbsp;&nbsp;
                <input type="button" id="emailausListe" value="E-Mail Löschen"/>
            </div>
            <br/>
            <div className="abbrechen">
                <input type="button" id="abbrechen" value="Abbrechen" onClick={abbrechen}/>
            </div>
            <br/>
            <div className="logout">
                <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
            </div>
        </form>

    );
}

export default Layout;