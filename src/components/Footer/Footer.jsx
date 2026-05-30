import React from 'react';
import './Footer.css';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="f-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Compass size={24} color="var(--primary)" /> Rotas & Rodas</div>
          <p className="f-desc">
            Explorando caminhos, vivendo histórias e conectando aventureiros sobre rodas por todo o Brasil.
          </p>
          <div className="f-socials">
            <a className="f-soc" href="https://www.facebook.com/ElieteBahiaRotaseRodas" target="_blank" rel="noreferrer">f</a>
            <a className="f-soc" href="https://www.instagram.com/rotaserodas_br/" target="_blank" rel="noreferrer">ig</a>
            <a className="f-soc" href="https://www.youtube.com/@rotaserodas_br" target="_blank" rel="noreferrer">yt</a>
            <a className="f-soc" href="https://www.tiktok.com/@rotaserodas_br" target="_blank" rel="noreferrer">tk</a>
          </div>
        </div>
        <div className="f-col">
          <h4>Explorar</h4>
          <ul>
            <li><a href="#rotas">Cicloturismo</a></li>
            <li><a href="#rotas">Moto Turismo</a></li>
            <li><a href="#rotas">Rotas Off-Road</a></li>
            <li><a href="#videos">Blog</a></li>
          </ul>
        </div>
        <div className="f-col">
          <h4>Links</h4>
          <ul>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#solicitar">Solicitar Rota</a></li>
            <li><a href="https://www.youtube.com/@rotaserodas_br" target="_blank" rel="noreferrer">YouTube</a></li>
          </ul>
        </div>
        <div className="f-col">
          <h4>Contato</h4>
          <p>contato@rotaserodas.com.br</p>
          <p style={{ marginTop: '8px' }}>+55 (61) 99982-8617</p>
          <p style={{ marginTop: '8px' }}>Brasília, DF<br />Taguatinga</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Rotas & Rodas. Todos os direitos reservados.</p>
        <p>Criado para quem vive a estrada</p>
      </div>
    </footer>
  );
}