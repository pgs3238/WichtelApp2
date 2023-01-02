
import React, {useState} from 'react';

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
            <h1>Secret Santa</h1>
            <h2>Register</h2>
            <label>Enter given name:
                <input
                    type="text"
                    id="vname"
                    name="vorname"
                    value={inputs.name || ""}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>Enter family name:
                <input
                    type="text"
                    id="nname"
                    name="nachname"
                    value={inputs.name || ""}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>Enter Email-Address:
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>Enter Password:
                <input
                    type="password"
                    id="passwort"
                    name="passwort"
                    value={inputs.password || ""}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <input type="submit" id="adduser" value="Register"/>
        </form>
    );
}

export default Layout;