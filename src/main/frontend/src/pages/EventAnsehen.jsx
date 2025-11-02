import React, {useEffect, useState} from 'react';
import styles from'./EventAnsehen.module.css';
import './EventAnsehen.css';
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";

//TODO Event Bearbeiten - noch nicht richtig eingebaut ggf. entfernen??
// Besser ein neues Event anzulegen als ein altes zu ändern...
// neue Idee - bei select event show table Teilnehmer,
// darunter dann butten Teilnehmer hinzufügen Teilnehmer enfernen,
// jeweils popup mit eingabe etc.
// Button Wichtelzuordnung starten ist für Testzwecke und sollte später
// automatisch bei Zuordnungsdatum stattfinden, daher dann button entfernen;
// anstelle von Gruppen soll es Einschränkungen geben, jedem Nutzer kann eingeschränkt
// werden wem er keine Geschenke geben soll


//TODO überflüssigen Code entfernen nach thorough test!

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

const Table = ({ data, selectedId, onSelect }) => {

    const minVisibleRows = 5;
    const maxVisibleRows = 6;
    const rowHeight = 40; // approximate height of a row in px
    const rowCount = Array.isArray(data) ? data.length : 0;
    const bodyHeight = Math.max(minVisibleRows, Math.min(data.length, maxVisibleRows)) * rowHeight;
    //const bodyHeight = maxVisibleRows * rowHeight; // always max height

    // Date formatter (DD.MM.YYYY HH:MM, 24h)
    const formatDate = (isoString) => {
        if (!isoString) return "";
        const d = new Date(isoString);
        return d
            .toLocaleString("de-DE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
            .replace(",", ""); // remove comma from German locale
    };

    return (
        <div className="table-window-event-ansehen">
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
                <tbody className="table-window-event-ansehen-body" style={{maxHeight: `${bodyHeight}px`}}>
                {/*<tbody className="table-window-event-ansehen-body">*/}
                {data.map((row) => {
                    const isSelected = row.eventId === selectedId;
                    return (
                        <tr
                            key={row.eventId}
                            onClick={() => onSelect(row.eventId)}
                            style={{
                                backgroundColor: isSelected ? '#d0f0ff' : 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <td>{row.eventId}</td>
                            <td>{row.name}</td>
                            <td>{formatDate(row.eventDate)}</td>
                            <td>{formatDate(row.deadline)}</td>
                            <td>{row.owner}</td>
                            <td>{row.regeln}</td>
                            <td>{row.ort}</td>
                        </tr>
                    );
                })}
                {/*/!* Fill empty rows to always reach maxVisibleRows *!/*/}
                {/*{Array.from({ length: Math.max(0, maxVisibleRows - data.length) }).map((_, idx) => (*/}
                {/*    <tr key={`empty-${idx}`} style={{ height: `${rowHeight}px`, display: 'table', width: '100%', tableLayout: 'fixed' }}>*/}
                {/*        <td colSpan={7}>&nbsp;</td>*/}
                {/*    </tr>*/}
                {/*))}*/}
                </tbody>
            </table>
        </div>
);
}


function Layout() {

    const [inputs, setInputs] = useState({});
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
            <h2 className="eventa-form-title">Meine Events</h2>
            <Table
                data={rows}
                selectedId={selectedEventId}
                onSelect={(id) => {
                    setSelectedEventId(id);  // update state
                    handleSelect(id);        // call any other handler
                }}
            />
            <div className="eventedit">
                <input
                    type="button"
                    id="adduser"
                    value="Bearbeiten"
                    onClick={zuBearbeiten}
                />
                <input
                    type="button"
                    id="adduser"
                    value="Teilnehmer Hinzufügen"
                    onClick={() => zuTeilnehmer(selectedEventId)}
                    disabled={!selectedEventId}
                />
            </div>
            <div className="zuordnungcancel">
                <input
                    type="button"
                    id="adduser"
                    value="Wichtelzuordnung starten"
                    onClick={wichtelzuOrdnung}
                />
                <input
                    type="button"
                    id="adduser"
                    value="Abbrechen"
                    onClick={abbrechenClick}
                />
            </div>
            <div className="logout">
                <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
            </div>
        </form>
    );
}

export default Layout;