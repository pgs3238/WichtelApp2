
import React, {useState} from 'react';
import './TeilnehmerListeEinsehen.css'
import {useNavigate} from "react-router-dom";

function Layout () {
    const [inputs, setInputs] = useState ({});
    const navigate = useNavigate();

    const Abbrechen = () => {
        navigate("/eventVerwaltung/eventAnsehen");
    }

    const einladen = () => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen/gastEinladen");
    }

    const zuSubGrupErst =() => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen/subgruHinz");
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

    /* TODO Hier fehlt noch die Anzeige der Teilnehmer   */

    return (
        <form onSubmit={handleSubmit}>
            <h1>Secret Santa</h1>
            <h2>Teilnehmerliste Einsehen</h2>
            <div className="hier">
                <label>HIER FEHLT EINE TABELLE (+ fehlende subgruppen, dynamische tabelle??)</label>
            </div>

            <br/>
            <br/>
            <br/>
            <div className="gastsub">
                <input type="submit" id="gastEinladen" value="Einladungen abschicken" onClick={einladen}/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <input type="submit" id="subgruppeErstellen" value="Subgruppen Erstellen" onClick={zuSubGrupErst}/>
            </div>
            <br/>
            <div className="gastzusubgr">
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                <input type="submit" id="gastZuSubgruppe" value="Gast zu Subgruppe"/>
            </div>
            <br/>
            <div className="gastaussubgrent">
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                <input type="submit" id="gastEntfernen" value="Gast Entfernen"/>
            </div>
            <br/>
            <div className="abbrechen">
                <input type="submit" id="abbrechen" value="Abbrechen" onClick={Abbrechen}/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
            </div>
        </form>

    );
}

export default Layout;