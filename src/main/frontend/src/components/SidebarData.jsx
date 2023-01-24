import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";

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
        icon: <MdIcons.MdManageAccounts/>,
        cName: 'nav-text'
    },

    {
      title: 'Message Service',
      path: '/messageService',
      icon: <AiIcons.AiOutlineMessage/>,
      cName: 'nav-text'
    },

    {
        title: 'Subgruppen Service',
        path: '/subgruppenService',
        icon: <HiIcons.HiOutlineUserGroup/>,
        cName: 'nav-text'
    },


]