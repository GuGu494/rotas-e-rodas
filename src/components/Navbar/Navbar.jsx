import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bike, Motorbike, Car, Menu, X } from 'lucide-react';
import './Navbar.css';
import logo2 from '../../assets/icones/logo2.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';
  const deveFicarEscura = !isHome || scrolled;

  const estiloFundoNav = {
    background: deveFicarEscura ? '#1a3328' : 'transparent', 
    boxShadow: deveFicarEscura ? '0 10px 30px rgba(0,0,0,0.15)' : 'none',
    borderBottom: deveFicarEscura ? '1px solid rgba(240, 235, 224, 0.08)' : 'none',
    transition: 'all 0.3s ease'
  };

  return (
    <nav id="nav" style={estiloFundoNav} className={deveFicarEscura ? 'scrolled' : ''}>
      <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src={logo2} alt="Logo Rotas & Rodas" style={{ height: '80px', width: 'auto', objectFit: 'contain' }} />
      </Link>
      
      <div className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} color="var(--areia)" /> : <Menu size={28} color="var(--areia)" />}
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="/#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
        
        {/* CORREÇÃO AQUI: Voltamos para a tag <a> para puxar a cor branca do CSS */}
        <div className="nav-dropdown">
          <a 
            href="#" 
            className="dropdown-toggle" 
            onClick={(e) => e.preventDefault()} 
            style={{ cursor: 'pointer' }}
          >
            Rotas e Viagens ▾
          </a>
          <div className="dropdown-menu">
            <Link to="/rotas/cicloturismo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setMenuOpen(false)}><Bike size={18} /> Cicloturismo</Link>
            <Link to="/rotas/mototurismo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setMenuOpen(false)}><Motorbike size={18} /> Mototurismo</Link>
            <Link to="/rotas/offroad" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setMenuOpen(false)}><Car size={18} /> Off-Road 4x4</Link>
          </div>
        </div>

        <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
        <a href="/#solicitar" className="nav-cta" onClick={() => setMenuOpen(false)}>
          Solicitar Rota
        </a>
      </div>
    </nav>
  );
}