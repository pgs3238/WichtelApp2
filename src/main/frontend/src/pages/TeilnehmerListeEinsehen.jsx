
import React, {useState} from 'react';
import './TeilnehmerListeEinsehen.css'
import {useNavigate} from "react-router-dom";



const events = [
    {eventid:"1", deadline:"12.01.2023", eventdate:"30.01.2023", name:"wichteln", owner:"danield@entenhausen.de", regeln:"kaffee"},
    {eventid:"2", deadline:"15.01.2023", eventdate:"31.01.2023", name:"kaffee", owner:"dagobert@entenhausen.de", regeln:"wasser"}
]



const Row = (props) => {
    const {eventid, deadline, eventdate, name, owner, regeln} = props
    return(<tr>
        <td>{eventid}</td>
        <td>{deadline}</td>
        <td>{eventdate}</td>
        <td>{name}</td>
        <td>{owner}</td>
        <td>{regeln}</td>
    </tr>)
}

const Table = (props) => {
    const{data} = props
    return (<center><table>
        <tbody>
        {data.map(row =>
            <Row eventid = {row.eventid}
                 deadline = {row.deadline}
                 eventdate = {row.eventdate}
                 name = {row.name}
                 owner = {row.owner}
                 regeln = {row.regeln} />
        )}
        </tbody>
    </table></center>)
}

function Layout () {
    const [inputs, setInputs] = useState ({});
    const navigate = useNavigate();
    const [rows, setRows] = useState(events);
  //  const [rows, setRows] = useState(handleSubmit);

    const Abbrechen = () => {
        navigate("/eventVerwaltung/eventAnsehen");
    }

    const zuGastSub = () => {
        navigate("/subgruppenService/userZuSubgruppeHinzufuegen");
    }

    const einladen = () => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen/gastEinladen");
    }

    const zuSubGrupErst =() => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen/subgruHinz");
    }

    const handleSubmit = (event) => {
       // event.preventDefault ();

        let query = fetch("events/allEvents")
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs (values => ({...values, [name]: value}))
    }

    /* TODO Hier fehlt noch die Anzeige der Teilnehmer   */

    return (
        <form onSubmit={handleSubmit}>
            <h2>Teilnehmerliste Einsehen</h2>
            <br/>
            <br/>
            <div className="hier">
                <label>HIER FEHLT EINE TABELLE (+ fehlende subgruppen, dynamische tabelle??)</label>
            </div>
            <br/>
            <Table data = {rows} />
            <br/>
            <br/>
            <div className="gastsub">
                <input type="button" id="gastEinladen" value="Einladungen abschicken" onClick={einladen}/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <input type="button" id="subgruppeErstellen" value="Subgruppen Erstellen" onClick={zuSubGrupErst}/>
            </div>
            <br/>
            <div className="gastzusubgr">
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                <input type="button" id="gastZuSubgruppe" value="Gast zu Subgruppe" onClick={zuGastSub}/>
            </div>
            <div className="abbrechen">
                <input type="button" id="abbrechen" value="Abbrechen" onClick={Abbrechen}/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
            </div>
        </form>

    );
}

export default Layout;