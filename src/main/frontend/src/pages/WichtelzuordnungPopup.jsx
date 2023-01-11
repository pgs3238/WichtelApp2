
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
            <h1>Wichtelzuordnung Popup</h1>

        </form>

    );
}

export default Layout;