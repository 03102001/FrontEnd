import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import logo from "../logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Lakukan logika logout di sini
  //   // Contoh: Hapus token atau hapus data pengguna dari penyimpanan lokal
  //   navigate("/login"); // Arahkan ke halaman login setelah logout
  // };

  const signOut = () => {
    if (window.confirm("Are you sure to logout?")) {
      localStorage.removeItem('auth');
      alert("Successfully logout from app. See you later!");
      window.location.href = '/login';
    }
  };

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow has-background-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            <img src={logo} width="100" height="50" alt="logo" />
          </NavLink>

          <a
            href="!#"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          <h1 className="title is-5">Gatepass</h1>
          <h2 className="title is-2">System</h2>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button
                  className="button is-primary is-light"
                  onClick={() => signOut()}
                >
                  <span className="icon">
                    <IoLogOut />
                  </span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;