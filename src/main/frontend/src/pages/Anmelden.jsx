
import React, {useState} from 'react';
import * as PropTypes from "prop-types";
/*import ReactDOM from "react-dom/client";*/
import './Anmelden.css'


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
            <h2>Login</h2>

            <div className="email">
            <input
                    type="text"
                    placeholder="E-Mail-Adresse"
                    id="email"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}

            />
            </div>

            <br/>
            <div className="passwort">
                <input
                    type="text"
                    placeholder="Passwort"
                    id="passwort"
                    name="passwort"
                    value={inputs.passwort || ""}
                    onChange={handleChange}
                />
            </div>
            <br/>
            <br/>

            <div className="anmeldenBT">
            <input
                type="submit"
                id="anmelden"
                value="Login"/>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            </div>

            <br/>

            <div className="pwvergessenBT">
            <input
                type="submit"
                id="pwvergessen"
                value="Passwort vergessen?"/>
                &emsp;
            </div>
        </form>

    )







}

/*function MyForm() {
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
            <label>Enter Email Adress:
                <input
                    type="text"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>Enter Password:
                <input
                    type="password"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <input type="submit" />
        </form>
    )
}*/






/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Layout />
        <MyForm />
    </React.StrictMode>
);*/



export default Layout;