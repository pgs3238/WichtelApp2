import React, {useState} from 'react';
import './EventAnsehen.css'
import {useNavigate} from "react-router-dom";

function Layout () {

    const [inputs, setInputs] = useState ({});
    const navigate = useNavigate();

    const abbrechenClick = () => {
        navigate("/eventVerwaltung");
    }

    const zuTeilnehmer = () => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen");
    }

    const wichtelzuOrdnung = () => {
        navigate("/");
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

            <h2>Alle Events:</h2>
            <br/>
            <br/>
            <div className="eventTable">
                <center>
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
                </center>
            </div>



            <br/>
            <div className="eventedit">
                <input type="submit" id="adduser" value="Bearbeiten"/>
                &emsp;&emsp;
                <input type="submit" id="adduser" value="Teilnehmer Anzeigen" onClick={zuTeilnehmer}/>
            </div>
            <br/>
            <div className="zuordnungcancel">
                <input type="submit" id="adduser" value="Wichtelzuordnung starten" onClick={wichtelzuOrdnung}/>
                &nbsp;&nbsp;
                <input type="submit" id="adduser" value="Abbrechen" onClick={abbrechenClick}/>
            </div>
            <br/>




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
                    onChange = {handleChange}
                />
            </div>












        </form>
    );
}

export default Layout;