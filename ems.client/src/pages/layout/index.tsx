import { Box } from "@mui/system";
import Header from "components/header";
import Footer from "components/footer";
import Sidebar from "components/sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="wrapper">
      <Box
        className="overlay"
        onClick={() => document.body.classList.toggle("sidebar-toggle")}
      />
      <Header />
      <main>
        <Sidebar />
        <div className="main-content">
          <Outlet />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Layout;