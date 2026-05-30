import React from 'react'; // <- Remova o useEffect da importação
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Sobre from './components/Sobre/Sobre';
import Rotas from './components/Rotas/Rotas';
import Cicloturismo from './components/Rotas/Cicloturismo';
import Mototurismo from './components/Rotas/Mototurismo';
import OffRoad from './components/Rotas/OffRoad';
import Blog from './components/Blog/Blog';
import BlogPost from './components/Blog/BlogPost';
import Formulario from './components/FormularioWhatsApp/Formulario';
import Footer from './components/Footer/Footer';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import './App.css';

// Componente Home que agrupa a página inicial
function Home() {
  return (
    <>
      <Hero />
      <div className="stats-bar">
        <div className="stat-item"><div className="stat-num">3000KM</div><div className="stat-lbl">Desafio Elite</div></div>
        <div className="stat-item"><div className="stat-num">3</div><div className="stat-lbl">Tipos de Veículo</div></div>
        <div className="stat-item"><div className="stat-num">100%</div><div className="stat-lbl">Conexão com a Natureza</div></div>
      </div>
      <Sobre />
      <Rotas />
      <Formulario />
    </>
  );
}

// Layout com Navbar e Footer para as páginas públicas
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

// O App principal agora fica super limpo e focado só nas Rotas!
export default function App() {
  return (
    <Router>
      <Routes>
        {/* ROTAS PÚBLICAS (Com Navbar e Footer) */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/rotas/cicloturismo" element={<MainLayout><Cicloturismo /></MainLayout>} />
        <Route path="/rotas/mototurismo" element={<MainLayout><Mototurismo /></MainLayout>} />
        <Route path="/rotas/offroad" element={<MainLayout><OffRoad /></MainLayout>} />
        <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
        <Route path="/blog/:id" element={<MainLayout><BlogPost /></MainLayout>} />

        {/* ROTAS ADMINISTRATIVAS (Sem Navbar e Footer públicos) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}