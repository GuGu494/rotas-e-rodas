import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Rotas.css';

import fotoCarroHeader from '../../assets/imagens/imagemCarro.jpeg';

export default function OffRoad() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trilhas = [
    {
      nivel: 'INICIANTE',
      distancia: '150KM',
      nome: 'Brasília → Pirenópolis (Asfalto)',
      descricao: 'Uma das rotas mais clássicas para quem busca tranquilidade, natureza e ótima estrutura turística. O trajeto possui estradas bem conservadas, belas paisagens do cerrado e acesso fácil para qualquer tipo de carro.'
    },
    {
      nivel: 'INTERMEDIÁRIO',
      distancia: '230KM',
      nome: 'Brasília → Chapada dos Veadeiros',
      descricao: 'Uma viagem perfeita para quem busca imersão na natureza, cachoeiras, trilhas e camping em meio ao cerrado preservado. A GO-118 é considerada uma das estradas mais bonitas do Centro-Oeste.'
    },
    {
      nivel: 'OFF-ROAD LEVE',
      distancia: '110KM',
      nome: 'Brasília → Cocalzinho de Goiás',
      descricao: 'Rota ideal para quem quer começar no off-road leve. Estradas de terra, travessias simples e paisagens naturais tornam o passeio perfeito para SUVs e carros altos.'
    },
    {
      nivel: 'INTERMEDIÁRIO',
      distancia: '140KM',
      nome: 'Formosa → Bezerra → Vale do Paranã',
      descricao: 'Uma rota incrível para aventureiros que buscam estradas de terra, serras, rios e camping selvagem com visual cinematográfico do cerrado goiano. Região procurada por praticantes de overlanding.'
    }
  ];

  return (
    <div style={{ background: 'var(--creme)', minHeight: '100vh', color: 'var(--pedra)', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '64px', alignItems: 'center', marginBottom: '100px' }}>
          <div>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '4.5rem', color: 'var(--verde)', lineHeight: '1', marginBottom: '24px', textTransform: 'uppercase' }}>
              Rotas Off-Road<br />4x4
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--cinza)', marginBottom: '32px', fontWeight: '300' }}>
              Aventura 4x4 com rotas de asfalto e trilhas off-road, camping e natureza para iniciantes e avançados sobre rodas. Seja para um bate-volta no fim de semana ou uma expedição com barraca e fogueira.
            </p>
            <button className="btn-prim" style={{ padding: '16px 32px', borderRadius: '30px', fontSize: '1rem', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              Baixar Guia PDF
            </button>
          </div>
          
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '450px', boxShadow: '0 12px 40px rgba(26,51,40,0.15)' }}>
            <img 
              src={fotoCarroHeader} 
              alt="Rotas Off-Road 4x4" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', color: 'var(--verde)', marginBottom: '16px' }}>
            Roteiros por etapa
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--cinza)', maxWidth: '600px', margin: '0 auto', fontWeight: '300' }}>
            Uma experiência de conexão com a natureza, liberdade, cultura regional e o espírito overland raiz, encarando estradas de terra e pores do sol inesquecíveis.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          {trilhas.map((trilha, idx) => (
            <div key={idx} style={{ background: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid var(--areia2)', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--terra)'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(26,51,40,0.08)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--areia2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,51,40,0.03)'; }}>
              
              <div style={{ fontSize: '0.8rem', color: 'var(--terra)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>
                {trilha.nivel} | {trilha.distancia}
              </div>
              
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.2rem', color: 'var(--verde)', marginBottom: '16px' }}>
                {trilha.nome}
              </h3>
              
              <p style={{ fontSize: '0.95rem', color: 'var(--cinza)', lineHeight: '1.7', fontWeight: '300' }}>
                {trilha.descricao}
              </p>
              
            </div>
          ))}
        </div>

        {/* ─── DICAS E SEGURANÇA ─── */}
        <div style={{ marginTop: '100px', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', color: 'var(--verde)', marginBottom: '16px', textAlign: 'center' }}>
            Dicas e Planejamento
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--cinza)', maxWidth: '600px', margin: '0 auto 48px', textAlign: 'center', fontWeight: '300' }}>
            Para aproveitar a viagem e a natureza, a segurança e preparação devem estar em dia para aventuras em 4x4.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderTop: '3px solid var(--terra)', border: '1px solid var(--areia2)', borderTopWidth: '3px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--terra)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--areia2)'; }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>⛽</div>
              <h4 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>Combustível</h4>
              <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>Como reduzir o consumo em 15% com manobras de alta performance e planejamento de rotas inteligentes.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderTop: '3px solid var(--terra)', border: '1px solid var(--areia2)', borderTopWidth: '3px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--terra)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--areia2)'; }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>💪</div>
              <h4 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>Preparação Física</h4>
              <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>Rotinas de treino essenciais para quem vive em alta velocidade e encara longas distâncias off-road sem descanso.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderTop: '3px solid var(--terra)', border: '1px solid var(--areia2)', borderTopWidth: '3px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--terra)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--areia2)'; }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>🎒</div>
              <h4 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>Equipamentos</h4>
              <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>Lista de itens indispensáveis e ferramentas de resgate para garantir a segurança e o conforto do seu veículo 4x4.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderTop: '3px solid var(--terra)', border: '1px solid var(--areia2)', borderTopWidth: '3px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--terra)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--areia2)'; }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>🧘‍♂️</div>
              <h4 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>Conexão</h4>
              <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>Práticas de condução consciente off-road e como manter a calma e a conexão com a natureza durante todo o percurso.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
