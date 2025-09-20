import React, {useEffect, useState} from "react";
import './EventVerwaltung.css'
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";




// let events = [
//     {eventId:"1", deadline:"12.01.2023", eventDate:"30.01.2023", name:"wichteln", owner:"danield@entenhausen.de", regeln:"kaffee", ort:"caprivi"},
//     {eventId:"2", deadline:"15.01.2023", eventDate:"31.01.2023", name:"kaffee", owner:"dagobert@entenhausen.de", regeln:"wasser", ort:"westerberg"}
// ]


//New Table
const Row = ({ eventId, deadline, eventDate, name, owner, regeln, ort }) => (
    <tr>
        <td>{eventId}</td>
        <td>{deadline}</td>
        <td>{eventDate}</td>
        <td>{name}</td>
        <td>{owner}</td>
        <td>{regeln}</td>
        <td>{ort}</td>
    </tr>
);

// const Table = ({ data }) => (
//     <center>
//         <table>
//             <thead>
//             <tr>
//                 <td>Event ID</td>
//                 <td>Wichtel Datum</td>
//                 <td>Geschenk Tag</td>
//                 <td>Event Name</td>
//                 <td>Owner</td>
//                 <td>Regeln</td>
//                 <td>Location</td>
//             </tr>
//             </thead>
//             <tbody>
//             {data.map(row =>
//                 <Row key={row.eventId}
//                      eventId={row.eventId}
//                      deadline={row.deadline}
//                      eventDate={row.eventDate}
//                      name={row.name}
//                      owner={row.owner}
//                      regeln={row.regeln}
//                      ort={row.ort}/>
//             )}
//             </tbody>
//         </table>
//     </center>
// );

const TableWindow = ({ data, title }) => (
    <div className="table-window">
        <div className="table-window-body">
            <table>
                <thead>
                <tr>
                    <td>Event ID</td>
                    <td>Event Name</td>
                    <td>Wichtel Datum</td>
                    <td>Geschenk Tag</td>
                    <td>Owner</td>
                    <td>Regeln</td>
                    <td>Location</td>
                </tr>
                </thead>
                <tbody>
                {data.map(row => (
                    <tr key={row.eventId}>
                        <td>{row.eventId}</td>
                        <td>{row.name}</td>
                        <td>{row.eventDate}</td>
                        <td>{row.deadline}</td>
                        <td>{row.owner}</td>
                        <td>{row.regeln}</td>
                        <td>{row.ort}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
);

function Layout() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    //const [rows, setRows] = useState(events);
    const [rows, setRows] = useState([]);

    //Neuer Code für neue Backend Tabelle??
    useEffect(() => {
        fetch("/api/events", {
            headers: {
                "Authorization": "Bearer " + cookies.get("quarkus-credential")
            }
        })
            .then(res => res.json())
            .then(data => setRows(data))
            .catch(err => console.error(err));
    }, []);

    const eventAnlegen = () => {
        navigate("/eventVerwaltung/eventAnlegen");
    }

    const eventAnsehen = () => {
        navigate("/eventVerwaltung/eventAnsehen");
    }

    const ausloggen = () => {
        cookies.remove("quarkus-credential");
        cookies.remove("username");
        navigate("/anmelden");
    }

    const email = () => {
        navigate("/fehlt");
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

            <h2>Eventverwaltung</h2>
            <br/>
            <br/>
            <div className="hier">
                <label>Das ist eine Demo Tabelle und symbolisiert nur wie der Endzustand hätte aussehen sollen</label>
            </div>
            <br/>
            {/*<Table data={rows}/>*/}
            <TableWindow data={rows} title="Eventverwaltung" />
            <br/>
            <div className="eventansehen">
                <input
                    type="submit"
                    id="eventansehen"
                    value="An Event teilnehmen"/>
                &emsp;
                <input type="button" id="eventansehen" value="E-Mail an Eventverwalter" onClick={email}/>
            </div>
            <br/>
            <div className="eventanlegen">
                <input type="button" id="eventanlegen" value="Event Anlegen" onClick={eventAnlegen}/>
                &emsp;&emsp;&emsp;&emsp;
                <input type="button" id="eventansehen" value="Eigene Events anzeigen" onClick={eventAnsehen}/>
            </div>
            <br/>
            <div className="logout">
                <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
            </div>
        </form>


    );
}

export default Layout;