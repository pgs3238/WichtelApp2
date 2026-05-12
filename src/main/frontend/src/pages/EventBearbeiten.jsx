
import React, {useState, useEffect} from 'react';
import './EventBearbeiten.css'
import {useNavigate, useLocation} from "react-router-dom";
import cookies from "js-cookie";


function Layout() {
    const [inputs, setInputs] = useState({});
    const [showMessage, setShowMessage] = useState(false); // <-- modal flag
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.event) {
            const ev = location.state.event;

            const splitDateTime = (isoString) => {
                if (!isoString) return { date:"", time:""};
                const parts = isoString.split('T');
                console.log("Current Inputs State:", inputs);
                return { date: parts[0], time: parts[1] ? parts[1].substring(0, 5) : "00:00" };
            };

            const deadlineParts = splitDateTime(ev.deadline);
            const eventParts = splitDateTime(ev.eventDate);

            setInputs({
                eventId: ev.eventid || ev.eventId,
                eventName: ev.name,
                eventOrt: ev.ort,
                rule: ev.regeln,
                deadlineDatePart: deadlineParts.date,
                deadlineTimePart: deadlineParts.time,
                datePart: eventParts.date,
                timePart: eventParts.time,
                eventDeadline: ev.deadline,
                eventDate:ev.eventDate
            });
        }
    }, [location.state]);

    // useEffect(() => {
    //     if (location.state?.event) {
    //         console.log("EXACT KEYS IN DATA:", Object.keys(location.state.event));
    //         // Check if it says 'name' or maybe 'eventName'?
    //         // Check if it says 'ort' or maybe 'location'?
    //     }
    // }, [location.state]);

    const handleClick = () => {
        navigate("/eventVerwaltung/eventAnsehen")
    }

    const ausloggen = () => {
        cookies.remove("quarkus-credential");
        cookies.remove("username");
        navigate("/home");
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleDateTimeChange = (event) => {
        const { name, value } = event.target;

        setInputs(values => {
            const newValues = { ...values, [name]: value };

            if (name === "deadlineDatePart" || name === "deadlineTimePart") {
                const date = newValues.deadlineDatePart || "";
                const time = newValues.deadlineTimePart || "00:00";
                newValues.eventDeadline = `${date}T${time}`;
            }
            // Sobald sich datePart oder timePart ändert, aktualisieren wir eventDate
            if (name === "datePart" || name === "timePart") {
                const date = newValues.datePart || "";
                const time = newValues.timePart || "00:00";
                // Wir setzen das Feld, das dein Backend erwartet:
                newValues.eventDate = `${date}T${time}`;
            }
            return newValues;
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 1. Validierung der Logik (Datum & Uhrzeit)
        const jetzt = new Date();
        const dateDeadline = new Date(inputs.eventDeadline);
        const dateEvent = new Date(inputs.eventDate);


        // Prüfen, ob beide Daten überhaupt gesetzt sind
        if (!inputs.eventDate || !inputs.eventDeadline) {
            alert("Bitte füllen Sie beide Datumsfelder (Event und Deadline) vollständig aus!");
            return;
        }

        // Differenz in Millisekunden berechnen zwischen "Heute" und Wichteltermin
        const diffJetztZuEvent = dateDeadline - jetzt;
        const mindestVorlaufInMs = 24 * 60 * 60 * 1000; // 24 Stunden

        if (diffJetztZuEvent < mindestVorlaufInMs) {
            alert("Das Event muss mindestens 24 Stunden in der Zukunft liegen!");
            return;
        }

        // Differenz in Millisekunden berechnen zwischen Wichteltermin und Abgabetermin
        const diffInMs = dateEvent - dateDeadline;
        const oneDayInMs = 24 * 60 * 60 * 1000; // 24 Stunden

        if (diffInMs < oneDayInMs) {
            alert("Sicherheitscheck: Das Event-Datum muss mindestens 24 Stunden nach der Deadline liegen, damit genug Zeit für die Vorbereitung bleibt!");
            return;
        }

        // 2. Regel-Check
        let combinedRule = inputs.rule;
        if (!combinedRule) {
            alert("Bitte wählen Sie einen Wert oder geben Sie eine Regel ein!");
            return;
        }

        let query = await fetch("/events/update", {
            method: "POST",
            headers: {
                //"":JSON.parse(document.cookie)["quarkus-credential"],
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                "eventId": inputs.eventId,
                "name": inputs.eventName,
                "regeln": combinedRule,
                "deadline": inputs.eventDeadline,
                "ort": inputs.eventOrt,
                "eventDate": inputs.eventDate
            })
        });

        if (query.status !== 200) {
            let json = await query.json();
            alert(JSON.stringify(json));
            return
        }
        setShowMessage(true);
    }

    const handleOk = () => {
        setShowMessage(false);
        navigate("/eventVerwaltung/eventAnsehen");
    }

    return (
        <>

            <form onSubmit={handleSubmit} className={"form-container"}>
                <h2 style={{textAlign: 'center' }}>Event Bearbeiten:</h2>

                <div className="form-row">
                    <label> Wie heißt das Event? </label>
                    <input
                        type="text"
                        name="eventName"
                        placeholder="Eventname"
                        value={inputs.eventName || ""}
                        onChange={handleChange}
                        // onChange={(e) => setInputs({...inputs, named: e.target.value})}
                    />
                </div>
                <div className="form-row">
                    <label>Wann wird gewichtelt? </label>
                    <div className="datetime-group">
                        <input
                            type="date"
                            name="deadlineDatePart"
                            value={inputs.deadlineDatePart || ""}
                            onChange={handleDateTimeChange}
                            required
                        />
                        <input
                            type="time"
                            name="deadlineTimePart"
                            value={inputs.deadlineTimePart || ""}
                            onChange={handleDateTimeChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <label> Regeln:</label>
                    <div className="rules-wrapper">
                        <div className="rules-radios">
                            {["20€", "50€", "100€"].map((preset) => (
                                <label key={preset}>
                                    <input
                                        type="radio"
                                        name="rulePreset"
                                        value={preset}
                                        checked={inputs.rule === preset}
                                        onChange={() => setInputs({...inputs, rule: preset})}
                                    />
                                    {preset}
                                </label>
                            ))}
                        </div>
                        <input
                            type="text"
                            name="ruleCustom"
                            placeholder="z.B. 5€ + Keine Scherzgeschenke"
                            value={
                                !["20€", "50€", "100€"].includes(inputs.rule) ? inputs.rule || "" : ""
                            }
                            onChange={(e) => setInputs({...inputs, rule: e.target.value})}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <label> Wann ist die Geschenkübergabe: </label>
                    <div className="datetime-group">
                        <input
                            type="date"
                            name="datePart"
                            value={inputs.datePart || ""}
                            onChange={handleDateTimeChange}
                            required
                        />
                        <input
                            type="time"
                            name="timePart"
                            value={inputs.timePart || ""}
                            onChange={handleDateTimeChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <label> Wo ist die Geschenkübergabe: </label>
                    <input
                        type="text"
                        name="eventOrt"
                        placeholder="Ort"
                        value={inputs.eventOrt || ""}
                        onChange={handleChange}
                        // onChange={(e) => setInputs({...inputs, area: e.target.value})}
                    />
                </div>
                <div className="form-actions">
                    <input type="submit" value="Event speichern"/>
                    <input type="button" value="Abbrechen" onClick={handleClick}/>
                </div>
                <div className="logout">
                    <input type="button" value="Logout" onClick={ausloggen}/>
                </div>
            </form>

            {/* Success Modal */}
            {showMessage && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <p>Event aktualisiert!</p>
                        <button onClick={handleOk}>OK</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Layout;