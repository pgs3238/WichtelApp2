import React, {useEffect, useRef, useState} from 'react';
//TODO remove following import css
// import styles from'./EventAnsehen.module.css';
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

const Row = ({ eventid, deadline, eventdate, name, owner, regeln, ort, isSelected, onSelect, cellStyle }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Determine background color based on hover + selected
    let backgroundColor = "transparent";
    if (isSelected) backgroundColor = "#d0f0ff"; // clicked row
    else if (isHovered) backgroundColor = "#f2faff"; // hovered row

    return (
        <tr
            onClick={() => onSelect(eventid)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                    backgroundColor,
                    cursor: "pointer",
                    transition: "background-color 0.15s ease-in-out",
                }}
        >
            <td style={{...cellStyle(0), backgroundColor}}>{eventid}</td>
            <td style={{...cellStyle(1), backgroundColor}}>{name}</td>
            <td style={{...cellStyle(2), backgroundColor}}>{eventdate}</td>
            <td style={{...cellStyle(3), backgroundColor}}>{deadline}</td>
            <td style={{...cellStyle(4), backgroundColor}}>{owner}</td>
            <td style={{...cellStyle(5), backgroundColor}}>{regeln}</td>
            <td style={{...cellStyle(6), backgroundColor}}>{ort}</td>
        </tr>
    );
};

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
    const rowHeight = 41;
    const minVisibleRows = 5;
    const maxVisibleRows = 6;
    const bodyHeight = Math.max(minVisibleRows, Math.min(data.length, maxVisibleRows)) * rowHeight;

    const tableRef = useRef(null);
    const [colWidths, setColWidths] = useState([]);

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

    // Optional: measure text widths to create column widths (keeps your layout)
    useEffect(() => {
        if (!tableRef.current) return;
        const headerCells = Array.from(tableRef.current.querySelectorAll("thead th"));
        const bodyRows = Array.from(tableRef.current.querySelectorAll("tbody tr"));

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.font = "16px Arial, sans-serif";
        const measureText = (text) => ctx.measureText(text || "").width + 24;

        const headerWidths = headerCells.map((th) => measureText(th.textContent));
        const bodyWidths = new Array(columns.length).fill(0);

        bodyRows.forEach((row) => {
            const cells = Array.from(row.querySelectorAll("td"));
            cells.forEach((td, i) => {
                bodyWidths[i] = Math.max(bodyWidths[i], measureText(td.textContent || ""));
            });
        });

        let widths = headerWidths.map((w, i) => Math.max(w, bodyWidths[i]));
        const totalWidth = widths.reduce((a, b) => a + b, 0);
        if (totalWidth > maxTableWidth) {
            const scale = maxTableWidth / totalWidth;
            widths = widths.map((w) => Math.floor(w * scale));
        }

        setColWidths(widths);
    }, [data]);

    // Inline style helpers
    const cellStyle = (i, isHeader = false) => ({
        border: "1px solid #ccc",
        padding: "8px",
        backgroundColor: isHeader ? "#f2f2f2" : "white",
        fontWeight: isHeader ? "bold" : "normal",
        width: colWidths[i] ? `${colWidths[i]}px` : undefined,
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
        overflow: "hidden", // ensures header masks body edges
        position: "relative",           // allow overlay element
    };

    // Scroll container: this is what scrolls. The <table> inside will keep thead visible (sticky).
    const scrollContainerStyle = {
        overflowY: "auto",
        maxHeight: `${bodyHeight}px`,
        width: "100%",
        position: "relative",
    };

    const tableStyle = {
        // borderCollapse: "separate", // prevent border overlap rendering bug
        borderCollapse: "collapse",     // back to crisp borders
        // borderSpacing: 0,           // remove gaps between cells
        width: "100%",
        tableLayout: "fixed", // important for consistent column widths
    };

    const stickyThStyle = {
        position: "sticky",
        top: 0,
        zIndex: 2,
        backgroundColor: "#f2f2f2",
        // borderBottom: "2px solid #ccc",
        borderTop: "0 none",        // prevent double border above
        // boxShadow: "0 2px 3px rgba(0,0,0,0.05)", // slight shadow for separation
    };

    return (
        <div style={containerStyle}>
            {/* Solid top strip to mask any 1-px bleed */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    backgroundColor: "#f2f2f2",
                    zIndex: 6,
                }}
            />
            <div style={scrollContainerStyle}>
                <table ref={tableRef} style={tableStyle}>
                    <colgroup>
                        {columns.map((_, i) => (
                            // If colWidths is present, set each <col>'s width; otherwise let tableLayout handle it.
                            <col key={i} style={colWidths[i] ? { width: `${colWidths[i]}px`, boxSizing: "border-box" } : undefined} />
                        ))}
                    </colgroup>
                    <thead>
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} style={{ ...cellStyle(i, true), ...stickyThStyle }}>
                                {col}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => {
                        const id = row.eventId ?? row.eventid;
                        const isSelected = id === selectedId;

                        return (
                            <Row
                                key={id}
                                eventid={id}
                                name={row.name}
                                eventdate={formatDate(row.eventDate)}
                                deadline={formatDate(row.deadline)}
                                owner={row.owner}
                                regeln={row.regeln}
                                ort={row.ort}
                                isSelected={isSelected}
                                onSelect={onSelect}
                                cellStyle={cellStyle}
                            />
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