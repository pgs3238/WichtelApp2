import React, {useState} from "react";
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


    const handleSubmit = async (event) => {
        event.preventDefault();

        alert(JSON.stringify(inputs));

        let query = await fetch("/teilnehmer/einladen", {
            method: "POST",
            headers: {
                //"":JSON.parse(document.cookie)["quarkus-credential"],
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                "id": inputs.id,
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
            <input
                type="hidden"
                name = "id"
                value = {id}
            />
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
        </form>

    );
}

export default Layout;