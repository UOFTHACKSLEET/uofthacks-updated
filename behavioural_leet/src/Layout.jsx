import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Layout.css";

function Layout() {
  const [loaderActive, setLoaderActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderActive(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loaderActive && <span className="loader"></span>}
      {!loaderActive && (
        <div className="App">
          <Sidebar />
          <div
            className="page"
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
