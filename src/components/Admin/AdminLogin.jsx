import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    
    if(!email || !senha) {
      setErro("Por favor, preencha email e senha.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
      setErro("E-mail ou senha incorretos.");
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--creme)'
    }}>
      <div className="admin-login-box" style={{
        background: '#fff',
        padding: '48px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(26,51,40,0.08)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            width: '64px', height: '64px', background: 'var(--terra)', 
            borderRadius: '50%', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.8rem' 
          }}>
            🔐
          </div>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '2.2rem', marginBottom: '8px' }}>
            Painel Restrito
          </h2>
          <p style={{ color: 'var(--cinza)', fontSize: '0.9rem' }}>Acesso exclusivo para Eliete Bahia</p>
        </div>

        {erro && <div style={{ background: '#ffeeee', color: '#cc0000', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>{erro}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '16px', borderRadius: '8px', border: '1px solid var(--areia2)',
              fontSize: '1rem', color: 'var(--pedra)', outline: 'none'
            }}
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              padding: '16px', borderRadius: '8px', border: '1px solid var(--areia2)',
              fontSize: '1rem', color: 'var(--pedra)', outline: 'none'
            }}
          />
          <button 
            type="submit" 
            className="btn-prim" 
            style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
          >
            Entrar no Sistema
          </button>
        </form>
        
        <div style={{ marginTop: '32px' }}>
          <a href="/" style={{ color: 'var(--cinza)', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Voltar para o site
          </a>
        </div>
      </div>
      <style>{`
        @media(max-width:600px){
          .admin-login-box { padding: 32px 24px !important; margin: 0 16px; }
        }
      `}</style>
    </div>
  );
}
