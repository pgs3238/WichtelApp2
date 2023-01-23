
import React, {useState} from 'react';


function Layout() {

    const [formState, setFormState] = useState({});

    const changeHandler = (event) => {
        setFormState({...formState, [event.target.name]: event.target.value});
    }

    return (
        <form>
            <h2>Mitteilung an den Organisator versenden</h2>
            <br/>
            <br/>

            <input
                type = "email"
                placeholder = "An: E-Mail-Adresse"
                name = "email"
                value = ""
                onChange = {changeHandler}

            />

            <br/>

            <input
                type = "text"
                placeholder = "Nachricht"
                name = "name"
                value = ""
                onChange = {changeHandler}
            />

            <br/>
            <br/>

            <input type="submit" id="senden" value="Senden"/>

        </form>
    );
}

export default Layout;