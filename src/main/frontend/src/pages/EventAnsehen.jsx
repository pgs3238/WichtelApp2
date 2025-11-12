import React, {useEffect, useRef, useState} from 'react';
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
    const columns = [
        "Event ID",
        "Event Name",
        "Wichtel Datum",
        "Geschenk Tag",
        "Owner",
        "Regeln",
        "Location",
    ];

    const maxTableWidth = 1200;
    const rowHeight = 35; //was 40
    const minVisibleRows = 5;
    const maxVisibleRows = 6;
    const bodyHeight = Math.max(minVisibleRows, Math.min(data.length, maxVisibleRows)) * rowHeight;

    const headerWrapperRef = useRef(null); // wrapper around header table
    const headerRef = useRef(null);
    const bodyWrapperRef = useRef(null);   // wrapper that actually scrolls
    const bodyRef = useRef(null);
    const [colWidths, setColWidths] = useState([]);

    // Utility: date formatter
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
            .replace(",", "");
    };

    // After render, measure header + body text widths
    useEffect(() => {
        if (!headerRef.current || !bodyRef.current) return;

        const headerCells = Array.from(headerRef.current.querySelectorAll("th"));
        const bodyRows = Array.from(bodyRef.current.querySelectorAll("tr"));

        // Create a hidden canvas to measure text precisely
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.font = "16px Arial, sans-serif";

        const measureText = (text) => ctx.measureText(text).width + 24; // add padding allowance

        const headerWidths = headerCells.map((th) => measureText(th.textContent));
        const bodyWidths = new Array(columns.length).fill(0);

        // Find the maximum width of text per column
        bodyRows.forEach((row) => {
            const cells = Array.from(row.querySelectorAll("td"));
            cells.forEach((td, i) => {
                bodyWidths[i] = Math.max(bodyWidths[i], measureText(td.textContent || ""));
            });
        });

        let widths = headerWidths.map((w, i) => Math.max(w, bodyWidths[i]));

        // Scale down proportionally if total > maxTableWidth
        const totalWidth = widths.reduce((a, b) => a + b, 0);
        if (totalWidth > maxTableWidth) {
            const scale = maxTableWidth / totalWidth;
            widths = widths.map((w) => Math.floor(w * scale));
        }

        setColWidths(widths);

    }, [data]);

    const cellStyle = (i, isHeader = false) => ({
        border: "1px solid #ccc",
        padding: "8px",
        backgroundColor: isHeader ? "#f2f2f2" : "white",
        fontWeight: isHeader ? "bold" : "normal",
        width: colWidths[i] ? `${colWidths[i]}px` : "auto",
        wordBreak: "break-word",
        whiteSpace: "normal",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
    });

    const containerStyle = {
        width: `${maxTableWidth}px`,
        margin: "20px auto",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    };

    const bodyWrapperStyle = {
        overflowY: "auto",
        height: `${bodyHeight}px`,
        width: "100%",
    };

    return (
        <div style={containerStyle}>
            {/* Header */}
            <table
                ref={headerRef}
                style={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed" }}
            >
                <thead>
                <tr>
                    {columns.map((col, i) => (
                        <th key={i} style={cellStyle(i, true)}>
                            {col}
                        </th>
                    ))}
                </tr>
                </thead>
            </table>

            {/* Body */}
            <div style={bodyWrapperStyle}>
                <table
                    ref={bodyRef}
                    style={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed" }}
                >
                    <tbody>
                    {data.map((row) => {
                        // const isSelected = row.eventId === selectedId;
                        const id = row.eventId ?? row.eventid; // covers both cases
                        const isSelected = id === selectedId;
                        return (
                            <tr
                                key={row.eventId}
                                onClick={() => onSelect(row.eventId)}
                                style={{
                                    backgroundColor: isSelected ? "#d0f0ff" : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                {/*<td style={cellStyle(0)}>{row.eventId}</td>*/}
                                {/*<td style={cellStyle(1)}>{row.name}</td>*/}
                                {/*<td style={cellStyle(2)}>{formatDate(row.eventDate)}</td>*/}
                                {/*<td style={cellStyle(3)}>{formatDate(row.deadline)}</td>*/}
                                {/*<td style={cellStyle(4)}>{row.owner}</td>*/}
                                {/*<td style={cellStyle(5)}>{row.regeln}</td>*/}
                                {/*<td style={cellStyle(6)}>{row.ort}</td>*/}
                                <td style={{...cellStyle(0), backgroundColor: isSelected ? "#e6f7ff" : "white"}}>
                                    {row.eventId}
                                </td>
                                <td style={{...cellStyle(1), backgroundColor: isSelected ? "#e6f7ff" : "white"}}>
                                    {row.name}
                                </td>
                                <td style={{...cellStyle(2), backgroundColor: isSelected ? "#e6f7ff" : "white"}}>
                                    {formatDate(row.eventDate)}
                                </td>
                                <td style={{...cellStyle(3), backgroundColor: isSelected ? "#e6f7ff" : "white"}}>
                                    {formatDate(row.deadline)}
                                </td>
                                <td style={{...cellStyle(4), backgroundColor: isSelected ? "#e6f7ff" : "white"}}>
                                    {row.owner}
                                </td>
                                <td style={{...cellStyle(5), backgroundColor: isSelected ? "#e6f7ff" : "white"}}>
                                    {row.regeln}
                                </td>
                                <td style={{...cellStyle(6), backgroundColor: isSelected ? "#e6f7ff" : "white"}}>
                                    {row.ort}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


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