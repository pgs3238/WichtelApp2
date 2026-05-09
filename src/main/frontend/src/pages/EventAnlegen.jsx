
import React, {useState} from 'react';
import cookies from "js-cookie";
import './EventAnlegen.css'
import {useNavigate} from "react-router-dom";

// Todo change DateTime picker to MUI DateTimePicker - Problem is timezone is added.
//  Backend needs modification to handle it.
//  Frontend needs modification to handle Timezones. https://mui.com/x/react-date-pickers/
//  alternative, just incase: https://www.npmjs.com/package/react-datepicker

function Layout() {
    const [inputs, setInputs] = useState({});
    const [showMessage, setShowMessage] = useState(false); // <-- modal flag
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/eventVerwaltung")
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

            // Sobald sich datePart oder timePart ändert, aktualisieren wir eventDate
            if (name === "datePart" || name === "timePart") {
                const date = newValues.datePart || "";
                const time = newValues.timePart || "00:00";
                // Wir setzen das Feld, das dein Backend erwartet:
                newValues.eventDate = `${date}T${time}`;
            }

            if (name === "deadlineDatePart" || name === "deadlineTimePart") {
                const date = newValues.deadlineDatePart || "";
                const time = newValues.deadlineTimePart || "00:00";
                newValues.eventDeadline = `${date}T${time}`;
            }

            return newValues;
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 1. Validierung der Logik (Datum & Uhrzeit)
        const jetzt = new Date();
        const dateEvent = new Date(inputs.eventDate);
        const dateDeadline = new Date(inputs.eventDeadline);

        // Prüfen, ob beide Daten überhaupt gesetzt sind
        if (!inputs.eventDate || !inputs.eventDeadline) {
            alert("Bitte füllen Sie beide Datumsfelder (Event und Deadline) vollständig aus!");
            return;
        }

        // TODO Update Backend to check for 24h difference!!
        // Differenz in Millisekunden berechnen zwischen "Heute" und Wichteltermin
        const diffJetztZuEvent = dateEvent - jetzt;
        const mindestVorlaufInMs = 24 * 60 * 60 * 1000; // 24 Stunden

        if (diffJetztZuEvent < mindestVorlaufInMs) {
            alert("Das Event muss mindestens 24 Stunden in der Zukunft liegen!");
            return;
        }

        // TODO Update Backend to check for 24h difference!!
        // Differenz in Millisekunden berechnen zwischen Wichteltermin und Abgabetermin
        const diffInMs = dateDeadline - dateEvent;
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

        // 3. Wenn alles okay ist: Fetch absenden...
        let query = await fetch("/events/create", {
            method: "POST",
            headers: {
                //"":JSON.parse(document.cookie)["quarkus-credential"],
                "Content-Type": "application/json",
                "quarkus-credential": cookies.get("quarkus-credential")

            },

            body: JSON.stringify({
                "name": inputs.eventName,
                // "regeln": inputs.eventRegeln,
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


       // alert("OK");
        // Show success modal
        setShowMessage(true);
    }

    const handleOk = () => {
        setShowMessage(false);
        // navigate("/eventVerwaltung");
        navigate("/eventVerwaltung/eventAnsehen");
    }


    return (
        <>
            <form onSubmit={handleSubmit} className={"form-container"}>
                <h2>Erstellen Sie ein neues Event:</h2>

                <div className="form-row">
                    <label>Wie soll das Event heißen?</label>
                    <input type="text" name="eventName" placeholder="Eventname" onChange={handleChange}/>
                </div>

                {/*<div className="form-row">*/}
                {/*    <label>Wann soll gewichtelt werden?</label>*/}
                {/*    <input type="datetime-local" name="eventDate" onChange={handleChange}/>*/}
                {/*</div>*/}

                <div className="form-row">
                    <label>Wann soll gewichtelt werden?</label>
                    {/*<div style={{display: 'flex', gap: '10px'}}>*/}
                    <div className="datetime-group">
                        <input
                            type="date"
                            name="datePart"
                            onChange={handleDateTimeChange}
                            required
                        />
                        <input
                            type="time"
                            name="timePart"
                            onChange={handleDateTimeChange}
                            required
                        />
                    </div>
                </div>

                {/*<div className="form-row">*/}
                {/*    <label>Welche Regeln liegen für das Event vor?</label>*/}
                {/*    <input type="text" name="eventRegeln" placeholder="Eventregeln" onChange={handleChange} />*/}
                {/*</div>*/}

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
                    <label>Wo findet Secret Santa statt:</label>
                    <input type="text" name="eventOrt" placeholder="Ort" onChange={handleChange}/>
                </div>

                {/*<div className="form-row">*/}
                {/*    <label>Wann findet die Verteilung der Geschenke statt:</label>*/}
                {/*    <input*/}
                {/*        type="datetime-local"*/}
                {/*        name="eventDeadline"*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*</div>*/}

                <div className="form-row">
                    <label>Wann findet die Verteilung der Geschenke statt:</label>
                    {/*<div style={{display: 'flex', gap: '10px'}}>*/}
                    <div className="datetime-group">
                        <input
                            type="date"
                            name="deadlineDatePart"
                            onChange={handleDateTimeChange}
                            required
                        />
                        <input
                            type="time"
                            name="deadlineTimePart"
                            onChange={handleDateTimeChange}
                            required
                        />
                    </div>
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
                        <p>Event angelegt!</p>
                        <button onClick={handleOk}>OK</button>
                    </div>
                </div>
            )}
        </>

    );

}

export default Layout;
