
import React, {useState} from 'react';
import * as PropTypes from "prop-types";
/*import ReactDOM from "react-dom/client";*/


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
            <input type="submit" id="anmelden" value="Login"/>
            <input type="submit" id="chgpgadduser" value="Register"/>
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