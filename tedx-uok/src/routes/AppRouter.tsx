import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";

import HomePage from "../pages/Home/HomePage";
import AboutPage from "../pages/About/AboutPage";
import SpeakersPage from "../pages/Speakers/SpeakersPage";
import TeamPage from "../pages/Team/TeamPage";
import PartnersPage from "../pages/Partners/PartnersPage";
import ContactPage from "../pages/Contact/ContactPage";
import RegistrationPage from "../pages/Registration/RegistrationPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<div key={location.pathname} className="page-transition"><HomePage /></div>} />
      <Route path="/about" element={<div key={location.pathname} className="page-transition"><AboutPage /></div>} />
      <Route path="/speakers" element={<div key={location.pathname} className="page-transition"><SpeakersPage /></div>} />
      <Route path="/team" element={<div key={location.pathname} className="page-transition"><TeamPage /></div>} />
      <Route path="/partners" element={<div key={location.pathname} className="page-transition"><PartnersPage /></div>} />
      <Route path="/contact" element={<div key={location.pathname} className="page-transition"><ContactPage /></div>} />
      <Route path="/register" element={<div key={location.pathname} className="page-transition"><RegistrationPage /></div>} />
    </Routes>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}
