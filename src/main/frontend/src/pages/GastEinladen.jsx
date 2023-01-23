import React, {useState} from "react";
import './GastEinladen.css'
import {useNavigate} from "react-router-dom";

function Layout () {

    const [inputs, setInputs] = useState ({});
    const navigate = useNavigate();

    const abbrechen = () => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen");
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
            <h2>Gäste Einladen</h2>
            <br/>
            <div className="hier">
                <label> HIER FEHLT EINE LISTE</label>
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
                <input type="submit" id="abbrechen" value="Abbrechen" onClick={abbrechen}/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
            </div>
        </form>

    );
}

export default Layout;