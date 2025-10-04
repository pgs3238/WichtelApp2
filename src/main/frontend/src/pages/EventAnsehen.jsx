import React, {useEffect, useState} from 'react';
import styles from'./EventAnsehen.module.css';
import './EventAnsehen.css';
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";

const Row = ({ eventid, deadline, eventdate, name, owner, regeln, ort, isSelected, onSelect }) => (
    <tr
        onClick={() => onSelect(eventid)}
        style={{
                backgroundColor: isSelected ? "#d0f0ff" : "transparent",
                cursor: "pointer",
            }}

    >
        <td>{eventid}</td>
        <td>{name}</td>
        <td>{eventdate}</td>
        <td>{deadline}</td>
        <td>{owner}</td>
        <td>{regeln}</td>
        <td>{ort}</td>
    </tr>
);

const Table = ({ data, selectedId, onSelect }) => (
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
                    isSelected={row.eventId === selectedId}
                    onSelect={onSelect}
                />
            ))}
            </tbody>
        </table>
    </div>
);

function Layout () {

    const [inputs, setInputs] = useState ({});
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const handleSelect = (id) => {
        console.log("Selected event:", id);
        setSelectedEventId(id);
    };

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

    const zuTeilnehmer = (eventid) => {
        if (eventid) {
            navigate("/eventVerwaltung/eventAnsehen/teliEinsehen", {
                state: { eventid },
            });
        }

    }

    const zuBearbeiten = () => {
        navigate("/eventVerwaltung/eventAnsehen/eventBearbeiten");
    }

    const wichtelzuOrdnung = () => {
        //navigate("/");
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
                {/*<Table*/}
                {/*    data={rows}*/}
                {/*    selectedId={selectedEventId}*/}
                {/*    onSelect={setSelectedEventId}*/}
                {/*/>*/}
                <Table
                    data={rows}
                    selectedId={selectedEventId}
                    onSelect={(id) => {
                        setSelectedEventId(id);  // update state
                        handleSelect(id);        // call any other handler
                    }}
                />


                <div className="eventedit">
                    <input type="button" id="adduser" value="Bearbeiten" onClick={zuBearbeiten}/>
                    <input
                        type="button"
                        id="adduser"
                        value="Teilnehmer Hinzufügen"
                        onClick={() => zuTeilnehmer(selectedEventId)}
                        disabled={!selectedEventId}
                    />
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