import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db, auth } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // Estados de segurança
  const [autenticando, setAutenticando] = useState(true);
  
  // Estados para o formulário do novo post
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [resumo, setResumo] = useState('');
  const [historia, setHistoria] = useState('');
  const [imagemFile, setImagemFile] = useState(null);
  const [salvando, setSalvando] = useState(false);

  // Estado para listar os posts e poder excluir
  const [postsRecentes, setPostsRecentes] = useState([]);

  // Verificação de Segurança e Busca de Posts
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAutenticando(false);
      } else {
        navigate('/admin');
      }
    });

    // Busca os posts para listar no painel
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribePosts = onSnapshot(q, (snapshot) => {
      const posts = [];
      snapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setPostsRecentes(posts);
    });

    return () => {
      unsubscribeAuth();
      unsubscribePosts();
    };
  }, [navigate]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImagemFile(e.target.files[0]);
    }
  };

  const handlePublicar = async (e) => {
    e.preventDefault();
    if(!titulo || !categoria || !resumo || !historia || !imagemFile) {
      alert("Por favor, preencha todos os campos e selecione uma imagem!");
      return;
    }
    
    setSalvando(true);
    
    try {
      // 1. Fazer o upload da imagem pro ImgBB (Servidor gratuito sem cartão)
      const formData = new FormData();
      formData.append('image', imagemFile);
      
      // COLOQUE A SUA CHAVE DO IMGBB AQUI! (explicarei no chat como pegar)
      const IMGBB_API_KEY = '40df8fc7f36aa32e8b7c0216008f7f9b'; 
      
      const imgResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });
      
      const imgData = await imgResponse.json();
      
      if (!imgData.success) {
        throw new Error("Falha ao subir a imagem para o servidor gratuito.");
      }
      
      const imagemCapaUrl = imgData.data.url;

      // 2. Salvar os dados textuais e o link da imagem no Firestore
      await addDoc(collection(db, 'posts'), {
        titulo,
        categoria,
        resumo,
        historia,
        autor: 'Eliete Bahia',
        imagemCapa: imagemCapaUrl,
        likes: 0,
        views: 0,
        comentarios: 0,
        createdAt: serverTimestamp()
      });
      
      alert("Post publicado com sucesso!");
      
      // Limpar o form
      setTitulo('');
      setCategoria('');
      setResumo('');
      setHistoria('');
      setImagemFile(null);
    } catch (error) {
      console.error("ERRO:", error);
      alert(`Erro ao publicar: ${error.message}\n\nDica: Você já colocou a chave do ImgBB no código?`);
    } finally {
      setSalvando(false);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja apagar esta publicação definitivamente?");
    if(confirmar) {
      try {
        await deleteDoc(doc(db, 'posts', id));
        alert("Publicação apagada.");
      } catch (error) {
        console.error(error);
        alert("Erro ao apagar publicação.");
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  if (autenticando) {
    return <div style={{ minHeight: '100vh', background: 'var(--creme)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Validando acesso...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--creme)', paddingBottom: '80px' }}>
      {/* HEADER DO ADMIN */}
      <header style={{ background: 'var(--verde)', padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--areia)', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.95rem' }}>
            ← Voltar para o Site
          </Link>
          <div style={{ color: 'var(--areia)', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 'bold', borderLeft: '1px solid rgba(240,235,224,0.3)', paddingLeft: '24px' }}>
            Rotas & Rodas | Painel
          </div>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <span style={{ color: 'rgba(240,235,224,0.7)', fontSize: '0.9rem' }}>Olá, Eliete!</span>
          <button 
            onClick={handleLogout}
            style={{ 
              background: 'transparent', border: '1px solid rgba(240,235,224,0.3)', 
              color: 'var(--areia)', padding: '8px 16px', borderRadius: '50px', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            Sair
          </button>
        </div>
      </header>

      {/* ÁREA DE POSTAGEM */}
      <main style={{ maxWidth: '800px', margin: '48px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--terra)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>✍️</div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '2.5rem' }}>
            Nova Publicação
          </h1>
        </div>

        <form onSubmit={handlePublicar} style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(26,51,40,0.05)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* UPLOAD DE IMAGEM */}
          <label style={{ border: '2px dashed var(--areia2)', borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer', background: 'var(--creme)', display: 'block' }}>
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/webp" 
              onChange={handleImageChange} 
              style={{ display: 'none' }} 
            />
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📸</div>
            {imagemFile ? (
              <p style={{ color: 'var(--verde)', margin: 0, fontWeight: 'bold' }}>Imagem selecionada: {imagemFile.name}</p>
            ) : (
              <>
                <p style={{ color: 'var(--cinza)', margin: 0, fontWeight: '500' }}>Clique para selecionar a foto principal</p>
                <p style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '4px' }}>PNG, JPG ou WEBP</p>
              </>
            )}
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--pedra)', fontSize: '0.9rem', fontWeight: '600' }}>Título da Aventura</label>
              <input 
                type="text" 
                placeholder="Ex: Travessia do Jalapão 4x4" 
                value={titulo} onChange={(e) => setTitulo(e.target.value)}
                style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--areia2)', outline: 'none', fontSize: '1rem' }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--pedra)', fontSize: '0.9rem', fontWeight: '600' }}>Categoria</label>
              <select 
                value={categoria} onChange={(e) => setCategoria(e.target.value)}
                style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--areia2)', outline: 'none', fontSize: '1rem', background: '#fff' }}
              >
                <option value="">Selecione...</option>
                <option value="Bicicleta">Bicicleta</option>
                <option value="Motocicleta">Motocicleta</option>
                <option value="4x4">Carro 4x4</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--pedra)', fontSize: '0.9rem', fontWeight: '600' }}>Resumo (Aparece na capa do Blog)</label>
            <textarea 
              rows="2"
              placeholder="Uma breve frase sobre como foi essa jornada..." 
              value={resumo} onChange={(e) => setResumo(e.target.value)}
              style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--areia2)', outline: 'none', fontSize: '1rem', resize: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--pedra)', fontSize: '0.9rem', fontWeight: '600' }}>História Completa</label>
            <textarea 
              rows="8"
              placeholder="Conte todos os detalhes da aventura, os desafios, o que aprendeu..." 
              value={historia} onChange={(e) => setHistoria(e.target.value)}
              style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--areia2)', outline: 'none', fontSize: '1rem', resize: 'vertical' }}
            />
          </div>

          <button type="submit" disabled={salvando} className="btn-prim" style={{ padding: '20px', fontSize: '1.1rem', justifyContent: 'center', marginTop: '16px', opacity: salvando ? 0.7 : 1 }}>
            {salvando ? 'Salvando imagem e publicando...' : 'Publicar no Diário de Bordo'}
          </button>
        </form>

        {/* ÁREA DE GERENCIAMENTO DE POSTS */}
        <div style={{ marginTop: '80px' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--verde)', fontSize: '2rem', marginBottom: '24px' }}>
            Gerenciar Publicações
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {postsRecentes.length === 0 ? (
              <p style={{ color: 'var(--cinza)' }}>Nenhuma publicação feita ainda.</p>
            ) : (
              postsRecentes.map(post => (
                <div key={post.id} style={{ background: '#fff', border: '1px solid var(--areia2)', borderRadius: '12px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ color: 'var(--pedra)', fontSize: '1.1rem', marginBottom: '4px' }}>{post.titulo}</h3>
                    <p style={{ color: 'var(--cinza)', fontSize: '0.85rem' }}>Categoria: {post.categoria}</p>
                  </div>
                  <button 
                    onClick={() => handleExcluir(post.id)}
                    style={{ background: '#ffeded', color: '#cc0000', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Excluir
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
