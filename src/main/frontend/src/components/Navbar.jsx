import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons'
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import './Navbar.css';


function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const menuRef = useRef();

    const toggleDropdown = () => setDropdown(!dropdown);

    // Close menu when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <IconContext.Provider value={{ color: '#fff' }}>
            <div className="navbar" ref={menuRef}>
                <Link to="#" className='menu-bars' onClick={toggleDropdown}>
                    <FaIcons.FaBars />
                </Link>

                <a className="brandName">
                    Secret <GiIcons.GiPresent size='20px' /> Santa
                </a>

                {/* Dropdown Menu instead of Sidebar */}
                <nav className={dropdown ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={() => setDropdown(false)}>
                        {SidebarData.map((item, index) => (
                            <li key={index} className="nav-text">
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </IconContext.Provider>
    );
}

export default Navbar;