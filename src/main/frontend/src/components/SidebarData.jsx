import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },

    {
        title: 'Anmelden',
        path: '/anmelden',
        icon: <FaIcons.FaSignInAlt/>,
        cName: 'nav-text'
    },

    {
        title: 'Registrieren',
        path: '/registrierung',
        icon: <FaIcons.FaRegRegistered/>,
        cName: 'nav-text'
    },

    {
        title: 'Event anlegen',
        path: '/eventAnlegen',
        icon: <MdIcons.MdOutlineCreate/>,
        cName: 'nav-text'
    },

    {
        title: 'Event bearbeiten',
        path: '/eventBearbeiten',

        cName: 'nav-text'
    },

    {
        title: 'Gast einladen',
        path: '/gastEinladen',

        cName: 'nav-text'
    },

    {
        title: 'Subgruppen hinzufügen',
        path: '/subgruppenHinzufuegen',

        cName: 'nav-text'
    },

    {
        title: 'User zu Subgruppe hinzufuegen',
        path: '/userZuSubgruppeHinzufuegen',

        cName: 'nav-text'
    },

    {
        title: 'Gast entfernen',
        path: '/gastEntfernenPopup',

        cName: 'nav-text'
    },

    {
        title: 'Event ansehen',
        path: '/eventAnsehen',
        icon: <AiIcons.AiFillEye/>,
        cName: 'nav-text'
    },
]