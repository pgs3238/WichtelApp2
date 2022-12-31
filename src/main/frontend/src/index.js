import React from 'react';
import ReactDOM from 'react-dom/client';
//alter code, darueber neuer code
//import ReactDOM from 'react-dom';
//folgende 3 Zeilen machen das drehende Bild. In Zeile 44 muss dazu Apps zu App
/*import './index.css';
import App from './App';
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

//alter code - darunter neuer code
/*function Welcome(props) {
    return <h1> Hello, {props.name}, {props.nachname}</h1>
}
const element = <Welcome name="Sara" nachname="Simpson" />;
ReactDOM.render(
    element,
    document.getElementById('root')
);
ReactDOM.render(<App />, document.getElementById('root'));*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Apps />
  </React.StrictMode>
);

 /* If you want to start measuring performance in your app, pass a function
 to log results (for example: reportWebVitals(console.log))
 or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals */
//TODO not implemented yet (???) so deaktivated currently 31.12.2022
// reportWebVitals();

//Create Routes (Seiten verknüpfen aus pages)
export default function Apps() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="anmelden" element={<Anmelden />} />
                    <Route path="eventAnlegen" element={<EventAnlegen />} />
                    <Route path="eventAnsehen" element={<EventAnsehen />} />
                    <Route path="eventAuswahl" element={<EventAuswahl />} />
                    <Route path="eventBearbeiten" element={<EventBearbeiten />} />
                    <Route path="gastEinladen" element={<GastEinladen />} />
                    <Route path="gastEntfernenPopup" element={<GastEntfernenPopup />} />
                    <Route path="mitteilungAnOrganisator" element={<MitteilungAnOrganisator />} />
                    <Route path="registrierung" element={<Registrierung />} />
                    <Route path="subgruppenHinzufuegen" element={<SubgruppenHinzufuegen />} />
                    <Route path="teilnehmerlisteEinsehen" element={<TeilnehmerListeEinsehen />} />
                    <Route path="userZuSubgruppeHinzufuegen" element={<UserZuSubgruppeHinzufuegen />} />
                    <Route path="wichtelZuordnungPopup" element={<WichtelzuordnungPopup />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


// Problem - ähnliche (alte Anweisung) wie Zeile 40-45. Zeile muss abgeändert werden zum Format von 40-45 um fehler zu beheben.
// ReactDOM.render(<Apps />, document.getElementById("root"));