import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Rotas.css';

// Importando a foto real que está na sua pasta de ativos
import fotoBikeHeader from '../../assets/imagens/imagemBike.jpeg';

export default function Cicloturismo() {
  // Garante que a página carregue no topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dados reais retirados da sua imagem de referência
  const trilhas = [
    {
      nivel: 'INICIANTE',
      distancia: '12KM',
      nome: 'Jardim Botanico',
      descricao: 'Trilha fácil e ideal para iniciantes e crianças, realizada em estrada de terra dentro da área preservada do Jardim Botânico. O percurso é praticamente plano, com belas paisagens do cerrado. A entrada custa R$ 5,00 por pessoa, exceto crianças até 12 anos. Ótima opção para começar no mountain bike.'
    },
    {
      nivel: 'INTERMEDIÁRIO',
      distancia: '28KM',
      nome: 'Trilha do Horizonte Infinito',
      descricao: 'Misto de singletracks e estradão. Oferece uma vista panorâmica da Chapada, com subidas moderadas que testam o fôlego.'
    },
    {
      nivel: 'AVANÇADO',
      distancia: '42KM',
      nome: 'Desafio das Pedras Soltas',
      descricao: 'Terreno técnico com muitas pedras e descidas íngremes. Uma aventura exigente para quem já tem bastante experiência e domínio da bike nas trilhas mais brutas do cerrado.'
    },
    {
      nivel: 'INTERMEDIÁRIO',
      distancia: '22KM',
      nome: 'Rota das Águas Claras',
      descricao: 'Terreno de areia batida e trilhas estreitas entre a mata galeria. Termina com uma descida gratificante e visual incrível da região.'
    }
  ];

  return (
    <div style={{ background: 'var(--creme)', minHeight: '100vh', color: 'var(--pedra)', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* ─── CABEÇALHO DA PÁGINA (HERO CICLOTURISMO) ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '64px', alignItems: 'center', marginBottom: '100px' }}>
          <div>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '4.5rem', color: 'var(--verde)', lineHeight: '1', marginBottom: '24px', textTransform: 'uppercase' }}>
              Cicloturismo<br />em Brasília
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--cinza)', marginBottom: '32px', fontWeight: '300' }}>
              Explore a capital federal sob uma nova perspectiva. O cicloturismo em Brasília combina arquitetura icônica, horizontes infinitos e o contato direto com a natureza do cerrado, oferecendo uma jornada de liberdade e descoberta em cada pedalada.
            </p>
            <button className="btn-prim" style={{ padding: '16px 32px', borderRadius: '30px', fontSize: '1rem', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              Baixar Guia PDF
            </button>
          </div>
          
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '450px', boxShadow: '0 12px 40px rgba(26,51,40,0.15)' }}>
            <img 
              src={fotoBikeHeader} 
              alt="Cicloturismo em Brasília" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </div>

        {/* ─── SEÇÃO DE ROTEIROS ─── */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.5rem', color: 'var(--verde)', marginBottom: '16px' }}>
            Roteiros e Trilhas no DF
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--cinza)', maxWidth: '600px', margin: '0 auto', fontWeight: '300' }}>
            Explore o melhor do mountain bike no Distrito Federal com nossa curadoria de trilhas exclusivas para todos os níveis.
          </p>
        </div>

        {/* ─── GRID DOS CARDS DE TRILHAS ─── */}
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
            Pedalar por Brasília é uma experiência única. Siga estas orientações simples para garantir que seu passeio seja seguro, confortável e inesquecível.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderTop: '3px solid var(--terra)', border: '1px solid var(--areia2)', borderTopWidth: '3px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--terra)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--areia2)'; }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>🚴</div>
              <h4 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>O Passeio</h4>
              <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>Antes: Confira pneus e freios. Avise alguém sobre sua rota. Durante: Respeite a sinalização. Depois: Alongue o corpo e limpe a bike.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderTop: '3px solid var(--terra)', border: '1px solid var(--areia2)', borderTopWidth: '3px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--terra)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--areia2)'; }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>🛡️</div>
              <h4 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>Equipamentos</h4>
              <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>Capacete bem ajustado, luvas para conforto, kit de reparo básico (câmara reserva e bomba) e luzes de sinalização.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderTop: '3px solid var(--terra)', border: '1px solid var(--areia2)', borderTopWidth: '3px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--terra)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--areia2)'; }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>👕</div>
              <h4 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>Roupas Adequadas</h4>
              <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>Use tecidos leves. Bermudas com acolchoamento ajudam muito. Não esqueça os óculos de sol para proteger do vento e poeira.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderTop: '3px solid var(--terra)', border: '1px solid var(--areia2)', borderTopWidth: '3px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(26,51,40,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--terra)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--areia2)'; }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>💧</div>
              <h4 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>Hidratação</h4>
              <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>Beba água mesmo antes de sentir sede. Leve lanches práticos como frutas. No clima seco de Brasília, hidratação constante é vital.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}