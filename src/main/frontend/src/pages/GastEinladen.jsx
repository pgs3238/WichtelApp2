import React, {useState} from "react";

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
            <h1>GastEinladen</h1>

            <label>E-Mail:
                &emsp;&emsp;
            </label>

            <br/>


            <input
                type = "text"
                placeholder= ""
                id = "email"
                name = "email"
                value = {inputs.email || ""}
                onChange = {handleChange}
            />

            <br/><br/>

            <input
                type="submit"
                id="emailZuListe"
                value="E-Mail zu Liste"/>

            <br/>
            <br/>

            <input
                type="submit"
                id="zurueck"
                value="Zurueck"/>
            &emsp;&emsp;

            <input
                type="submit"
                id="listeEinladen"
                value="Liste einladen"/>


        </form>

    );
}

export default Layout;