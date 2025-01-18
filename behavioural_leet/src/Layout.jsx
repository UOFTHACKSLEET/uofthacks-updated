import { Outlet } from "react-router-dom";

function Layout() {
  return (
    // <div className="App">
    //   <Sidebar />
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
    // </div>
  );
}

export default Layout;
