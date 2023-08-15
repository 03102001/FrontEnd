import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoDesktop, IoReceiptSharp, IoFolderOpen, IoHome, IoLogOut, IoChevronForward } from "react-icons/io5";
import ReportMenu from './ReportMenu';
import { postData } from '../utils/fetch';

const Sidebar = () => {
    const menuLabelStyle = {
        color: '#888',
        fontWeight: 'bold',
        marginTop: '1rem'
    };

    const menuListStyle = {
        marginTop: '0.5rem'
    };

    const menuItemStyle = {
        display: 'flex',
        alignItems: 'center',
        color: '#333',
        textDecoration: 'none',
        marginBottom: '0.5rem'
    };

    const iconStyle = {
        marginRight: '0.5rem'
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        marginBottom: '0.5rem',
        cursor: 'pointer'
    };

    const sidebarStyle = {
        backgroundColor: '#ffff',
        color: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    };

    const navigate = useNavigate();

    const signOut = () => {
        if (window.confirm("Are you sure to logout?")) {
            localStorage.removeItem('auth');
            alert("Successfully logout from app. See you later!");
            window.location.href = '/login';
        }
    };

    return (
        <aside className="menu pl-2 has-shadow" style={sidebarStyle}>
            <div>
                <p className="menu-label" style={menuLabelStyle}>
                    Admin
                </p>
                <ul className="menu-list" style={menuListStyle}>
                    <li>
                        <NavLink to="/dashboard" style={menuItemStyle}>
                            <IoHome style={iconStyle} />Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/product" style={menuItemStyle}>
                            <IoDesktop style={iconStyle} />Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/gatepass" style={menuItemStyle}>
                            <IoReceiptSharp style={iconStyle} />Gatepass
                        </NavLink>
                    </li>
                </ul>
                <p className="menu-label" style={menuLabelStyle}>
                    Super Admin
                </p>
                <ul className="menu-list" style={menuListStyle}>
                    <li>
                        <NavLink to="#" style={menuItemStyle}>
                            <IoFolderOpen style={iconStyle} />Report
                        </NavLink>
                        <ul className="menu-list" style={menuListStyle}>
                            <li>
                                <ReportMenu menuItemStyle={menuItemStyle} iconStyle={iconStyle} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to="/users" style={menuItemStyle}>
                            <IoPerson style={iconStyle} />Users
                        </NavLink>
                    </li>
                </ul>
                <p className="menu-label" style={menuLabelStyle}>
                    Settings
                </p>
                <ul className="menu-list" style={menuListStyle}>
                    <li>
                        <button className="button is-white" onClick={() => signOut()} style={buttonStyle}>
                            <IoLogOut style={iconStyle} />Logout
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
