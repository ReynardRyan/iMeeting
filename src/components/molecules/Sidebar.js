import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CiHome, CiFileOn } from "react-icons/ci";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { to: "/dashboard", icon: <CiHome /> },
    { to: "/meeting-room", icon: <CiFileOn /> },
  ];

  return (
    <div
      style={{
        width: "72px",
        minHeight: "calc(100vh - 68px)",
        marginTop: "68px",
        background: "#FFFFFF",
        padding: "20px 15px 24px 15px",
        boxShadow: "4px 0px 20px 0px #6A6A6A1A",
        position: "fixed",
      }}
      className="d-flex flex-column align-items-center"
    >
      <Nav
        className="flex-column w-100 align-items-center"
        style={{ gap: "15px" }}
      >
        {menuItems.map((item, idx) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <Nav.Item key={idx}>
              <NavLink
                to={item.to}
                className={`d-flex align-items-center justify-content-center rounded ${
                  isActive ? "active-menu" : ""
                }`}
                style={{
                  width: "42px",
                  height: "42px",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {item.icon}
              </NavLink>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};

export default Sidebar;
