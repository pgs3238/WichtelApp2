import React, {useState} from 'react';
import './EventAnsehen.css'
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";

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
                <input type="button" id="adduser" value="Teilnehmer Anzeigen" onClick={zuTeilnehmer}/>
            </div>
            <br/>
            <div className="zuordnungcancel">
                <input type="button" id="adduser" value="Wichtelzuordnung starten" onClick={wichtelzuOrdnung}/>
                &nbsp;&nbsp;
                <input type="button" id="adduser" value="Abbrechen" onClick={abbrechenClick}/>
            </div>
            <br/>
            <div className="logout">
                <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
            </div>
        </form>
    );
}

export default Layout;