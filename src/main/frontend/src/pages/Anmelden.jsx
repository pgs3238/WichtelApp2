
import React, {useState} from 'react';
import * as PropTypes from "prop-types";
/*import ReactDOM from "react-dom/client";*/
import './Anmelden.css'
import {useNavigate} from "react-router-dom";
import cookies from "js-cookie";


function Layout() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const neuesKonto = () => {
        navigate("/registrierung");
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        //event.preventDefault();
       // alert(JSON.stringify(inputs));
        let formdata = new FormData(event.target);
        cookies.set("username",formdata.get("j_username"))
        return true;

    }

    return (

        <form action="/j_security_check" method="POST" onSubmit={handleSubmit}>

            <h2>Login</h2>
            <br/>
            <br/>
            <div className="email">
                <label> E-Mail-Adresse: </label>
                &nbsp;
                <input
                    type="text"
                    placeholder="E-Mail-Adresse"
                    id="email"
                    name="j_username"

                />
            </div>
            <br/>
            <div className="passwort">
                <label>Passwort: </label>
                &emsp;&emsp;&emsp;
                <input
                    type="password"
                    placeholder="Passwort"
                    id="passwort"
                    name="j_password"

                />
            </div>
            <br/>
            <div className="anmeldenBT">
                <input type="submit" id="anmelden" value="Login"/>
            </div>
            <br/>
            <div className="kontoanlegen">
                <input type="button" id="kontoanlegen" value="Neues Konto Anlegen" onClick={neuesKonto}/>
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