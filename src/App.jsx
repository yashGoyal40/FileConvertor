import { Outlet } from "react-router";
import { Header, Footer } from "./components";

function App() {
  return (
    <>
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
