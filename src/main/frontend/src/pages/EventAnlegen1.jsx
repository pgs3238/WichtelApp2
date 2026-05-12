import React, {useState} from 'react';
import cookies from "js-cookie";
import './EventAnlegen.css';

// We now accept 'onClose' and 'onSuccess' as props
function EventAnlegen({ onClose, onSuccess }) {
    const [inputs, setInputs] = useState({});
    const [showMessage, setShowMessage] = useState(false);

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

        // Validation (Logic remains exactly as you wrote it)
        const jetzt = new Date();
        const dateDeadline = new Date(inputs.eventDeadline);
        const dateEvent = new Date(inputs.eventDate);

        if (!inputs.eventDate || !inputs.eventDeadline) {
            alert("Bitte füllen Sie beide Datumsfelder vollständig aus!");
            return;
        }

        if ((dateDeadline - jetzt) < 24 * 60 * 60 * 1000) {
            alert("Das Event muss mindestens 24 Stunden in der Zukunft liegen!");
            return;
        }

        if ((dateEvent - dateDeadline) < 24 * 60 * 60 * 1000) {
            alert("Sicherheitscheck: Das Event-Datum muss mindestens 24 Stunden nach der Deadline liegen!");
            return;
        }

        if (!inputs.rule) {
            alert("Bitte wählen Sie einen Wert oder geben Sie eine Regel ein!");
            return;
        }

        let query = await fetch("/events/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "quarkus-credential": cookies.get("quarkus-credential")
            },
            body: JSON.stringify({
                "name": inputs.eventName,
                "regeln": inputs.rule,
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
        if (onSuccess) onSuccess(); // Notify parent to refresh data
        onClose(); // Close the popup
    }

    return (
        /* We wrap everything in the form-container.
           The 'Logout' button is removed as it doesn't belong in a popup. */
        // <form onSubmit={handleSubmit} className="form-container">
        <div className="form-container">
            <h2 style={{textAlign: 'center' }}>Neues Event:</h2>

            <div className="form-row">
                <label>Eventname:</label>
                <input type="text" name="eventName" onChange={handleChange} required/>
            </div>

            <div className="form-row">
                <label>Wichtel-Deadline:</label>
                <div className="datetime-group">
                    <input type="date" name="deadlineDatePart" onChange={handleDateTimeChange} required/>
                    <input type="time" name="deadlineTimePart" onChange={handleDateTimeChange} required/>
                </div>
            </div>

            <div className="form-row">
                <label>Regeln:</label>
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
                        placeholder="Eigene Regel..."
                        value={!["20€", "50€", "100€"].includes(inputs.rule) ? inputs.rule || "" : ""}
                        onChange={(e) => setInputs({...inputs, rule: e.target.value})}
                    />
                </div>
            </div>

            <div className="form-row">
                <label>Ort:</label>
                <input type="text" name="eventOrt" placeholder="Ort" onChange={handleChange}/>
            </div>

            <div className="form-row">
                <label>Geschenk-Verteilung:</label>
                <div className="datetime-group">
                    <input type="date" name="datePart" onChange={handleDateTimeChange} required/>
                    <input type="time" name="timePart" onChange={handleDateTimeChange} required/>
                </div>
            </div>

            <div className="form-actions">
                {/*<input type="submit" value="Event speichern"/>*/}
                <button type="button" onClick={handleSubmit}>
                    Event speichern
                </button>
                {/* Abbrechen now just calls onClose */}
                <input type="button" value="Abbrechen" onClick={onClose}/>
            </div>

            {/* Success Modal */}
            {showMessage && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <p>Event angelegt!</p>
                        <button type="button" onClick={handleOk}>OK</button>
                    </div>
                </div>
            )}
        {/*</form>*/}
        </div>
    );
}

export default EventAnlegen;