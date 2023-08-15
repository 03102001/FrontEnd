import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className="columns is-gapless mt-6" style={{ minHeight: "100vh" }}>
                <div className="column is-2">
                    <Sidebar />
                </div>
                <div className="column">
                    <div className="container has-background-light" style={{ padding: "1.5rem" }}>
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
