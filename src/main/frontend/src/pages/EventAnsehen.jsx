import React, {useEffect, useRef, useState} from 'react';
//TODO remove following import css
// import styles from'./EventAnsehen.module.css';
import './EventAnsehen.css';
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";

//TODO Event Bearbeiten - noch nicht richtig eingebaut ggf. entfernen??
// Button Wichtelzuordnung starten ist für Testzwecke und sollte später
// automatisch bei Zuordnungsdatum stattfinden, daher dann button entfernen;


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
    const minVisibleRows = 4;
    const maxVisibleRows = 5;
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
    const [rows, setRows] = useState([]); // events
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [participants, setParticipants] = useState([]); // participants data
    const [loadingParticipants, setLoadingParticipants] = useState(false);
    const [selectedUserEmail, setSelectedUserEmail] = useState(""); // the user we are editing
    const [restrictions, setRestrictions] = useState({}); // { userEmail: [restrictedEmails] }
    const [selectedParticipantEmail, setSelectedParticipantEmail] = useState(null);

    // Fetch events owned by current user
    useEffect(() => {
        const fetchMyEvents = async () => {
            const res = await fetch('/api/events/mine', {
                method: "GET",
                credentials: "include"
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

    // Fetch participants for the selected event
    useEffect(() => {
        if (selectedEventId == null) return;
        const fetchParticipants = async () => {
            setLoadingParticipants(true);
            try {
                const res = await fetch(`/api/eventTeilnehmer/${selectedEventId}`, {
                    method: "GET",
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setParticipants(data);
                } else {
                    setParticipants([]);
                    setLoadingParticipants(false);
                }
            } catch (err) {
                console.error("Fehler beim Laden der Teilnehmer:", err);
                setParticipants([]);
            } finally {
                setLoadingParticipants(false);
            }
        };
        fetchParticipants();
    }, [selectedEventId]);

    // navigation & buttons
    const abbrechenClick = () => navigate("/eventVerwaltung");
    const zuTeilnehmer = (eventid) => {
        if (eventid) {
            navigate("/eventVerwaltung/eventAnsehen/teliEinsehen", {
                state: { eventid },
            });
        }
    };
    const zuBearbeiten = () => navigate("/eventVerwaltung/eventAnsehen/eventBearbeiten");
    const wichtelzuOrdnung = () => {};
    const ausloggen = () => {
        cookies.remove("quarkus-credential");
        cookies.remove("username");
        navigate("/anmelden");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    };

    const stickyThStyle = {
        position: "sticky",
        top: 0,
        zIndex: 2,
        backgroundColor: "#f2f2f2", // same as header background
    };

    //New participants table components
    // const ParticipantsRow = ({ userEmail, eventId, radio }) => {
    //     const renderStatus = () => {
    //         if (radio === 0) return '☐';           // empty box
    //         if (radio === 1) return '✅';           // tick/swish
    //         return '';                              // fallback
    //     };
    //
    //     return (
    //         <tr>
    //             {/* <td>{eventId}</td> */}
    //             <td>{userEmail}</td>
    //             <td style={{ textAlign: "center", fontSize: "18px" }}>{renderStatus()}</td>
    //         </tr>
    //     );
    // };
    const ParticipantsRow = ({ userEmail, eventId, radio, isSelected, onSelect }) => {
        const [isHovered, setIsHovered] = useState(false);

        const backgroundColor = isSelected
            ? "#d0f0ff"  // selected
            : isHovered
                ? "#f2faff"  // hover
                : "transparent";

        return (
            <tr
                onClick={() => onSelect(userEmail)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer", backgroundColor, transition: "background-color 0.15s" }}
            >
                <td>{userEmail}</td>
                <td style={{ textAlign: "center", fontSize: "18px" }}>
                    {radio === 0 ? "☐" : "✅"}
                </td>
            </tr>
        );
    };

    const ParticipantsTable = ({ data, selectedEventId }) => {
        // Determine what message to show in the empty table
        let emptyMessage = "";
        if (selectedEventId == null) {
            emptyMessage = "Bitte ein Event auswählen";
        } else if (data.length === 0) {
            emptyMessage = "Keine Teilnehmer vorhanden";
        }
        return (
            <div
                className="participants-table-container"
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    width: "1200px",
                    margin: "0 auto",
                    marginTop: "15px",
                    marginBottom: "15px",
                }}
            >
                {/* Left side: actual Table*/}
                <div
                    style={{
                        width: "550px",
                        textAlign: "left",
                    }}
                >
                    {/*<h3 style={{marginLeft: "10px"}}>Teilnehmerliste</h3>*/}
                    <h3>Teilnehmerliste</h3>
                    <div className="table-window"
                         style={{
                             maxHeight: participants.length > 6 ? '290px' : 'auto', // 6 rows * ~41px per row
                             overflowY: participants.length > 6 ? 'auto' : 'visible',
                             border: "1px solid #ccc",
                             borderRadius: "4px",
                         }}
                    >
                        <table style={{borderCollapse: "collapse", width: "100%"}}>
                            <thead>
                            <tr>
                                {/*<th style={{border: "1px solid #ccc", padding: "8px"}}>Event ID</th>*/}
                                <th style={{border: "1px solid #ccc", padding: "8px", ...stickyThStyle}}>Teilnehmer</th>
                                <th style={{border: "1px solid #ccc", padding: "8px", ...stickyThStyle}}>Eingeladen</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.length > 0 ? (
                                data.map((row, index) => (
                                    <ParticipantsRow
                                        key={index}
                                        // eventId={row.eventId}
                                        userEmail={row.userEmail}
                                        radio={row.radio}
                                        isSelected={selectedParticipantEmail === row.userEmail}
                                        onSelect={setSelectedParticipantEmail}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{textAlign: "center", padding: "10px", color: "#999"}}>
                                        {emptyMessage}
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/*Right side: 650px reserved */}
                {/*<div*/}
                {/*    style={{*/}
                {/*        width: "650px",*/}
                {/*        backgroundColor: "white",*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <h3 style={{marginBottom: "10px"}}>Teilnehmer bearbeiten</h3>*/}

                {/*    /!* Event ID (readonly) *!/*/}
                {/*    <div style={{marginBottom: "15px"}}>*/}
                {/*        <label*/}
                {/*            htmlFor="eventId"*/}
                {/*            style={{*/}
                {/*                display: "block",*/}
                {/*                fontWeight: "bold",*/}
                {/*                marginBottom: "5px",*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            Event ID:*/}
                {/*        </label>*/}
                {/*        <input*/}
                {/*            type="text"*/}
                {/*            id="eventId"*/}
                {/*            value={selectedEventId || ""}*/}
                {/*            readOnly*/}
                {/*            style={{*/}
                {/*                width: "75px",*/}
                {/*                padding: "8px",*/}
                {/*                border: "1px solid #ccc",*/}
                {/*                borderRadius: "4px",*/}
                {/*                backgroundColor: "#f5f5f5",*/}
                {/*                color: "#555",*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </div>*/}

                {/*    /!* Email address input *!/*/}
                {/*    <div style={{marginBottom: "15px"}}>*/}
                {/*        <label*/}
                {/*            htmlFor="participantEmail"*/}
                {/*            style={{*/}
                {/*                display: "block",*/}
                {/*                fontWeight: "bold",*/}
                {/*                marginBottom: "5px",*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            Teilnehmer Emailadresse:*/}
                {/*        </label>*/}
                {/*        <input*/}
                {/*            type="email"*/}
                {/*            id="participantEmail"*/}
                {/*            placeholder="name@example.com"*/}
                {/*            style={{*/}
                {/*                width: "250px",*/}
                {/*                padding: "8px",*/}
                {/*                border: "1px solid #ccc",*/}
                {/*                borderRadius: "4px",*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </div>*/}

                {/*    /!* Add/Remove button *!/*/}
                {/*    <div>*/}
                {/*        <button*/}
                {/*            type="button"*/}
                {/*            style={{*/}
                {/*                padding: "10px 20px",*/}
                {/*                backgroundColor: "#007bff",*/}
                {/*                color: "white",*/}
                {/*                border: "none",*/}
                {/*                borderRadius: "4px",*/}
                {/*                cursor: "pointer",*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            Hinzufügen / Entfernen*/}
                {/*        </button>*/}
                {/*    </div>*/}


                {/*</div>*/}
                <div style={{width: "650px", backgroundColor: "white", paddingLeft: "10px"}}>
                    <div>
                        <h3 style={{marginBottom: "10px"}}>Teilnehmer bearbeiten</h3>
                        <div style={{display: "flex", alignItems: "flex-end", gap: "10px", marginBottom: "15px"}}>
                            {/* Event ID */}
                            <div>
                                <label htmlFor="eventId"
                                       style={{display: "block", fontWeight: "bold", marginBottom: "5px"}}>
                                    Event ID
                                </label>
                                <input
                                    type="text"
                                    id="eventId"
                                    value={selectedEventId || ""}
                                    readOnly
                                    style={{
                                        width: "75px",
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        backgroundColor: "#f5f5f5",
                                        color: "#555",
                                    }}
                                />
                            </div>

                            {/* Email input */}
                            <div>
                                <label htmlFor="participantEmail"
                                       style={{display: "block", fontWeight: "bold", marginBottom: "5px"}}>
                                    Teilnehmer Email
                                </label>
                                <input
                                    type="email"
                                    id="participantEmail"
                                    placeholder="name@example.com"
                                    style={{
                                        width: "300px",
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>

                            {/* Add/Remove button */}
                            <div>
                                <button
                                    type="button"
                                    style={{
                                        padding: "10px 20px",
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        marginTop: "22px", // align with inputs
                                    }}
                                >
                                    Hinzufügen / Entfernen
                                </button>
                            </div>
                        </div>
                    </div>


                    <div style={{marginTop: "20px", paddingTop: "10px", borderTop: "1px solid #ccc"}}>
                        <h4 style={{marginBottom: "10px"}}>Einschränkungen: Wer darf an wen keine Geschenke überreichen?</h4>

                        {/* Dropdown / checkbox list of participants (excluding selected user) */}
                        {selectedUserEmail ? (
                            <div>
                                {participants
                                    .filter(p => p.userEmail !== selectedUserEmail)
                                    .map((p, idx) => (
                                        <label key={idx} style={{display: "block", marginBottom: "4px"}}>
                                            <input
                                                type="checkbox"
                                                checked={
                                                    restrictions[selectedUserEmail]?.includes(p.userEmail) || false
                                                }
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setRestrictions(prev => {
                                                        const current = prev[selectedUserEmail] || [];
                                                        let updated;
                                                        if (checked) {
                                                            updated = [...current, p.userEmail];
                                                        } else {
                                                            updated = current.filter(email => email !== p.userEmail);
                                                        }
                                                        return {...prev, [selectedUserEmail]: updated};
                                                    });
                                                }}
                                            />
                                            {p.userEmail}
                                        </label>
                                    ))
                                }

                                <button
                                    type="button"
                                    style={{
                                        marginTop: "10px",
                                        padding: "8px 15px",
                                        backgroundColor: "#28a745",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        // call API to save restrictions for selectedUserEmail
                                        console.log("Save restrictions:", restrictions[selectedUserEmail]);
                                    }}
                                >
                                    Speichern
                                </button>
                            </div>
                        ) : (
                            <p>Bitte zuerst einen Teilnehmer auswählen</p>
                        )}
                    </div>


                </div>


            </div>
        );
    };

    // --- JSX Layout ---
    return (
        <form onSubmit={handleSubmit}>
            <h2 className="eventa-form-title">Meine Events</h2>

            {/* Events Table */}
            <Table
                data={rows}
                selectedId={selectedEventId}
                onSelect={(id) => {
                    setSelectedEventId(id);
                }}
            />

            {/* Participants Table */}
            <div>
                {loadingParticipants ? (
                    <p style={{textAlign: "left", marginLeft: "5%"}}>
                        Teilnehmer werden geladen...
                    </p>
                ) : (
                    <ParticipantsTable data={participants} selectedEventId={selectedEventId}/>
                )}
            </div>

            {/* Buttons below */}
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