
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
            <label>Enter Given-name:
                &emsp;&emsp;&nbsp;
                <input
                    type="text"
                    placeholder="Vorname"
                    id="vname"
                    name="vorname"
                    value={inputs.name || ""}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>Enter Family-name:
                &emsp;&nbsp;&nbsp;&nbsp;
                <input
                    type="text"
                    placeholder="Nachname"
                    id="nname"
                    name="nachname"
                    value={inputs.name || ""}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>Enter Email-address:
                &emsp;
                <input
                    type="text"
                    placeholder="E-Mail Adresse"
                    id="email"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>Enter Password:
                &emsp;&emsp;&emsp;
                <input
                    type="password"
                    placeholder="Passwort"
                    id="passwort"
                    name="passwort"
                    value={inputs.password || ""}
                    onChange={handleChange}
                />
            </label>
            <br/><br/>
            <input type="submit" id="adduser" value="Registrieren"/>
        </form>
    );
}

export default Layout;