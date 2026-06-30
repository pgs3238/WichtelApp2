import React, {useEffect, useRef, useState, useCallback} from "react";
import './EventVerwaltung.css'
import './Modals.css'
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";
import EventAnlegen from "./EventAnlegenModal";

// TODO - Add function to Buttons - An Event Teilnehmen, E-Mail an Eventverwalter (do i want this button)









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
            <td style={{...cellStyle(4), backgroundColor}}>{owner}</td>
            <td style={{...cellStyle(2), backgroundColor}}>{deadline}</td>
            <td style={{...cellStyle(3), backgroundColor}}>{eventdate}</td>
            <td style={{...cellStyle(6), backgroundColor}}>{ort}</td>
            <td style={{...cellStyle(5), backgroundColor}}>{regeln}</td>
        </tr>
    );
};

const Table = ({data, selectedId, onSelect}) => {
    const columns = [
        "Event ID",
        "Eventname",
        "Ersteller",
        "Auslosungstag",
        "Bescherung",
        "Übergabeort",
        "Regeln & Budget",

    ];

    const maxTableWidth = 1200;
    const rowHeight = 36;
    const maxVisibleRows = 5;
    const totalTableHeight = (maxVisibleRows + 1) * rowHeight;

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
                if(cells[i]) {
                    bodyWidths[i] = Math.max(bodyWidths[i], measureText(td.textContent || ""));
                }
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
        height: `${rowHeight}px`, //TODO newest change!!!
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
        // maxHeight: `${bodyHeight}px`,//TODO check renew!!
        height: `${totalTableHeight}px`,
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
                                deadline={formatDate(row.deadline)}
                                eventdate={formatDate(row.eventDate)}
                                owner={row.owner}
                                regeln={row.regeln}
                                ort={row.ort}
                                isSelected={isSelected}
                                onSelect={onSelect}
                                cellStyle={cellStyle}
                            />
                        );
                    })}

                    {/* Generate and render empty placeholder rows if data is less than maxVisibleRows */}
                    {Array.from({ length: Math.max(0, maxVisibleRows - data.length) }).map((_, index) => (
                        // <tr key={`empty-${index}`} style={{ height: `${rowHeight}px` }}>
                        <tr key={`empty-${index}`}>
                            {columns.map((_, colIndex) => (
                                <td
                                    key={colIndex}
                                    style={{
                                        ...cellStyle(colIndex, false),
                                        backgroundColor: "white",
                                        cursor: "default"
                                    }}
                                >
                                    {/* Non-breaking space keeps the cell height matching perfectly */}
                                    {/*&nbsp;*/}
                                </td>
                            ))}
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};








// --- Haupt-Layout Komponente für die EventVerwaltung ---
function Layout() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const [rows, setRows] = useState([]); // Alle Events (eigene + eingeladene)
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [isAnlegenOpen, setIsAnlegenOpen] = useState(false);

    // API-Call: Holt ALLE Events für den Nutzer (angepasster Endpunkt)
    const fetchAllEvents = useCallback(async () => {
        try {
            const res = await fetch('/api/events', { // Hier deinen echten API-Endpunkt für alle Events nutzen
                method: "GET",
                credentials: "include"
            });
            if (res.ok) {
                const data = await res.json();
                setRows(data);
            } else {
                alert("Fehler beim Laden der Events");
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Events:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllEvents();
    }, [fetchAllEvents]);

        const eventAnlegen = () => {
        navigate("/eventVerwaltung/eventAnlegen");
    }

    const zuEigenenEvents = () => navigate("/eventVerwaltung/eventAnsehen");

    const anEventTeilnehmen = () => {
        if (!selectedEventId) {
            alert("Bitte wählen Sie zuerst ein Event aus.");
            return;
        }
        // Logik für die Teilnahme (z.B. API-Call oder Weiterleitung)
        alert(`Teilnahme an Event ${selectedEventId} bestätigt! -> Not Implemented yet`);
    };

    const email = () => {
        navigate("/messageService/mitteilungAnOrganisator");
    }

    const ausloggen = () => {
        cookies.remove("quarkus-credential");
        cookies.remove("username");
        navigate("/home");
    };

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
            <h2 className="eventa-form-title">Events & Einladungen</h2>

            {/* Tabellen-Komponente */}
            <Table
                data={rows}
                selectedId={selectedEventId}
                onSelect={(id) => setSelectedEventId(id)}
            />

            {/* Buttons für Aktionen */}
            <div className="button-group" style={{zIndex: 5}}>
                <div className="eventedit" style={{margin: "20px 0"}}>
                    <input
                        type="button"
                        value="An Event teilnehmen"
                        onClick={anEventTeilnehmen}
                        disabled={!selectedEventId}
                        style={{marginRight: "10px"}}
                    />
                    <input
                        type="button"
                        value="E-Mail an Eventverwalter"
                        onClick={email}
                    />
                </div>
                <div className="eventanlegen">
                    <input
                        type="button"
                        value="Neues Event anlegen"
                        onClick={() => setIsAnlegenOpen(true)}
                        style={{marginRight: "10px"}}
                    />
                    <input
                        type="button"
                        value="Zu meinen eigenen Events"
                        onClick={zuEigenenEvents}
                    />
                </div>
                <div className="eventanlegenAlt">
                    <input
                        type="button"
                        value="Neues Event anlegen (alt)"
                        onClick={eventAnlegen}
                    />
                </div>
            </div>
            <div className="logout" style={{ marginTop: "30px" }}>
                <input type="button" value="Logout" onClick={ausloggen} />
            </div>

            {/* Modal zum Anlegen eines neuen Events */}
            {isAnlegenOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <EventAnlegen
                            onClose={() => setIsAnlegenOpen(false)}
                            onSuccess={fetchAllEvents}
                        />
                    </div>
                </div>
            )}
        </form>
    );
}
































// const TableWindow = ({ data =[] }) => { // default empty array
//     const minVisibleRows = 5;
//     const maxVisibleRows = 10;
//     const rowHeight = 40; // approximate height of a row in px
//     const rowCount = Array.isArray(data) ? data.length : 0;
//     const bodyHeight = Math.max(minVisibleRows, Math.min(data.length, maxVisibleRows)) * rowHeight;
//
//     // Date formatter (DD.MM.YYYY HH:MM, 24h)
//     const formatDate = (isoString) => {
//         if (!isoString) return "";
//         const d = new Date(isoString);
//         return d
//             .toLocaleString("de-DE", {
//                 year: "numeric",
//                 month: "2-digit",
//                 day: "2-digit",
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: false,
//             })
//             .replace(",", ""); // remove comma from German locale
//     };
//
//
//     return (
//         <div className="table-window" style={{zIndex: 5}}>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>Event ID</th>
//                     <th>Eventname</th>
//                     <th>Ersteller</th>
//                     <th>Auslosungstag</th>
//                     <th>Bescherung</th>
//                     <th>Übergabeort</th>
//                     <th>Regeln & Budget</th>
//                 </tr>
//                 </thead>
//                 <tbody className="table-window-body" style={{ maxHeight: `${bodyHeight}px` }}>
//                 {rowCount > 0 ? (
//                     data.map((row) => (
//                         <tr key={row.eventId}>
//                             <td>{row.eventId}</td>
//                             <td>{row.name}</td>
//                             <td>{row.owner}</td>
//                             <td>{formatDate(row.deadline)}</td>
//                             <td>{formatDate(row.eventDate)}</td>
//                             <td>{row.ort}</td>
//                             <td>{row.regeln}</td>
//                         </tr>
//                     ))
//                 ) : (
//                     <tr>
//                         <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
//                             No events available
//                         </td>
//                     </tr>
//                 )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
// function Layout() {
//
//     const [inputs, setInputs] = useState({});
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const navigate = useNavigate();
//     //const [rows, setRows] = useState(events);
//     const [rows, setRows] = useState([]);
//
//
//
//     const fetchData = () => {
//         fetch("/api/events", {
//             headers: {
//                 "Authorization": "Bearer " + cookies.get("quarkus-credential")
//             }
//         })
//             .then(res => res.json())
//             .then(data => setRows(data))
//             .catch(err => console.error("Fetch error:", err));
//     };
//
//     // 2. Call fetchData on initial load
//     useEffect(() => {
//         fetchData();
//     }, []);
//
//
//     //Neuer Code für neue Backend Tabelle??
//     useEffect(() => {
//         fetch("/api/events", {
//             headers: {
//                 "Authorization": "Bearer " + cookies.get("quarkus-credential")
//             }
//         })
//             .then(res => res.json())
//             .then(data => setRows(data))
//             .catch(err => console.error(err));
//     }, []);
//
//     const eventAnlegen = () => {
//         navigate("/eventVerwaltung/eventAnlegen");
//     }
//
//     const eventAnsehen = () => {
//         navigate("/eventVerwaltung/eventAnsehen");
//     }
//
//     const ausloggen = () => {
//         cookies.remove("quarkus-credential");
//         cookies.remove("username");
//         navigate("/home");
//     }
//
//     const email = () => {
//         navigate("/messageService/mitteilungAnOrganisator");
//     }
//
//     const handleChange = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setInputs(values => ({...values, [name]: value}))
//     }
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         alert(inputs);
//     }
//
//     return (
//         <form onSubmit={handleSubmit}>
//
//             <h2 className="eventv-form-title" style={{zIndex: 5}}>Alle Events & Einladungen</h2>
//             <TableWindow data={rows} title="Eventverwaltung" />
//             <div className="button-group" style={{zIndex: 5}}>
//                 <div className="eventansehen">
//                     <input
//                         type="submit"
//                         id="eventteilnehmen"
//                         value="An Event teilnehmen"
//                     />
//                     <input
//                         type="button"
//                         id="email"
//                         value="E-Mail an Eventverwalter"
//                         onClick={email}
//                     />
//                 </div>
//                 <div className="eventanlegen">
//                     <input
//                         type="button"
//                         id="eventanlegen"
//                         value="Event Anlegen"
//                         onClick={eventAnlegen}
//                     />
//                     <input
//                         type="button"
//                         id="eventanlegen"
//                         value="Event Anlegen (pop)"
//                         onClick={(e) => {
//                             e.preventDefault();
//                             setIsPopupOpen(true);
//                         }}
//                     />
//                     <input
//                         type="button"
//                         id="eventansehen"
//                         value="Eigene Events anzeigen"
//                         onClick={eventAnsehen}
//                     />
//                 </div>
//             </div>
//             <div className="logout" style={{zIndex: 5}}>
//                 <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
//             </div>
//             {isPopupOpen && (
//                 <div className="popup-overlay">
//                     <div className="popup-content">
//                         <EventAnlegen
//                             onClose={() => setIsPopupOpen(false)}
//                             onSuccess={fetchData} // Refresh table after saving
//                         />
//                     </div>
//                 </div>
//             )}
//         </form>
//     );
// }

export default Layout;