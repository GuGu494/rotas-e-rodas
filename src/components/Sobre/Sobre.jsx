import React from 'react';
import './Sobre.css';
// Vamos aproveitar a imagem da moto que já importamos antes para ilustrar, 
// mas você pode trocar por outra foto incrível dela depois!
import fotoSobre from '../../assets/imagens/imagemSobre.jpeg'; 

export default function Sobre() {
  return (
    <section className="sec-pad sobre" id="sobre" style={{ background: '#faf9f6' }}>
      <div className="sobre-grid">
        
        {/* ─── LADO ESQUERDO: FOTO E CITAÇÃO ─── */}
        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', height: '600px', background: 'var(--verde)' }}>
          {/* Foto de Fundo */}
          <img 
            src={fotoSobre} 
            alt="Eliete Bahia em expedição" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          
          {/* Película escura para dar destaque à citação */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,51,40,0.95) 0%, rgba(26,51,40,0.1) 60%)' }}></div>
          
          {/* Caixa de Citação igual a da sua imagem */}
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', background: 'rgba(26,51,40,0.85)', backdropFilter: 'blur(10px)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '8px' }}>
              "Explorar o mundo sozinha não é sobre não ter medo, é sobre ir com medo mesmo e descobrir do que você é capaz."
            </p>
            <span style={{ color: 'var(--terra)', fontSize: '0.85rem', fontWeight: 'bold' }}>— Eliete Bahia</span>
          </div>
        </div>

        {/* ─── LADO DIREITO: TEXTO E DESAFIOS ─── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '30px', height: '1px', background: 'var(--terra)' }}></div>
            <span style={{ color: 'var(--terra)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
              O Documentário
            </span>
          </div>

          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3rem', color: 'var(--verde)', lineHeight: '1.1', marginBottom: '24px' }}>
            Muito mais que um destino: um documentário de vida
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--pedra)', lineHeight: '1.8', marginBottom: '16px', fontWeight: '300' }}>
            O <strong>Rotas & Rodas</strong> nasceu da coragem de documentar as belezas, os perrengues e a cultura da América do Sul de um ponto de vista único: o de uma mulher desbravando estradas sozinha.
          </p>

          <p style={{ fontSize: '1.05rem', color: 'var(--pedra)', lineHeight: '1.8', marginBottom: '40px', fontWeight: '300' }}>
            Seja acelerando uma Himalayan 450, convertendo uma Pajero TR4 em casa ou superando limites no cicloturismo, o objetivo é inspirar você a sair da zona de conforto. Cada quilômetro rodado é testado na pele para entregar roteiros reais e seguros.
          </p>

          {/* Tags de Desafios (Mantendo o design que você mostrou) */}
          <div>
            <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '16px' }}>
              Modalidades de Expedição
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              
              <span style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '30px', fontSize: '0.85rem', color: 'var(--verde)', display: 'flex', alignItems: 'center', gap: '8px', background: '#fff' }}>
                🏍️ Mototurismo Solo
              </span>
              
              <span style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '30px', fontSize: '0.85rem', color: 'var(--verde)', display: 'flex', alignItems: 'center', gap: '8px', background: '#fff' }}>
                🚙 Overlanding 4x4
              </span>
              
              <span style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '30px', fontSize: '0.85rem', color: 'var(--verde)', display: 'flex', alignItems: 'center', gap: '8px', background: '#fff' }}>
                🚴‍♀️ Cicloviagens
              </span>
              
              <span style={{ padding: '8px 16px', border: '1px solid var(--terra)', borderRadius: '30px', fontSize: '0.85rem', color: 'var(--terra)', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(217, 119, 74, 0.05)', fontWeight: 'bold' }}>
                📸 Fotografia Documental
              </span>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}