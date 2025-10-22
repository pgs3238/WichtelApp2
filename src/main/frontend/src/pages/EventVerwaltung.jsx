import React, {useEffect, useState} from "react";
import './EventVerwaltung.css'
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";

// TODO BUG FIX - WichtelDatum muss nach aktuellem Datum sein! GeschenkTag muss nach WichtelDatum sein.


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

const TableWindow = ({ data =[] }) => { // default empty array
    const minVisibleRows = 5;
    const maxVisibleRows = 10;
    const rowHeight = 40; // approximate height of a row in px
    const rowCount = Array.isArray(data) ? data.length : 0;
    const bodyHeight = Math.max(minVisibleRows, Math.min(data.length, maxVisibleRows)) * rowHeight;

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
            </table>
            <div className="table-window-body" style={{ maxHeight: `${bodyHeight}px` }}>
                <table>
                    <tbody>
                    {rowCount > 0 ? (
                        data.map((row) => (
                            <tr key={row.eventId}>
                                <td>{row.eventId}</td>
                                <td>{row.name}</td>
                                <td>{formatDate(row.eventDate)}</td>
                                <td>{formatDate(row.deadline)}</td>
                                <td>{row.owner}</td>
                                <td>{row.regeln}</td>
                                <td>{row.ort}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                                No events available
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

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