
import React, { useState, useEffect } from 'react';
import cookies from "js-cookie";
import './EventBearbeiten.css';

// 1. Accept onClose, onSuccess, and the event object to edit via props
function EventBearbeiten({ event: initialEvent, onClose, onSuccess }) {
    const [inputs, setInputs] = useState({});
    const [showMessage, setShowMessage] = useState(false);

    // 2. Load data directly from the event prop instead of React Router's location state
    useEffect(() => {
        if (initialEvent) {
            const splitDateTime = (isoString) => {
                if (!isoString) return { date: "", time: "" };
                const parts = isoString.split('T');
                return { date: parts[0], time: parts[1] ? parts[1].substring(0, 5) : "00:00" };
            };

            const deadlineParts = splitDateTime(initialEvent.deadline);
            const eventParts = splitDateTime(initialEvent.eventDate);

            setInputs({
                eventId: initialEvent.eventid || initialEvent.eventId,
                eventName: initialEvent.name || initialEvent.eventName,
                eventOrt: initialEvent.ort || initialEvent.eventOrt,
                rule: initialEvent.regeln || initialEvent.rule,
                deadlineDatePart: deadlineParts.date,
                deadlineTimePart: deadlineParts.time,
                datePart: eventParts.date,
                timePart: eventParts.time,
                eventDeadline: initialEvent.deadline,
                eventDate: initialEvent.eventDate
            });
        }
    }, [initialEvent]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
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
            if (name === "datePart" || name === "timePart") {
                const date = newValues.datePart || "";
                const time = newValues.timePart || "00:00";
                newValues.eventDate = `${date}T${time}`;
            }
            return newValues;
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const jetzt = new Date();
        const dateDeadline = new Date(inputs.eventDeadline);
        const dateEvent = new Date(inputs.eventDate);

        if (!inputs.eventDate || !inputs.eventDeadline) {
            alert("Bitte füllen Sie beide Datumsfelder (Event und Deadline) vollständig aus!");
            return;
        }

        const diffJetztZuEvent = dateDeadline - jetzt;
        const mindestVorlaufInMs = 24 * 60 * 60 * 1000;

        if (diffJetztZuEvent < mindestVorlaufInMs) {
            alert("Das Event muss mindestens 24 Stunden in der Zukunft liegen!");
            return;
        }

        const diffInMs = dateEvent - dateDeadline;
        const oneDayInMs = 24 * 60 * 60 * 1000;

        if (diffInMs < oneDayInMs) {
            alert("Sicherheitscheck: Das Event-Datum muss mindestens 24 Stunden nach der Deadline liegen, damit genug Zeit für die Vorbereitung bleibt!");
            return;
        }

        let combinedRule = inputs.rule;
        if (!combinedRule) {
            alert("Bitte wählen Sie einen Wert oder geben Sie eine Regel ein!");
            return;
        }



        let query = await fetch("/events/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Re-added credential handling matching your creation workflow if necessary:
                "quarkus-credential": cookies.get("quarkus-credential")
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
            return;
        }
        setShowMessage(true);
    }

    const handleOk = () => {
        setShowMessage(false);
        if (onSuccess) onSuccess(); // Signal parent to refresh data listings
        onClose(); // Close the modal
    }

    return (
        /* 3. Converted outer template layout structure to match EventAnlegen design */
        <div className="form-container">
            <h2 style={{textAlign: 'center'}}>Event Bearbeiten:</h2>

            <div className="form-row">
                <label>Eventname:</label>
                <input
                    type="text"
                    name="eventName"
                    placeholder="Eventname"
                    value={inputs.eventName || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <label>Partner Auslosungstag</label>
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
                <label>Geschenkübergabetag:</label>
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
                <label>Ort der Geschenkübergabe:</label>
                <input
                    type="text"
                    name="eventOrt"
                    placeholder="Ort"
                    value={inputs.eventOrt || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-row">
                <label>Regeln & Budget:</label>
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
                                /> {preset}
                            </label>
                        ))}
                    </div>
                    <input
                        type="text"
                        name="ruleCustom"
                        placeholder="z.B. 5€ + Keine Scherzgeschenke"
                        value={!["20€", "50€", "100€"].includes(inputs.rule) ? inputs.rule || "" : ""}
                        onChange={(e) => setInputs({...inputs, rule: e.target.value})}
                    />
                </div>
            </div>

            {/* 4. Streamlined Actions without page layout dependencies like Logout */}
            <div className="form-actions">
                <button type="button" onClick={handleSubmit}>
                    Event speichern
                </button>
                <input type="button" value="Abbrechen" onClick={onClose}/>
            </div>

            {/* Success Notification Popup */}
            {showMessage && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <p>Event aktualisiert!</p>
                        <button type="button" onClick={handleOk}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventBearbeiten;