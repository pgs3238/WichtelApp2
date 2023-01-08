
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
                <h1>User zu Subgruppen hinzufügen</h1>

                <br/>

                <th>[gewählten User] hinzufügen zu</th>

                <br/>

                <input list = "data"/>
                <datalist id = "data">
                    <option>Mustermann</option>
                    <option>A Team</option>

                </datalist>


                <br/>
                <br/>



                <button type="submit">Zu Subgruppe hinzufügen</button>

                <br/>
                <br/>

                <button type="submit">zurück</button>
            </form>
        );

}
export default Layout;