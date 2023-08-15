import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { IoDocuments, IoChevronForward } from "react-icons/io5";

const ReportMenu = ({ menuItemStyle, iconStyle }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <NavLink to="#" style={menuItemStyle} onClick={toggleMenu}>
                <IoDocuments style={iconStyle} />Department
                <IoChevronForward
                    style={{
                        marginLeft: 'auto',
                        transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                    }}
                />
            </NavLink>
            <ul style={{ display: isMenuOpen ? 'block' : 'none' }}>
                <li>
                    <NavLink to="/it-is" style={menuItemStyle}>
                        IT/IS
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/it-it" style={menuItemStyle}>
                        IT/IT
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/it-di" style={menuItemStyle}>
                        IT/DI
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/it-si" style={menuItemStyle}>
                        IT/SI
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/si-si" style={menuItemStyle}>
                        SI/SI
                    </NavLink>
                </li>
            </ul>
        </>
    );
}

export default ReportMenu;
