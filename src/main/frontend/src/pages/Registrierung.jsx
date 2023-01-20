
import React, {useState} from 'react';
import './Registrierung.css'

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
            <div className="name">
                <label>Vorname: </label>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                <input
                    type="text"
                    placeholder="Vorname"
                    id="vname"
                    name="vorname"
                    value={inputs.name || ""}
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="nname">
                <label>Nachname: </label>
                &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                <input
                    type="text"
                    placeholder="Nachname"
                    id="nname"
                    name="nachname"
                    value={inputs.name || ""}
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="email">
                <label>Email-Addresse: </label>
                &emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                <input
                    type="text"
                    placeholder="E-Mail Adresse"
                    id="email"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="passwort">
                <label>Passwort eingeben: </label>
                &emsp;&emsp;&nbsp;&nbsp;&nbsp;
                <input
                    type="password"
                    placeholder="Passwort"
                    id="passwort"
                    name="passwort"
                    value={inputs.password || ""}
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="repasswort">
                <label>Passwort erneut eingeben: </label>
                &nbsp;
                <input
                    type="password"
                    placeholder="Passwort"
                    id="repasswort"
                    name="repasswort"
                    value={inputs.password || ""}
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div className="register">
                <input type="submit" id="adduser" value="Registrieren"/>
            </div>
        </form>
    );
}

export default Layout;