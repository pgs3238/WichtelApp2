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

    return (
        <form onSubmit={handleSubmit}>
            <h1>Event ansehen</h1>

            <div className="eventdatum">
                <label>Das Event findet statt am: </label>
                %EVENTDATUM%
            </div>

            <br/>

            <div className="eventlocation">
                <label> bei </label>
                %EVENTLOCATION%
            </div>

            <br/>

            <div className="eventverteilungdatum">
                <label>Wichtel werden verteilt am:  </label>
                 %EVENTVERTEILUNGDATUM%
            </div>

            <br/>

            <div className="eventRegeln">
                <label> Weitere Regeln: </label>
                <br/>
                <input
                    type="text"
                    placeholder="(Optonal) EventRegeln hier eingeben"
                    id = "eventRegeln"
                    name="eventRegeln"
                    value = {inputs.eventRegeln || ""}
                    onChange = {handleChange}
                />
            </div>

            <br/>

            <div className="eventedit">
                <button>bearbeiten</button>
            </div>

            <br/>

            <div className="zuordnungstart">
                <button>Wichtelzuordnung starten</button>
            </div>

            <br/>

            <div className="eventcancel">
                <button>Abbrechen</button>
            </div>

            <br/>

            <div className="teilnehmerlist">
                <button>Teilnehmerliste</button>
            </div>

        </form>

    );
}

export default Layout;