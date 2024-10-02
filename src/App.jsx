import { Outlet } from "react-router";
import { Header, Footer } from "./components";
import { useSelector } from "react-redux";
import { isLoggedIn } from "./store/authSlice";
import UpdateStore from "./components/UpdateStore";



function App() {

  const loggedIn = useSelector(isLoggedIn)
  return (
    <>
    <UpdateStore />

      <section id="header-section">
        <Header />
      </section>

      <section id="content-section">
       <Outlet />
      </section>

      <section id="footer-section">
        <Footer />
      </section>
    </>
  );
}

export default App;
