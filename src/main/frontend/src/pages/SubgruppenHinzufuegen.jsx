
import React, {useState} from 'react';
import './SubgruppenHinzufuegen.css'
import {useNavigate} from "react-router-dom";

function Layout() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const abbrechen = () => {
        navigate("/eventVerwaltung/eventAnsehen/teliEinsehen");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Secret Santa</h1>
            <h2>Subgruppen einstellen</h2>
            <br/>
            <div className="explanation">
                <label> <center>Subgruppen werden erstellt, damit Familienmitglieder </center>
                        <center> sich nicht gegenseitig beschenken können. </center>
                    <center> Dafür müssen alle Familienmitglieder </center>
                    <center>zu einer Subgruppe hinzugefügt werden! </center></label>
            </div>
            <br/>
            <div className="hier">
                <label>HIER FEHLT EINE LISTE</label>
            </div>
            <br/>
            <div className="neueSubgruppe">
                <label>Name der Subgruppe: </label>
                &emsp;&nbsp;
                <input
                    type = "text"
                    placeholder= "Subgruppenname"
                    id = "sgruppe"
                    name = "sgruppe"
                    onChange = {handleChange}
                />
            </div>
            <br/>
            <div className="hinzufuegenloeschen">
                <input type="submit" id="hinzufuegen" value = "Subgruppe Hinzufügen"/>
                &emsp;&emsp;&emsp;
                <input type="submit" id="loeschen" value = "Subgruppe Löschen"/>
            </div>
            <br/>
            <div className="abbrechen">
                <input type="submit" id="abbrechen" value="Abbrechen" onClick={abbrechen}/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&nbsp;&nbsp;&nbsp;
            </div>
            </form>
    );
}

export default Layout;