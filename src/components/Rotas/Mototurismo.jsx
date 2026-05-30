import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Rotas.css';

import fotoMotoHeader from '../../assets/imagens/imagemMoto.jpeg';

export default function Mototurismo() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trilhas = [
    {
      nivel: 'INICIANTE',
      distancia: '150KM',
      nome: 'Brasília → Pirenópolis (Asfalto)',
      descricao: 'Uma das rotas favoritas dos motociclistas do DF, com curvas leves, paisagens do cerrado e parada obrigatória para café colonial e cachoeiras em Pirenópolis. Muitos motociclistas recomendam o trajeto via Alexânia pela qualidade da pista e menor estresse para quem está começando.'
    },
    {
      nivel: 'INTERMEDIÁRIO',
      distancia: '230KM',
      nome: 'Brasília → Chapada dos Veadeiros (Asfalto)',
      descricao: 'Uma viagem clássica para quem busca longas retas, visual cinematográfico e conexão intensa com a natureza até Alto Paraíso. A GO-118 é considerada uma das estradas mais bonitas para motociclistas na região Centro-Oeste.'
    },
    {
      nivel: 'LEVE',
      distancia: '120KM',
      nome: 'Brasília → Cocalzinho de Goiás Off-Road',
      descricao: 'Rota excelente para quem quer começar no off-road sem grandes dificuldades, passando por estradas de terra, fazendas e muito cerrado preservado. Excelente para motos trail e aventureiros iniciantes.'
    },
    {
      nivel: 'INTERMEDIÁRIO',
      distancia: '155KM',
      nome: 'Brasília → Pirenópolis Off-Road via Corumbá',
      descricao: 'Uma expedição clássica entre motociclistas adventure, com trechos técnicos, pedras, subidas e paisagens incríveis do cerrado goiano passando pela Serra dos Pireneus e Salto do Corumbá.'
    }
  ];

  return (
    <div style={{ background: 'var(--creme)', minHeight: '100vh', color: 'var(--pedra)', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '64px', alignItems: 'center', marginBottom: '100px' }}>
          <div>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '4.5rem', color: 'var(--verde)', lineHeight: '1', marginBottom: '24px', textTransform: 'uppercase' }}>
              Moto Turismo<br />na Estrada
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--cinza)', marginBottom: '32px', fontWeight: '300' }}>
              Explore motociclismo, rotas, trilhas e dicas no nosso blog de viagens. A sensação de liberdade do vento no rosto. Roteiros de mototurismo pelas serras e chapadas, com mapeamento de pontos estratégicos e dicas reais de pilotagem.
            </p>
            <button className="btn-prim" style={{ padding: '16px 32px', borderRadius: '30px', fontSize: '1rem', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              Baixar Guia PDF
            </button>
          </div>
          
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '450px', boxShadow: '0 12px 40px rgba(26,51,40,0.15)' }}>
            <img 
              src={fotoMotoHeader} 
              alt="Moto Turismo" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', color: 'var(--verde)', marginBottom: '16px' }}>
            Roteiros e Trilhas no DF
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--cinza)', maxWidth: '600px', margin: '0 auto', fontWeight: '300' }}>
            Listamos algumas dicas de lugares preciosos nessa região, ideais para um bate-volta ou um final de semana a bordo da sua moto.
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
            Dicas e Segurança
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--cinza)', maxWidth: '600px', margin: '0 auto 48px', textAlign: 'center', fontWeight: '300' }}>
            Para aproveitar a viagem com tranquilidade, a segurança deve vir sempre em primeiro lugar. Aqui vão algumas dicas!
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderTop: '3px solid var(--terra)', border: '1px solid var(--areia2)', borderTopWidth: '3px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--terra)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--areia2)'; }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>🏍️</div>
              <h4 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>O Passeio</h4>
              <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>Revise a moto antes de sair. Mantenha distância segura, faça pausas para descanso e limpe a moto ao retornar verificando desgastes.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderTop: '3px solid var(--terra)', border: '1px solid var(--areia2)', borderTopWidth: '3px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--terra)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--areia2)'; }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>🛡️</div>
              <h4 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>Equipamentos</h4>
              <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>Utilize capacete fechado, luvas, jaqueta com proteção, botas e protetor de chuva. Fazem diferença no asfalto e off-road.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderTop: '3px solid var(--terra)', border: '1px solid var(--areia2)', borderTopWidth: '3px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--terra)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--areia2)'; }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>👕</div>
              <h4 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>Roupas Adequadas</h4>
              <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>Prefira roupas resistentes, apropriadas para o clima. Dê preferência a peças com proteção UV, ventilação e tecidos impermeáveis.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderTop: '3px solid var(--terra)', border: '1px solid var(--areia2)', borderTopWidth: '3px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--terra)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--areia2)'; }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>💧</div>
              <h4 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>Alimentação</h4>
              <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>Mantenha-se hidratado e evite longos períodos sem comer. Leve água, frutas e faça pausas, principalmente sob calor intenso.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
