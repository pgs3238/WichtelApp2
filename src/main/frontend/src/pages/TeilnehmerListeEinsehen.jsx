
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import './TeilnehmerListeEinsehen.css'
import cookies from "js-cookie";

// TODO: Legacy page retained during frontend migration.
// Will be removed once replacement implementation is fully integrated.

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
        navigate("/home");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let query = await fetch("/events/allEvents");
        if(query.status == 200){
            this.events = await query.json();
        }
    }

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