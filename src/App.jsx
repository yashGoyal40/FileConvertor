import { Outlet } from "react-router";
import { Header, Footer, Login } from "./components";
import { useSelector } from "react-redux";
import { isLoggedIn } from "./store/authSlice";

function App() {
  const loggedIn = useSelector(isLoggedIn)
  return (
    <>
      <section id="header-section">
        <Header />
      </section>

      <section id="content-section">
        {!loggedIn && <Login />}
        {loggedIn && <Outlet />}
      </section>


      <section id="footer-section">
        <Footer />
      </section>
    </>
  );
}

export default App;
