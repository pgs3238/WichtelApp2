import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">home</Link>
                </li>
                <li>
                    <Link to="/anmelden">anmelden</Link>
                </li>
                <li>
                    <Link to="/eventAnlegen">eventAnlegen</Link>
                </li>
                <li>
                    <Link to="/eventAnsehen">eventAnsehen</Link>
                </li>
                <li>
                    <Link to="/eventAuswahl">eventAuswahl</Link>
                </li>
                <li>
                    <Link to="/eventBearbeiten">eventBearbeiten</Link>
                </li>
                <li>
                    <Link to="/gastEinladen">gastEinladen</Link>
                </li>
                <li>
                    <Link to="/gastEntfernenPopup">gastEntfernenPopup</Link>
                </li>
                <li>
                    <Link to="/mitteilungAnOrganisator">mitteilungAnOrganisator</Link>
                </li>
                <li>
                    <Link to="/registrierung">registrierung</Link>
                </li>
                <li>
                    <Link to="/subgruppenHinzufuegen">subgruppenHinzufuegen</Link>
                </li>
                <li>
                    <Link to="/teilnehmerlisteEinsehen">teilnehmerlisteEinsehen</Link>
                </li>
                <li>
                    <Link to="/userZuSubgruppeHinzufuegen">userZuSubgruppeHinzufuegen</Link>
                </li>
                <li>
                    <Link to="/wichtelZuordnungPopup">wichtelZuordnungPopup</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;