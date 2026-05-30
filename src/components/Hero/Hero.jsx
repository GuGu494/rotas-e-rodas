import React from 'react';
import './Hero.css';
import videoBg from '../../assets/imagens/Video_Home.mp4';

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <video className="hero-video-bg" autoPlay loop muted playsInline>
        <source src={videoBg} type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-eyebrow">Planejamento Profissional de Viagens</div>
        <h1>A viagem perfeita, sem a <em>dor de cabeça</em> de planejar</h1>
        <p className="hero-sub">
          Vai viajar de moto, carro 4x4 ou bicicleta e não sabe o melhor caminho? Nós desenhamos a rota ideal, mapeando estradas seguras, paradas incríveis e condições reais do trajeto. Economize tempo e evite imprevistos com um roteiro feito sob medida para o seu perfil e veículo.
        </p>
        <div className="hero-btns">
          <a href="#solicitar" className="btn-prim">🗺️ Solicitar Orçamento</a>
          <a href="#solicitar" className="btn-sec">Como Funciona</a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line"></div>
        Rolar
      </div>
    </section>
  );
}