import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './MessageService.css';


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

    const gastEinladen = () => {
        navigate("/messageService/gastEinladen");
    }

    const mitteilungAnOrganisator = () => {
        navigate("/messageService/mitteilungAnOrganisator");
    }

    return(
        <form onSubmit={handleSubmit}>
          <h2>Message Service</h2>
            <br/>
            <div className="gastEinladen">
                <h4 className="a">Möchten Sie einen Gast einladen?</h4>
                <input
                    type="button"
                    id="gastEinladen"
                    value="Gast einladen"
                    onClick={gastEinladen}/>
            </div>

            <br/>
            <div className="mitteilungAnOrganisator">
                <h4 className="b">Möchten Sie Ihrem Organisator etwas mitteilen?</h4>
                <input
                    type="button"
                    id="mitteilungAnOrganisator"
                    value="Mitteilung verfassen"
                    onClick={mitteilungAnOrganisator}/>
            </div>



        </form>
    );




}

export default Layout;