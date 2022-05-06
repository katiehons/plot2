import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
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
        title: 'Browse Bookshelves',
        path: '/BrowseLocations',
        icon: <GiIcons.GiBookshelf />,
        cName: 'nav-text'
    },
    {
        title: 'Search Books',
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
        title: 'Manage Locations',
        path: '/LocationMgr',
        icon: <RiIcons.RiMap2Line />,
        cName: 'nav-text'
    },
    {
        title: 'Switch Profiles',
        path: '/Login',
        icon: <BsIcons.BsPersonSquare />,
        cName: 'nav-text'
    }
]
