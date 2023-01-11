
import React, {useState} from 'react';

function Layout () {

    const [inputs, setInputs] = useState ({});

    const handleSubmit = (event) => {
        event.preventDefault ();
        alert (inputs);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs (values => ({...values, [name]: value}))
    }

    /* Hier fehlt noch die Anzeige der Teilnehmer   */

    return (
        <form onSubmit={handleSubmit}>
            <h1>Teilnehmerliste Einsehen</h1>

            <br/>
            <br/>
            <br/>
            <input
                type="submit"
                id="subgruppeErstellen"
                value="Subgruppe Erstellen"/>

            <br/><br/>

            <input
                type="submit"
                id="gastZuSubgruppe"
                value="Gast zu Subgruppe"/>
            &emsp;&emsp;
            <input
                type="submit"
                id="gastEntfernen"
                value="Gast Entfernen"/>

            <br/><br/>

            <input
                type="submit"
                id="zurueck"
                value="Zurueck"/>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <input
                type="submit"
                id="gastEinladen"
                value="Gast einladen"/>


        </form>

    );
}

export default Layout;