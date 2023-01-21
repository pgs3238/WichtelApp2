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
        title: 'Eventverwaltung',
        path: '/eventVerwaltung',
        cName: 'nav-text'
    },

    {
        title: 'Event anlegen',
        path: '/eventVerwaltung/eventAnlegen',
        icon: <MdIcons.MdOutlineCreate/>,
        cName: 'nav-text'
    },

    {
        title: 'Event ansehen',
        path: '/eventVerwaltung/eventAnsehen',
        icon: <AiIcons.AiFillEye/>,
        cName: 'nav-text'
    },

    {
        title: 'Event bearbeiten',
        path: 'eventVerwaltung/eventAnsehen/eventBearbeiten',

        cName: 'nav-text'
    },

    {
        title:  'Teilnehmer',
        path:   'eventVerwaltung/eventAnsehen/teliEinsehen',
        cName:  'nav-text'
    },

    {
        title: 'Gast einladen',
        path: '/eventVerwaltung/eventAnsehen/teliEinsehen/gastEinladen',

        cName: 'nav-text'
    },

    {
        title: 'Gast entfernen',
        path: '/gastEntfernenPopup',

        cName: 'nav-text'
    },

    {
        title: 'Subgruppen hinzufügen',
        path: '/eventVerwaltung/eventAnsehen/teliEinsehen/subgruHinz',

        cName: 'nav-text'
    },

    {
        title: 'User zu Subgruppe hinzufuegen',
        path: '/eventVerwaltung/eventAnsehen/teliEinsehen/uZuSub',

        cName: 'nav-text'
    },


]