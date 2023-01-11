
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

    /* Hier fehlt noch die Anzeige von    */

    return (
        <form onSubmit={handleSubmit}>
            <h1>Event ansehen</h1>

            <label>Das Wichteln findet statt am:
                &emsp;&emsp;
            </label>

            <br/>
            <br/>

            <label>bei:
                &emsp;&emsp;
            </label>

            <br/>
            <br/>
            <br/>



            <input
                type="submit"
                id="bearbeiten"
                value="bearbeiten"/>

            <br/>
            <br/>

            <input
                type="submit"
                id="wichtelzuordnungStarten"
                value="Wichtelzuordnung starten"/>
            <br/><br/>

            <input
                type="submit"
                id="abbrechen"
                value="Abbrechen"/>
            &emsp;

            <input
                type="submit"
                id="teilnehmerliste"
                value="Teilnehmerliste"/>


        </form>

    );
}

export default Layout;