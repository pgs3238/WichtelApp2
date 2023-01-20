import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

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
        title: 'Event Service',
        path: '/event',
        cName: 'nav-text',
        icon: <MdIcons.MdOutlineCreate/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Event anlegen',
                path: '/eventAnlegen'
            },
            {
                title: 'Event ansehen',
                path: '/eventAnsehen'
            },
            {
                title: 'Event auswählen',
                path: '/eventAuswahl'
            },
            {
                title: 'Event bearbeiten',
                path: '/eventBearbeiten'
            },
            {
                title: 'Teilnehmerliste ansehen',
                path: '/teilnehmerListeEinsehen'
            },
        ]
    },

    {
        title: 'Subgruppen Service',
        path: '/subgruppen',
        cName: 'nav-text',
        icon: <MdIcons.MdOutlineCreate/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Subgruppen hinzufügen',
                path: '/subgruppenHinzufuegen'
            },
            {
                title: 'User zu Subgruppe hinzufügen',
                path: '/userZuSubgruppeHinzufuegen'
            }
        ]
    },

    {
        title: 'Message Service',
        path: '/message',
        cName: 'nav-text',
        icon: <MdIcons.MdOutlineCreate/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Einladung versenden',
                path: '/gastEinladen'
            },
            {
                title: 'Mitteilung an Organisator',
                path: '/mitteilungAnOrganisator'
            }
        ]
    },

    {
        title: 'Wichtel starten',
        path: '/wichtelzuordnungPopup',
        icon: <MdIcons.MdNotStarted/>,
        cName: 'nav-text'
    }



]