import React, {useState} from "react";
import cookies from "js-cookie";
import './GastEinladen.css'
import {useNavigate} from "react-router-dom";

function Layout () {

    const [inputs, setInputs] = useState ({});
    const navigate = useNavigate();
    //TODO URL-ID
    const id = 1;

    const abbrechen = () => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen");
    }

    const ausloggen = () => {
        cookies.remove("quarkus-credential");
        cookies.remove("username");
        navigate("/anmelden");
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        alert(JSON.stringify(inputs));

        let query = await fetch("/teilnehmer/einladen", {
            method: "POST",
            headers: {
                //"":JSON.parse(document.cookie)["quarkus-credential"],
                "Content-Type": "application/json",
                "quarkus-credential": cookies.get("quarkus-credential")
            },

            body: JSON.stringify({
                "eventID": inputs.id,
                "email": inputs.email

            })
        });

        if (query.status !== 200) {
            let json = await query.json();
            alert(JSON.stringify(json));
            return
        }


        alert("OK");
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs (values => ({...values, [name]: value}))
    }
    return (
        <form onSubmit={handleSubmit}>

            <h2>Gäste Einladen</h2>
            <br/>
            <br/>
            <div className="hier">
                <label> HIER FEHLT EINE LISTE</label>
            </div>
            <br/>
            <div className="eventId">
                <label>Event ID: </label>
                <input
                    type="text"
                    placeholder="Number"
                    id="eventid"
                    name = "id"
                    onChange={handleChange}
                />
            </div>

            <br/>
            <div className="email">
                <label>E-Mail: </label>
                &emsp;
                <input
                    type = "text"
                    placeholder= ""
                    id = "email"
                    name = "email"
                    onChange = {handleChange}
                />
            </div>
            <br/>
            <div className="submit">
                <input type="submit" id="emailZuListe" value="E-Mail hinzufügen"/>
                &nbsp;&nbsp;
                <input type="submit" id="emailausListe" value="E-Mail Löschen"/>
            </div>
            <br/>
            <div className="listeEinladen">
                <input type="submit" id="listeEinladen" value="Liste einladen"/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            </div>
            <br/>
            <div className="abbrechen">
                <input type="button" id="abbrechen" value="Abbrechen" onClick={abbrechen}/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
            </div>
            <br/>
            <div className="logout">
                <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
            </div>
        </form>

    );
}

export default Layout;