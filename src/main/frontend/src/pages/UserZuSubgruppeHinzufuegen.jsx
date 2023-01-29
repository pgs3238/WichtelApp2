
import React, {useState} from 'react';
import cookies from "js-cookie";
import './UserZuSubgruppeHinzufuegen.css'
import {useNavigate} from "react-router-dom";

function Layout() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const abbrechen = () => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen");
    }

    const ausloggen = () => {
        navigate("/anmelden");
      //TODO
    }

    const entfernen = () => {
        navigate("/");
        //TODO
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs));

        let query = await fetch("", {
            method: "POST",
            headers: {
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

    return (
        <form onSubmit={handleSubmit}>
            <h2>User zu Subgruppen hinzufügen</h2>
            <br/>
            <br/>
            <div className="hier">
                <label> HIER FEHLT EINE LISTE</label>
            </div>
            <br/>
            <div className="GruppenID">
                <label> GruppenID: </label>
                <input
                    type = "text"
                    placeholder = "Gruppen ID"
                    id = "gruppenid"
                    name = "gruppenid"
                    onChange = {handleChange}
                />
            </div>
            <br/>
            <div className="email">
                <label> E-Mail: </label>
                <input
                    type = "text"
                    placeholder = "max@mustermann.de"
                    id = "email"
                    name = "email"
                    onChange = {handleChange}
                />
            </div>
            <br/>
            <div className="submit">
                <input type="submit" id="emailzusubgru" value="E-Mail hinzufügen"/>

                <input type="button" id="emailaussubgru" value="E-Mail entfernen" onClick={entfernen}/>
            </div>
            <br/>
            <div className="abbrechen">
                <input type="button" id="abbrechen" value="Abbrechen" onClick={abbrechen}/>

                <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
            </div>
        </form>
    );

}
export default Layout;