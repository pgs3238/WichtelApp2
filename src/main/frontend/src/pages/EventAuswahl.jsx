
import React, {useState} from 'react';


function Layout() {

    const [inputs, setInputs] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    return (
        <form onSubmit={handleSubmit}>

            <h2>Eventübersicht</h2>



            <button>Neues Event anlegen</button>
            <button>Auswählen</button>
        </form>

            );
}

export default Layout;