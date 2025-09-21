import React, {useEffect, useState} from 'react';
import styles from'./EventAnsehen.module.css';
import './EventAnsehen.css';
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";

const Row = ({ eventid, deadline, eventdate, name, owner, regeln, ort }) => (
    <tr>
        <td>{eventid}</td>
        <td>{name}</td>
        <td>{eventdate}</td>
        <td>{deadline}</td>
        <td>{owner}</td>
        <td>{regeln}</td>
        <td>{ort}</td>
    </tr>
);

const Table = ({ data }) => (
    <div className="table-window">
        <table>
            <thead>
            <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Wichtel Datum</th>
                <th>Geschenk Tag</th>
                <th>Owner</th>
                <th>Regeln</th>
                <th>Location</th>
            </tr>
            </thead>
            <tbody>
            {data.map(row => (
                <Row
                    key={row.eventId}
                    eventid={row.eventId}
                    name={row.name}
                    eventdate={row.eventDate}
                    deadline={row.deadline}
                    owner={row.owner}
                    regeln={row.regeln}
                    ort={row.ort}
                />
            ))}
            </tbody>
        </table>
    </div>
);

// const Table = (props) => {
//     const{data} = props
//     return (<center><table>
//         <thead>
//         <td>Event ID</td>
//         <td>Wichtel Datum</td>
//         <td>Geschenk Tag</td>
//         <td>Event Name</td>
//         <td>Owner</td>
//         <td>Regeln</td>
//         <td>Location</td>
//         </thead>
//         <tbody>
//         {data.map(row =>
//             <Row eventid = {row.eventId}
//                  deadline = {row.deadline}
//                  eventdate = {row.eventDate}
//                  name = {row.name}
//                  owner = {row.owner}
//                  regeln = {row.regeln}
//                  ort = {row.ort} />
//         )}
//         </tbody>
//     </table></center>)
// }

function Layout () {

    const [inputs, setInputs] = useState ({});
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    // Fetch events owned by current user
    useEffect(() => {
        const fetchMyEvents = async () => {
            const res = await fetch('/api/events/mine', {
                method: "GET",
                credentials: "include" // <--- important
                //headers: { "quarkus-credential": cookies.get("quarkus-credential") }
            });
            if (res.ok) {
                const data = await res.json();
                setRows(data);
            } else {
                alert("Fehler beim Laden der Events");
            }
        };

        fetchMyEvents();
    }, []);




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
            <div className="form-container">
                <h2>Meine Events verwalten:</h2>
                <Table data={rows}/>

                <div className="eventedit">
                    <input type="button" id="adduser" value="Bearbeiten" onClick={zuBearbeiten}/>
                    <input type="button" id="adduser" value="Teilnehmer Anzeigen" onClick={zuTeilnehmer}/>
                </div>

                <div className="zuordnungcancel">
                    <input type="button" id="adduser" value="Wichtelzuordnung starten" onClick={wichtelzuOrdnung}/>
                    <input type="button" id="adduser" value="Abbrechen" onClick={abbrechenClick}/>
                </div>

                <div className="logout">
                    <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
                </div>
            </div>
        </form>
    );
}

export default Layout;