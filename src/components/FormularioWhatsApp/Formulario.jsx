import React, { useState } from 'react';
import { Bike, Motorbike, Car, MessageCircle } from 'lucide-react';
import './Formulario.css';
export default function Formulario() {
  const [formData, setFormData] = useState({
    nome: '', wpp: '', destino: '', nivel: '', duracao: '', obs: '', veiculo: 'bike'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVeiculo = (tipo) => {
    setFormData({ ...formData, veiculo: tipo });
  };

  const enviarWpp = () => {
    if (!formData.nome || !formData.wpp || !formData.destino) {
      alert('Por favor preencha pelo menos: nome, WhatsApp e destino.');
      return;
    }

    const vMap = { bike: 'Bicicleta 🚲', '4x4': '4x4 / Off-Road 🚙', moto: 'Motocicleta 🏍️' };
    
    const msg = `🧭 *Solicitação de Rota — Rotas & Rodas*\n
👤 *Nome:* ${formData.nome}
📱 *WhatsApp:* ${formData.wpp}
📍 *Destino:* ${formData.destino}
🚙 *Veículo:* ${vMap[formData.veiculo]}
${formData.nivel ? `⭐ *Nível:* ${formData.nivel}\n` : ''}${formData.duracao ? `📅 *Duração:* ${formData.duracao}\n` : ''}${formData.obs ? `\n💬 *Observações:*\n${formData.obs}` : ''}
\n_Enviado pelo site rotaserodasbr.com_`;

    const numero = '5561999828617';
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="form-section sec-pad" id="solicitar">
      <div className="form-wrap">
        <div className="form-left">
          <div className="sec-tag">Consultoria de Rota</div>
          <h2 className="sec-title">Solicite sua proposta</h2>
          <p className="sec-sub" style={{marginBottom: '32px'}}>Não perca tempo em mapas confusos. Deixe a logística com especialistas e foque apenas em curtir a estrada.</p>
          
          <div className="como-funciona">
            <div className="passo">
              <div className="passo-num">1</div>
              <div className="passo-text">
                <strong>Você nos conta o plano</strong>
                <span>Diga de onde vai sair, para onde quer ir e qual o seu veículo.</span>
              </div>
            </div>
            <div className="passo">
              <div className="passo-num">2</div>
              <div className="passo-text">
                <strong>Orçamento e Análise</strong>
                <span>Avaliamos a viabilidade e enviamos um orçamento sem compromisso pelo WhatsApp.</span>
              </div>
            </div>
            <div className="passo">
              <div className="passo-num">3</div>
              <div className="passo-text">
                <strong>Você viaja tranquilo</strong>
                <span>Receba a rota detalhada com pontos de apoio e aproveite a viagem com segurança.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-card">
          <h3>Fazer Pedido</h3>
          
          <div className="frow">
            <div className="fg">
              <label className="fl">Seu Nome</label>
              <input className="fi" name="nome" value={formData.nome} onChange={handleChange} placeholder="Ex: Maria Silva" />
            </div>
            <div className="fg">
              <label className="fl">WhatsApp</label>
              <input className="fi" name="wpp" value={formData.wpp} onChange={handleChange} placeholder="(61) 9 9999-9999" />
            </div>
          </div>

          <div className="fg">
            <label className="fl">Onde você quer ir?</label>
            <input className="fi" name="destino" value={formData.destino} onChange={handleChange} placeholder="Ex: Chapada Diamantina" />
          </div>

          <div className="fg">
            <label className="fl" style={{ marginBottom: '10px' }}>Tipo de Veículo</label>
            <div className="veh-group">
              <button className={`veh-btn ${formData.veiculo === '4x4' ? 'on' : ''}`} onClick={() => handleVeiculo('4x4')}>
                <span className="vi">🚙</span><span className="vl">4x4</span>
              </button>
              <button className={`veh-btn ${formData.veiculo === 'moto' ? 'on' : ''}`} onClick={() => handleVeiculo('moto')}>
                <span className="vi">🏍️</span><span className="vl">Moto</span>
              </button>
              <button className={`veh-btn ${formData.veiculo === 'bike' ? 'on' : ''}`} onClick={() => handleVeiculo('bike')}>
                <span className="vi">🚲</span><span className="vl">Bike</span>
              </button>
            </div>
          </div>

          <button className="btn-wpp" onClick={enviarWpp}>
            💬 Solicitar Orçamento no WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}