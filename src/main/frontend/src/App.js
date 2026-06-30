import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Snowfall from "react-snowfall";

// Asset Imports
import snowflake1 from './assets/snowflake1.png';
import snowflake2 from './assets/snowflake2.png';

// Page Imports
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import EventAnlegen from "./pages/EventAnlegen";
import EventAnsehen from "./pages/EventAnsehen";
import EventBearbeiten from "./pages/EventBearbeiten";
import GastEinladen from "./pages/GastEinladen";
import MitteilungAnOrganisator from "./pages/MitteilungAnOrganisator";
import Registrierung from "./pages/Registrierung";
import SubgruppenHinzufuegen from "./pages/SubgruppenHinzufuegen";
import TeilnehmerListeEinsehen from "./pages/TeilnehmerListeEinsehen";
import UserZuSubgruppeHinzufuegen from "./pages/UserZuSubgruppeHinzufuegen";
import EventVerwaltung from "./pages/EventVerwaltung";
import MessageService from "./pages/MessageService";
import SubgruppenService from "./pages/SubgruppenService";

//Create Routes (Seiten verknüpfen aus pages)
export default function App() {
    const [token, setToken] = useState();
    const [snowflakes, setSnowflakes] = useState(
        //make snowfall density responsive
        Math.max(60, Math.min(window.innerWidth / 10, 150))
    )

    const snowflakeImages = useMemo(() => {
        const img1 = document.createElement('img');
        img1.src = snowflake1;
        const img2 = document.createElement('img');
        img2.src = snowflake2;
        return [img1, img2];
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setSnowflakes(Math.max(60, Math.min(window.innerWidth / 10, 150)));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // TODO FUTURE: https://reactrouter.com/en/main/routers/router-provider
    // -> Stellt das Routing auf den modernen 'RouterProvider' um, damit Daten (z.B. Event- & Teilnehmerlisten)
    // via Loader direkt vor dem Seiten-Render aus dem Quarkus-Backend geladen werden können.

    return (
        <BrowserRouter>
            <Snowfall
                snowflakeCount={snowflakes}
                color="#B3E5FC"
                images={snowflakeImages}
                radius={[15.0, 30.0]}
                style={{
                    position:'fixed',
                    width: '100vw',
                    height: '100vh',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                    pointerEvents:'none',
                }}
            />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="home/registrierung" element={<Registrierung/>} />
                    <Route path="home" element={<Home/>} />
                    <Route path="registrierung" element={<Registrierung />} />
                    <Route path="eventVerwaltung" element={<EventVerwaltung />} />
                    <Route path="eventVerwaltung/eventAnlegen" element={<EventAnlegen />} />
                    <Route path="eventVerwaltung/eventAnsehen" element={<EventAnsehen />} />
                    <Route path="eventVerwaltung/eventAnsehen/eventBearbeiten" element={<EventBearbeiten />} />
                    <Route path="messageService/mitteilungAnOrganisator" element={<MitteilungAnOrganisator/>} />
                    <Route path="*" element={<NoPage />} />



                    {/*TODO to be removed*/}
                    <Route path="messageService" element={<MessageService />} />
                    <Route path="eventVerwaltung/eventAnsehen/teliEinsehen/gastEinladen" element={<GastEinladen />} />
                    <Route path="eventVerwaltung/eventAnsehen/teliEinsehen/subgruHinz" element={<SubgruppenHinzufuegen />} />
                    <Route path="eventVerwaltung/eventAnsehen/teliEinsehen" element={<TeilnehmerListeEinsehen />} />
                    <Route path="eventVerwaltung/eventAnsehen/teliEinsehen/uZuSub" element={<UserZuSubgruppeHinzufuegen />} />
                    <Route path="messageService/gastEinladen" element={<GastEinladen/>} />
                    <Route path="subgruppenService" element={<SubgruppenService/>} />
                    <Route path="subgruppenService/subgruppenHinzufuegen" element={<SubgruppenHinzufuegen/>} />
                    <Route path="subgruppenService/userZuSubgruppeHinzufuegen" element={<UserZuSubgruppeHinzufuegen/>} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}