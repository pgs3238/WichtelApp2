
import React, {useState} from 'react';
import './MitteilungAnOrganisator.css'


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

            <div classeName="anAdresse">
                <h4 className="a">Geben Sie die Empfänger-Adresse ein:</h4>
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
            <input className="messageFeld"
                type = "text"
                placeholder = "Nachricht"
                name = "name"
                value = ""
                onChange = {changeHandler}/>
            </div>

            <br/>
            <br/>

            <div className="mitteilungSenden">
            <input
                type="button"
                id="senden"
                value="Senden"/>
            </div>
        </form>
    );
}

export default Layout;