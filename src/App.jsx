import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./final-polish.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Conditions from "./pages/Conditions";
import Team from "./pages/Team";
import PatientStories from "./pages/PatientStories";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import FitToRun from "./pages/FitToRun";
import WhatsAppButton from "./components/WhatsAppButton";
import AdminPanel from "./admin/AdminPanel";

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function PublicRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fit-to-run" element={<FitToRun />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/team" element={<Team />} />
        <Route path="/patient-stories" element={<PatientStories />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <WhatsAppButton />
    </Layout>
  );
}

function AppRoutes() {
  const location = useLocation();
  if (location.pathname === "/admin") return <AdminPanel />;
  return <PublicRoutes />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
