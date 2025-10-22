
import React, {useState} from 'react';
import cookies from "js-cookie";
import './UserZuSubgruppeHinzufuegen.css'
import {useNavigate} from "react-router-dom";




let events = [
    {user_email:"doduck@entenhausen.de", subgruppe_subgruppeid: "1"},
    {user_email:"dagoduck@entenhausen.de", subgruppe_subgruppeid:"1"}
]

// TODO this page is not connected with Backend


const Row = (props) => {
    const {user_email, subgruppe_subgruppeid} = props
    return(<tr>
        <td>{user_email}</td>
        <td>{subgruppe_subgruppeid}</td>
    </tr>)
}



const Table = (props) => {
    const{data} = props
    return (<center><table>
        <thead>
        <td>Gast E-Mail</td>
        <td>Subgruppen ID</td>
        </thead>
        <tbody>
        {data.map(row =>
            <Row user_email = {row.user_email}
                 subgruppe_subgruppeid = {row.subgruppe_subgruppeid}/>
        )}
        </tbody>
    </table></center>)
}

function Layout() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const [rows, setRows] = useState(events);

    const abbrechen = () => {
        navigate("/subgruppenService");
    }

    const ausloggen = () => {
        cookies.remove("quarkus-credential");
        cookies.remove("username");
        navigate("/anmelden");
    }

    const entfernen = () => {
        navigate("/");
        //TODO
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs));

        let query = await fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "quarkus-credential": cookies.get("quarkus-credential")
            },

            body: JSON.stringify({
                "eventID": inputs.id,
                "email": inputs.email
        })
    });

        if (query.status !== 200) {
            let json = await query.json();
            alert(JSON.stringify(json));
            return
        }


        alert("OK");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Gast zu Subgruppen hinzufügen</h2>
            <br/>
            <br/>
            <div className="hier">
                <label> Das ist eine Demo Tabelle und symbolisiert nur wie der Endzustand hätte aussehen sollen</label>
            </div>
            <br/>
            <Table data={rows}/>
            <br/>
            <div className="GruppenID">
                <label> GruppenID: </label>
                <input
                    type = "text"
                    placeholder = "Gruppen ID"
                    id = "gruppenid"
                    name = "gruppenid"
                    onChange = {handleChange}
                />
            </div>
            <br/>
            <div className="email">
                <label> E-Mail: </label>
                &emsp;&emsp;
                <input
                    type = "text"
                    placeholder = "max@mustermann.de"
                    id = "email"
                    name = "email"
                    onChange = {handleChange}
                />
            </div>
            <br/>
            <div className="submit">
                <input type="submit" id="emailzusubgru" value="E-Mail hinzufügen"/>
                &emsp;&emsp;

                <input type="button" id="emailaussubgru" value="E-Mail entfernen" onClick={entfernen}/>
            </div>
            <br/>
            <div className="abbrechen">
                <input type="button" id="abbrechen" value="Abbrechen" onClick={abbrechen}/>
            </div>
            <br/>
            <div className="logout">
                <input type="button" id="abbrechen" value="Logout" onClick={ausloggen}/>
            </div>
        </form>
    );

}
export default Layout;