import React from "react";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },

    {
        title: 'Eventverwaltung',
        path: '/eventVerwaltung',
        icon: <MdIcons.MdManageAccounts/>,
        cName: 'nav-text'
    },

    {
        title: 'Meine Events',
        path: '/eventVerwaltung/eventAnsehen',
        icon: <BsIcons.BsCalendar2DateFill/>,
        cName: 'nav-text'
    },

]