import React, {useState} from 'react';
import './EventAnsehen.css'
import {useNavigate} from "react-router-dom";

function Layout () {

    const [inputs, setInputs] = useState ({});
    const navigate = useNavigate();

    const abbrechenClick = () => {
        navigate("/eventVerwaltung")
    }

    const zuTeilnehmer = () => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen")
    }

    const handleSubmit = (event) => {
        event.preventDefault ();
        alert (inputs);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs (values => ({...values, [name]: value}))
    }


    return (
        <form onSubmit={handleSubmit}>
            <h1>Secret Santa</h1>
            <h2>Alle Events:</h2>
            <div className="eventTable">
                <table>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Regeln
                        </th>
                        <th>
                            Start des Events
                        </th>
                        <th>
                            Deadline
                        </th>
                    </tr>
                    <tr>
                        <col>
                            {}
                        </col>
                        <col>
                            {}
                        </col>
                        <col>
                            {}
                        </col>
                        <col>
                            {}
                        </col>
                    </tr>

                </table>
            </div>

            <div className="eventdatum">
                <label>Das Event findet statt am: </label>
                %EVENTDATUM%
            </div>

            <br/>

            <div className="eventlocation">
                <label> bei </label>
                %EVENTLOCATION%
            </div>

            <br/>

            <div className="eventverteilungdatum">
                <label>Wichtel werden verteilt am:  </label>
                 %EVENTVERTEILUNGDATUM%
            </div>

            <br/>

            <div className="eventRegeln">
                <label> Weitere Regeln: </label>
                <br/>
                <input
                    type="text"
                    placeholder="(Optonal) EventRegeln hier eingeben"
                    id = "eventRegeln"
                    name="eventRegeln"
                    value = {inputs.eventRegeln || ""}
                    onChange = {handleChange}
                />
            </div>

            <br/>

            <div className="eventedit">
                <input type="submit" id="adduser" value="Bearbeiten"/>
            </div>
            <br/>
            <div className="zuordnungstart">
                <input type="submit" id="adduser" value="Wichtelzuordnung starten??? richtiger ort?"/>
            </div>
            <br/>
            <div className="eventcancel">
                <input type="submit" id="adduser" value="Abbrechen" onClick={abbrechenClick}/>
            </div>
            <br/>
            <div className="teilnehmerlist">
                <input type="submit" id="adduser" value="Teilnehmer Anzeigen" onClick={zuTeilnehmer}/>
            </div>
        </form>
    );
}

export default Layout;