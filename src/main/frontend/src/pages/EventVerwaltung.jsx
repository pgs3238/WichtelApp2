import React, {useState} from "react";


function Layout() {

    const [inputs, setInputs] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Secret Santa</h1>
            <h2>Eventverwaltung</h2>

        </form>


    );
}

export default Layout;