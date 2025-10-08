
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import './TeilnehmerListeEinsehen.css'
import cookies from "js-cookie";



// let events = [
//     {eventId:"1", deadline:"12.01.2023", eventDate:"30.01.2023", name:"wichteln", owner:"danield@entenhausen.de", regeln:"kaffee", ort:"caprivi"},
//     {eventId:"2", deadline:"15.01.2023", eventDate:"31.01.2023", name:"kaffee", owner:"dagobert@entenhausen.de", regeln:"wasser", ort:"westerberg"}
// ]



const TeilnehmerPage = () => {
    const { state } = useLocation();
    const eventid = state?.eventId;
};

const Row = ({ userEmail, eventId, radio }) => (
    <tr>
        <td>{userEmail}</td>
        <td>{eventId}</td>
        <td>{radio}</td>
    </tr>
);

const Table = ({ data }) => (
    <div className="table-window">
        <table>
            <thead>
            <tr>
                <th>Teilnehmer Email</th>
                <th>Event ID</th>
                <th>Einladung abgeschickt</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <Row
                    key={index}
                    userEmail={row.userEmail}
                    eventId={row.eventId}
                    radio={row.radio}
                />
            ))}
            </tbody>
        </table>
    </div>
);



// const Row = (props) => {
//     const {eventid, deadline, eventdate, name, owner, regeln, ort} = props
//     if (owner == cookies.get("username")) {
//         return(<tr>
//             <td><a href={"/eventVerwaltung/eventAnsehen/teliEinsehen/eventBearbeiten"}>{eventid}</a></td>
//             <td>{deadline}</td>
//             <td>{eventdate}</td>
//             <td>{name}</td>
//             <td>{owner}</td>
//             <td>{regeln}</td>
//             <td>{ort}</td>
//         </tr>)
//     } else {
//         return(<tr>
//             <td>{eventid}</td>
//             <td>{deadline}</td>
//             <td>{eventdate}</td>
//             <td>{name}</td>
//             <td>{owner}</td>
//             <td>{regeln}</td>
//             <td>{ort}</td>
//         </tr>)
//     }
//
// }

// const Table = (props) => {
//     const{data} = props
//     return (<center><table>
//         <thead>
//         <td>Event ID</td>
//         <td>Wichtel Datum</td>
//         <td>Geschenk Tag</td>
//         <td>Event Name</td>
//         <td>Owner</td>
//         <td>Regeln</td>
//         <td>Location</td>
//         </thead>
//         <tbody>
//         {data.map(row =>
//             <Row eventid = {row.eventId}
//                  deadline = {row.deadline}
//                  eventdate = {row.eventDate}
//                  name = {row.name}
//                  owner = {row.owner}
//                  regeln = {row.regeln}
//                  ort = {row.ort} />
//         )}
//         </tbody>
//     </table></center>)
// }

function Layout() {
    // const [inputs, setInputs] = useState({});
    const { state } = useLocation();
    const eventid = state?.eventid;
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true)
    //  const [rows, setRows] = useState(handleSubmit);

    useEffect(() => {
        if (!eventid) return;

        const fetchParticipants = async () => {
            try {
                const res = await fetch(`/api/eventTeilnehmer/${eventid}`, {
                    method: "GET",
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setRows(data);
                } else {
                    alert("Fehler beim Laden der Teilnehmer");
                }
            } catch (err) {
                console.error("Fehler:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipants();
    }, [eventid]);



    const Abbrechen = () => {
        navigate("/eventVerwaltung/eventAnsehen");
    }

    const einladen = () => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen/gastEinladen");
    }

    const zuSubGruppen = () => {
        navigate("/subgruppenService");
    }

    const ausloggen = () => {
        cookies.remove("quarkus-credential");
        cookies.remove("username");
        navigate("/anmelden");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let query = await fetch("/events/allEvents");
        if(query.status == 200){
            this.events = await query.json();
        }
    }

    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({...values, [name]: value}))
    // }

    /* TODO Hier fehlt noch die Anzeige der Teilnehmer   */

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <h2>Teilnehmerliste Einsehen</h2>
                {loading ? (
                    <p>Daten werden geladen...</p>
                ) : (
                    <>
                        {rows.length > 0 ? (
                            <Table data={rows} />
                        ) : (
                            <p>Keine Teilnehmer gefunden.</p>
                        )}
                    </>
                )}

            {/*<h2>Teilnehmerliste Einsehen</h2>*/}
            {/*<br/>*/}
            {/*<br/>*/}
            {/*<div className="hier">*/}
            {/*    <label>Hier wird eine Test-Tabelle dargestellt, die aufgrund von Fehlern noch nicht durch eine Echte Tabelle ersetzt wurde.</label>*/}
            {/*</div>*/}
            {/*<br/>*/}
            {/*<Table data={rows}/>*/}
            {/*<br/>*/}
                <div className="update">
                    <input type="submit" id="update" value="Tabelle updaten"/>
                </div>

                <br/>
                <div className="gastsub">
                    <input type="button" id="gastEinladen" value="Einladungen abschicken" onClick={einladen}/>
                    &emsp;&emsp;&emsp;&emsp;
                    <input type="button" id="subgruppeErstellen" value="Subgruppen" onClick={zuSubGruppen}/>
                </div>

                <br/>
                <div className="abbrechen">
                    <input type="button" id="abbrechen" value="Abbrechen" onClick={Abbrechen}/>
                </div>

                <br/>
                <div className="logout">
                    <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
                </div>
            </div>
        </form>

    );
}

export default Layout;