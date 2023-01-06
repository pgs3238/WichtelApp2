
import React, {useState} from 'react';

function Layout() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const eventName = event.target.eventName;
        const value = event.target.value;
        setInputs(values => ({...values, [eventName]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    const [date, setDate] = useState();

    return (
        <form onSubmit={handleSubmit}>
            <h1>Secret Santa</h1>
            <h2>Erstellen Sie ein neues Event:</h2>
            <label>Eventname:
                &emsp;&emsp;&nbsp;
                <input
                    type = "text"
                    id = "ename"
                    name = "eventName"
                    value = {inputs.eventName || ""}
                    onChange = {handleChange}
                />
            </label>
            <br/>

            <label>Wann soll das Event:
                <input
                    type = "date"
                    onChange = {e=>setDate(e.target.value)}
                />
                <p>Selected Date: {date}</p>
            </label>
            <br/>

            <label>Event location:
                <input
                    type="text"
                    id = "location"
                    value = {inputs.eventLocation || ""}
                    onChange = {handleChange}
                    />
            </label>
            <br/>

            <label>Secret Santa distribution:
                <input
                    type = "date"
                    onChange = {e=>setDate(e.target.value)}
                />
                <p>Selected Date: {date}</p>
            </label>
            <br/>

            <button>cancel</button>

            <button>save event</button>

        </form>
    );
}

export default Layout;