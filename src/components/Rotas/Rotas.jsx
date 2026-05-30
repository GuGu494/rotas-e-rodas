import React from 'react';
import './Rotas.css';

import fotoBike from '../../assets/imagens/imagemBike.jpeg';
import fotoMoto from '../../assets/imagens/imagemMoto.jpeg';
import fotoCarro from '../../assets/imagens/imagemCarro.jpeg';

export default function Rotas() {
  return (
    <section className="rotas sec-pad" id="rotas">
      <div className="rotas-header">
        <div>
          <div className="sec-tag">Rotas e Viagens</div>
          <h2 className="sec-title">Roteiros por Categoria</h2>
          <p className="sec-sub">Explore nossas rotas exclusivas, desenhadas para cada tipo de aventura e cada tipo de rodas.</p>
        </div>
        <a href="#solicitar" className="btn-prim" style={{ whiteSpace: 'nowrap' }}>
          Eu aceito o desafio →
        </a>
      </div>

      <div className="rotas-grid">
        {/* Categoria: Bicicleta */}
        <a href="/rotas/cicloturismo" className="rota-card">
          <div className="rota-thumb thumb-bike">
            <img src={fotoBike} alt="Cicloturismo" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
            <div className="rota-type">Bicicletas</div>
          </div>
          <div className="rota-info">
            <h3>Rotas Bicicletas</h3>
            <p>
              Que tal visitar os principais pontos turísticos da Capital em cima de uma bicicleta?
            </p>
          </div>
          <div className="rota-footer">
            <span>⚡ Cicloturismo</span>
            <span className="arrow">→</span>
          </div>
        </a>

        {/* Categoria: Motocicleta */}
        <a href="/rotas/mototurismo" className="rota-card">
          <div className="rota-thumb thumb-moto">
            <img src={fotoMoto} alt="Mototurismo" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
            <div className="rota-type">Motocicletas</div>
          </div>
          <div className="rota-info">
            <h3>Rotas Motocicletas</h3>
            <p>
              Experiências de liberdade e velocidade em trilhas de pedra e pistas de asfalto desafiadoras.
            </p>
          </div>
          <div className="rota-footer">
            <span>🏍️ Liberdade na Estrada</span>
            <span className="arrow">→</span>
          </div>
        </a>

        {/* Categoria: Off-Road 4x4 */}
        <a href="/rotas/offroad" className="rota-card">
          <div className="rota-thumb thumb-4x4">
            <img src={fotoCarro} alt="Off-Road 4x4" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
            <div className="rota-type">4x4</div>
          </div>
          <div className="rota-info">
            <h3>Rotas de 4x4</h3>
            <p>
              Desafios de trilhas e estradas de terra que testam a técnica e a confiança do seu veículo.
            </p>
          </div>
          <div className="rota-footer">
            <span>🚙 Expedições e Trilhas</span>
            <span className="arrow">→</span>
          </div>
        </a>
      </div>

      {/* Seção de Dicas e Planejamento */}
      <div className="dicas-section">
        <div className="rotas-header" style={{ marginTop: '80px', marginBottom: '40px' }}>
          <div>
            <div className="sec-tag">Prepara-se</div>
            <h2 className="sec-title">Dicas e Planejamento</h2>
          </div>
        </div>

        <div className="dicas-grid">
          <div className="dica-card">
            <div className="dica-icon">⛽</div>
            <h4>Economia de Combustível</h4>
            <p>Como reduzir o consumo em 15% com manobras de alta performance e rotas inteligentes.</p>
          </div>

          <div className="dica-card">
            <div className="dica-icon">💪</div>
            <h4>Preparação Física</h4>
            <p>Rotinas de treino para quem vive em alta velocidade e longas distâncias sem descanso.</p>
          </div>

          <div className="dica-card">
            <div className="dica-icon">🎒</div>
            <h4>Equipamentos Essenciais</h4>
            <p>Lista de itens que não podem faltar para garantir a segurança e o conforto da sua viagem.</p>
          </div>

          <div className="dica-card">
            <div className="dica-icon">🧘‍♂️</div>
            <h4>Segurança e Conexão</h4>
            <p>Práticas de condução consciente e como manter a calma e a conexão com a natureza durante o percurso.</p>
          </div>
        </div>
      </div>
    </section>
  );
}