import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import Snowfall from "react-snowfall";
//alter code, darueber neuer code
//import ReactDOM from 'react-dom';
//folgende 3 Zeilen machen das drehende Bild. In Zeile 44 muss dazu Apps zu Apps
/*import './index.css';
import Apps from './Apps';
import reportWebVitals from './reportWebVitals';*/

//Routes Import - 27.12.22 Schnieders
//import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import EventAnlegen from "./pages/EventAnlegen";
import EventAnsehen from "./pages/EventAnsehen";
import EventAuswahl from "./pages/EventAuswahl";
import EventBearbeiten from "./pages/EventBearbeiten";
import GastEinladen from "./pages/GastEinladen";
import GastEntfernenPopup from "./pages/GastEntfernenPopup";
import MitteilungAnOrganisator from "./pages/MitteilungAnOrganisator";
import Registrierung from "./pages/Registrierung";
import SubgruppenHinzufuegen from "./pages/SubgruppenHinzufuegen";
import TeilnehmerListeEinsehen from "./pages/TeilnehmerListeEinsehen";
import UserZuSubgruppeHinzufuegen from "./pages/UserZuSubgruppeHinzufuegen";
import WichtelzuordnungPopup from "./pages/WichtelzuordnungPopup";
import Anmelden from "./pages/Anmelden";
import * as PropTypes from "prop-types";
import Events from "./pages/EventVerwaltung";
import EventVerwaltung from "./pages/EventVerwaltung";
import MessageService from "./pages/MessageService";
import SubgruppenService from "./pages/SubgruppenService";

// TODO (2025) - find out what the plan was and or clean up!!

//alter code - darunter neuer code
/*function Welcome(props) {
    return <h1> Hello, {props.name}, {props.nachname}</h1>
}
const element = <Welcome name="Sara" nachname="Simpson" />;
ReactDOM.render(
    element,
    document.getElementById('root')
);
ReactDOM.render(<Apps />, document.getElementById('root'));*/

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
 // <React.StrictMode>
      <Apps />
 // </React.StrictMode>
);

 /* If you want to start measuring performance in your app, pass a function
 to log results (for example: reportWebVitals(console.log))
 or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals */
//TODO not implemented yet (???) so deaktivated currently 31.12.2022
// reportWebVitals();

//Create Routes (Seiten verknüpfen aus pages)
export default function Apps() {
    const [token, setToken] = useState();

   // if(!token) { return <Anmelden setToken={setToken} /> }
    return (

        <BrowserRouter>
            <Snowfall/>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="home/registrierung" element={<Registrierung/>} />
                    <Route path="home/anmelden" element={<Anmelden/>} />

                    <Route path="anmelden" element={<Anmelden />} />
                    <Route path="eventVerwaltung" element={<EventVerwaltung />} />
                    <Route path="eventVerwaltung/eventAnlegen" element={<EventAnlegen />} />
                    <Route path="eventVerwaltung/eventAnsehen" element={<EventAnsehen />} />
                    <Route path="eventAuswahl" element={<EventAuswahl />} />
                    <Route path="eventVerwaltung/eventAnsehen/eventBearbeiten" element={<EventBearbeiten />} />
                    <Route path="eventVerwaltung/eventAnsehen/teliEinsehen/gastEinladen" element={<GastEinladen />} />
                    <Route path="gastEntfernenPopup" element={<GastEntfernenPopup />} />
                    <Route path="mitteilungAnOrganisator" element={<MitteilungAnOrganisator />} />
                    <Route path="registrierung" element={<Registrierung />} />
                    <Route path="eventVerwaltung/eventAnsehen/teliEinsehen/subgruHinz" element={<SubgruppenHinzufuegen />} />
                    <Route path="eventVerwaltung/eventAnsehen/teliEinsehen" element={<TeilnehmerListeEinsehen />} />
                    <Route path="eventVerwaltung/eventAnsehen/teliEinsehen/uZuSub" element={<UserZuSubgruppeHinzufuegen />} />
                    <Route path="wichtelZuordnungPopup" element={<WichtelzuordnungPopup />} />
                    <Route path="*" element={<NoPage />} />

                    <Route path="messageService" element={<MessageService/>} />
                    <Route path="messageService/gastEinladen" element={<GastEinladen/>} />
                    <Route path="messageService/mitteilungAnOrganisator" element={<MitteilungAnOrganisator/>} />

                    <Route path="subgruppenService" element={<SubgruppenService/>} />
                    <Route path="subgruppenService/subgruppenHinzufuegen" element={<SubgruppenHinzufuegen/>} />
                    <Route path="subgruppenService/userZuSubgruppeHinzufuegen" element={<UserZuSubgruppeHinzufuegen/>} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}



// Problem - ähnliche (alte Anweisung) wie Zeile 40-45. Zeile muss abgeändert werden zum Format von 40-45 um fehler zu beheben.
// ReactDOM.render(<Apps />, document.getElementById("root"));

// TODO FUTURE: https://reactrouter.com/en/main/routers/router-provider