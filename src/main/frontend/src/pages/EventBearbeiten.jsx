
import React, {useState} from 'react';
import * as PropTypes from "prop-types";
/*import ReactDOM from "react-dom/client";*/


function Layout() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    return (

        <form onSubmit={handleSubmit}>

            <h2>EventBearbeiten</h2>

            <input
                type="text"
                placeholder="Eventname"
                id="eventName"
                name="eventName"
                //value={inputs.eventName || ""}
                onChange={handleChange}
            />
            <br/>
            <br/>
            <input
                type="text"
                placeholder="Wann soll das Event stattfinden?"
                id="eventStart"
                name="eventStart"
                //value={inputs.email || ""}
                onChange={handleChange}
            />
            <br/>
            <br/>
            <input
                type="text"
                placeholder="Wo soll das Event stattfinden?"
                id="eventOrt"
                name="eventOrt"
                //value={inputs.email || ""}
                onChange={handleChange}
            />
            <br/>
            <br/>
            <input
                type="text"
                placeholder="Wann sollen die Wichtel verteilt werden?"
                id="eventZuordnungStart"
                name="eventZuordnungStart"
                //value={inputs.email || ""}
                onChange={handleChange}
            />
            <br/>
            <br/>
            <input
                type="text"
                placeholder="Geben Sie ggf. weitere Regeln für das Wichteln an"
                id="eventRegel"
                name="eventRegel"
                //value={inputs.password || ""}
                onChange={handleChange}
            />


            <br/>
            <br/>
            &emsp;&emsp;
            <input type="submit"
                   id="eventLoeschen"
                   value="Event loeschen"/>
            <br/>
            <br/>
            <input type="submit"
                   id="abbrechen"
                   value="abbrechen"/>

            &emsp;&emsp;

            <input type="submit"
                   id="eventSpeichern"
                   value="Event speichern"/>
        </form>

    )







}

/*function MyForm() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Enter Email Adress:
                <input
                    type="text"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>Enter Password:
                <input
                    type="password"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <input type="submit" />
        </form>
    )
}*/






/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Layout />
        <MyForm />
    </React.StrictMode>
);*/



export default Layout;