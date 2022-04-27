import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
    {
        title: 'Library Home',
        path: '/Home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Search for Book',
        path: '/Search',
        icon: <AiIcons.AiOutlineSearch />,
        cName: 'nav-text'
    },
    {
        title: 'Add Book',
        path: '/AddBookAPI',
        icon: <IoIcons.IoMdAdd />,
        cName: 'nav-text'
    },
    {
        title: 'Switch Profiles',
        path: '/Login',
        icon: <BsIcons.BsPersonSquare />,
        cName: 'nav-text'
    }
]
