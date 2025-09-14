import React from "react";
import Navbar from "../molecules/Navbar";
import Sidebar from "../molecules/Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            padding: "24px 36px 56px 28px",
            marginTop: "68px",
            marginLeft: "72px",
            minHeight: "calc(100vh - 68px)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
