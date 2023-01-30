
import React, {useState} from 'react';
import cookies from "js-cookie";
import './SubgruppenHinzufuegen.css'
import {useNavigate} from "react-router-dom";




let events = [
    {subgruppeid:"1", eventid: "1", subgruppename: "duck"},
    {subgruppeid:"2", eventid: "1", subgruppename: "gans"}
]




const Row = (props) => {
    const {subgruppeid, eventid, subgruppename} = props
    return(<tr>
        <td>{subgruppeid}</td>
        <td>{eventid}</td>
        <td>{subgruppename}</td>
    </tr>)
}



const Table = (props) => {
    const{data} = props
    return (<center><table>
        <thead>
        <td>Subgruppen ID</td>
        <td>Event ID</td>
        <td>Subgruppenname</td>
        </thead>
        <tbody>
        {data.map(row =>
            <Row subgruppeid = {row.subgruppeid}
                 eventid = {row.eventid}
                 subgruppename = {row.subgruppename}/>
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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const ausloggen = () => {
        cookies.remove("quarkus-credential");
        cookies.remove("username");
        navigate("/anmelden");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs));
        let query = await fetch("/subgruppen/create", {
            method: "POST",
            headers: {
                //"":JSON.parse(document.cookie)["quarkus-credential"],
                "Content-Type": "application/json",
                "quarkus-credential": cookies.get("quarkus-credential")
            },

            body: JSON.stringify({
                "subgruppeName": inputs.sgruppe

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

            <h2>Subgruppen einstellen</h2>
            <br/>
            <br/>
            <div className="explanation">
                <label> <center>Subgruppen werden erstellt, damit Familienmitglieder </center>
                        <center> sich nicht gegenseitig beschenken können. </center>
                    <center> Dafür müssen alle Familienmitglieder </center>
                    <center>zu einer Subgruppe hinzugefügt werden! </center></label>
            <br/>
            </div>
            <div className="hier">
                <label>Das ist eine Demo Tabelle und symbolisiert nur wie der Endzustand hätte aussehen sollen</label>
            </div>
            <br/>
            <Table data={rows}/>
            <br/>
            <div className="neueSubgruppe">
                <label>Name der Subgruppe: </label>
                &emsp;&nbsp;
                <input
                    type = "text"
                    placeholder= "Subgruppenname"
                    id = "sgruppe"
                    name = "sgruppe"
                    onChange = {handleChange}
                />
            </div>
            <br/>
            <div className="hinzufuegenloeschen">
                <input type="submit" id="hinzufuegen" value = "Subgruppe Hinzufügen"/>
                &emsp;&emsp;&emsp;
                <input type="button" id="loeschen" value = "Subgruppe Löschen"/>
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