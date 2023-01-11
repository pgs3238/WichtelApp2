
import React, {useState} from 'react';


function Layout() {

    const [inputs, setInputs] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    return (
        <from onSubmit={handleSubmit}>
            <h1>Secret Santa</h1>
            <h2>Eventübersicht</h2>



            <button>Neues Event anlegen</button>
            <button>Auswählen</button>
        </from>

            );
}

export default Layout;