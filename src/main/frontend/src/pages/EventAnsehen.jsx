import React, {useState} from 'react';
import './EventAnsehen.css'
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";




let events = [
    {eventId:"1", deadline:"12.01.2023", eventDate:"30.01.2023", name:"wichteln", owner:"danield@entenhausen.de", regeln:"kaffee", ort:"caprivi"},
    {eventId:"2", deadline:"15.01.2023", eventDate:"31.01.2023", name:"kaffee", owner:"dagobert@entenhausen.de", regeln:"wasser", ort:"westerberg"}
]




const Row = (props) => {
    const {eventid, deadline, eventdate, name, owner, regeln, ort} = props
    return(<tr>
        <td>{eventid}</td>
        <td>{deadline}</td>
        <td>{eventdate}</td>
        <td>{name}</td>
        <td>{owner}</td>
        <td>{regeln}</td>
        <td>{ort}</td>
    </tr>)
}



const Table = (props) => {
    const{data} = props
    return (<center><table>
        <thead>
        <td>Event ID</td>
        <td>Wichtel Datum</td>
        <td>Geschenk Tag</td>
        <td>Event Name</td>
        <td>Owner</td>
        <td>Regeln</td>
        <td>Location</td>
        </thead>
        <tbody>
        {data.map(row =>
            <Row eventid = {row.eventId}
                 deadline = {row.deadline}
                 eventdate = {row.eventDate}
                 name = {row.name}
                 owner = {row.owner}
                 regeln = {row.regeln}
                 ort = {row.ort} />
        )}
        </tbody>
    </table></center>)
}

function Layout () {

    const [inputs, setInputs] = useState ({});
    const navigate = useNavigate();
    const [rows, setRows] = useState(events);

    const abbrechenClick = () => {
        navigate("/eventVerwaltung");
    }

    const zuTeilnehmer = () => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen");
    }

    const zuBearbeiten = () => {
        navigate("/eventVerwaltung/eventAnsehen/eventBearbeiten");
    }

    const wichtelzuOrdnung = () => {
        navigate("/");
    }

    const handleSubmit = (event) => {
        event.preventDefault ();
        alert (inputs);
    }

    const ausloggen = () => {
        cookies.remove("quarkus-credential");
        cookies.remove("username");
        navigate("/anmelden");
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs (values => ({...values, [name]: value}))
    }


    return (
        <form onSubmit={handleSubmit}>

            <h2>Alle Events:</h2>
            <br/>
            <br/>
            <div className="hier">
                <label>Das ist eine Demo Tabelle und symbolisiert nur wie der Endzustand hätte aussehen sollen</label>
            </div>
            <br/>
            <Table data={rows}/>
            <br/>
            <div className="eventedit">
                <input type="button" id="adduser" value="Bearbeiten" onClick={zuBearbeiten}/>
                &emsp;&emsp;
                <input type="button" id="adduser" value="Teilnehmer Anzeigen" onClick={zuTeilnehmer}/>
            </div>
            <br/>
            <div className="zuordnungcancel">
                <input type="button" id="adduser" value="Wichtelzuordnung starten" onClick={wichtelzuOrdnung}/>
                &nbsp;&nbsp;
                <input type="button" id="adduser" value="Abbrechen" onClick={abbrechenClick}/>
            </div>
            <br/>
            <div className="logout">
                <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
            </div>
        </form>
    );
}

export default Layout;