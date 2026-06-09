
import React, {useState} from 'react';
import cookies from "js-cookie";
import './MitteilungAnOrganisator.css'
import {useNavigate} from "react-router-dom";


function Layout() {
    const [formState, setFormState] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/eventVerwaltung")
    }

    const ausloggen = () => {
        cookies.remove("quarkus-credential");
        cookies.remove("username");
        navigate("/home");
    }

    const changeHandler = (event) => {
        setFormState({...formState, [event.target.name]: event.target.value});
    }

    const handleOk = () => {
        setShowMessage(false);
        navigate("/eventVerwaltung");
    }

    return (
        <>
            <form>
                <h2>Mitteilung an den Organisator versenden</h2>
                <br/>
                <br/>

                <div classeName="anAdresse">
                    <h4 className="a">Geben Sie die Empfänger-Adresse ein:</h4>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                    <input className="adressfeld"
                        type = "email"
                        placeholder = "E-Mail-Adresse"
                        name = "email"
                        value = ""
                        onChange = {changeHandler}/>

                </div>
                <br/>

                <div className="message">
                    <h4 className="b">Geben Sie hier die Mitteilung ein:</h4>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <input className="messageFeld"
                    type = "text"
                    placeholder = "Nachricht"
                    name = "name"
                    value = ""
                    onChange = {changeHandler}/>
                </div>

                <br/>
                <br/>

                <div className="form-actions">
                    <input type="submit" value="E-mail verschicken"/>
                    <input type="button" value="Abbrechen" onClick={handleClick}/>
                </div>

                <div className="logout">
                    <input type="button" value="Logout" onClick={ausloggen}/>
                </div>
            </form>
            {showMessage && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <p>E-mail verschickt!</p>
                        <button onClick={handleOk}>OK</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Layout;