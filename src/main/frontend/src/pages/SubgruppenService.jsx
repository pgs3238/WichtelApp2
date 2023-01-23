import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './SubgruppenService.css';

function Layout (){

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    const subgruppenHinzufuegen = () => {
        navigate("/subgruppenService/subgruppenHinzufuegen");
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Subgruppen Service</h2>
            <br/>
            <div className="neueSubgruppe">
                <h4 className="a">Möchten Sie eine neue Subgruppe hinzufügen</h4>
                <input
                    type="button"
                    id="subgruppenHinzufuegen"
                    value="Subgruppe hinzufügen"
                    onClick={subgruppenHinzufuegen}
                />


            </div>



        </form>
    );
}

export default Layout;