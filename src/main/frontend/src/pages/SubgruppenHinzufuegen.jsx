
import React, {useState} from 'react';

function Layout() {

    const [inputs, setInputs] = useState({});

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
            <h1>Subgruppen hinzufügen</h1>

            <input
                type = "text"
                placeholder= "neue Subgruppe"
                id = "sgruppe"
                name = "sgruppe"
                value = {inputs.sgruppe || ""}
                onChange = {handleChange}
            />


            <br/>
            <br/>
            <br/>





            <input
                type="submit"
                id="hinzufuegen"
                value = "Hinzufügen"/>
            &emsp;&emsp;


            <input
                type="submit"
                id="Abbrechen"
                value="Abbrechen"/>




            </form>

    );
}

export default Layout;