import React, {useEffect, useState} from "react";
import './EventVerwaltung.css'
import './Modals.css'
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";
import EventAnlegen from "./EventAnlegen1";

// TODO BUG FIX - WichtelDatum muss nach aktuellem Datum sein! GeschenkTag muss nach WichtelDatum sein.
// TODO - Add function to Buttons - An Event Teilnehmen, E-Mail an Eventverwalter (do i want this button)



//
// //New Table
// const Row = ({ eventId, deadline, eventDate, name, owner, regeln, ort }) => (
//     <tr>
//         <td>{eventId}</td>
//         <td>{deadline}</td>
//         <td>{eventDate}</td>
//         <td>{name}</td>
//         <td>{owner}</td>
//         <td>{regeln}</td>
//         <td>{ort}</td>
//     </tr>
// );

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
        <div className="table-window" style={{zIndex: 5}}>
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
                <tbody className="table-window-body" style={{ maxHeight: `${bodyHeight}px` }}>
                {rowCount > 0 ? (
                    data.map((row) => (
                        <tr key={row.eventId}>
                            <td>{row.eventId}</td>
                            <td>{row.name}</td>
                            <td>{formatDate(row.deadline)}</td>
                            <td>{formatDate(row.eventDate)}</td>
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
    );
};

function Layout() {

    const [inputs, setInputs] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();
    //const [rows, setRows] = useState(events);
    const [rows, setRows] = useState([]);



    const fetchData = () => {
        fetch("/api/events", {
            headers: {
                "Authorization": "Bearer " + cookies.get("quarkus-credential")
            }
        })
            .then(res => res.json())
            .then(data => setRows(data))
            .catch(err => console.error("Fetch error:", err));
    };

    // 2. Call fetchData on initial load
    useEffect(() => {
        fetchData();
    }, []);






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
        navigate("/home");
    }

    const email = () => {
        navigate("/messageService/mitteilungAnOrganisator");
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

            <h2 className="eventv-form-title" style={{zIndex: 5}}>Eventverwaltung</h2>
            <TableWindow data={rows} title="Eventverwaltung" />
            <div className="button-group" style={{zIndex: 5}}>
                <div className="eventansehen">
                    <input
                        type="submit"
                        id="eventteilnehmen"
                        value="An Event teilnehmen"
                    />
                    <input
                        type="button"
                        id="email"
                        value="E-Mail an Eventverwalter"
                        onClick={email}
                    />
                </div>
                <div className="eventanlegen">
                    <input
                        type="button"
                        id="eventanlegen"
                        value="Event Anlegen"
                        onClick={eventAnlegen}
                    />
                    <input
                        type="button"
                        id="eventanlegen"
                        value="Event Anlegen"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsPopupOpen(true);
                        }}
                    />
                    <input
                        type="button"
                        id="eventansehen"
                        value="Eigene Events anzeigen"
                        onClick={eventAnsehen}
                    />
                </div>
            </div>
            <div className="logout" style={{zIndex: 5}}>
                <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
            </div>
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <EventAnlegen
                            onClose={() => setIsPopupOpen(false)}
                            onSuccess={fetchData} // Refresh table after saving
                        />
                    </div>
                </div>
            )}
        </form>
    );
}

export default Layout;