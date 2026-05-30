import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

// IMPORTANTE: Importar as imagens aqui também para a tela de leitura escura!
import fotoBike from '../../assets/imagens/imagemBike.jpeg';
import fotoMoto from '../../assets/imagens/imagemMoto.jpeg';
import fotoCarro from '../../assets/imagens/imagemCarro.jpeg';

export default function BlogPost() {
  const { id } = useParams();
  const viewContada = useRef(false);

  // Garante que a tela carregue sempre no topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [post, setPost] = useState(null);
  const [carregando, setCarregando] = useState(true);
  
  // Estados para Comentários
  const [comentariosLista, setComentariosLista] = useState([]);
  const [nome, setNome] = useState('');
  const [novoComentario, setNovoComentario] = useState('');
  const [enviandoComentario, setEnviandoComentario] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    import('firebase/firestore').then(({ doc, getDoc, updateDoc, increment, collection, onSnapshot, query, orderBy }) => {
      import('../../firebaseConfig').then(({ db }) => {
        // Busca do Post Principal
        const docRef = doc(db, 'posts', id);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            
            let dataFormatada = 'Recente';
            if (data.createdAt) {
              const date = data.createdAt.toDate();
              dataFormatada = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
            }

            setPost({
              id: docSnap.id,
              ...data,
              data: dataFormatada,
              tempoLeitura: '4 min de leitura'
            });

            // Incrementa as visualizações
            if (!viewContada.current) {
              viewContada.current = true;
              const viewsSalvas = JSON.parse(localStorage.getItem('postsLidos') || '[]');
              if (!viewsSalvas.includes(id)) {
                updateDoc(docRef, { views: increment(1) }).catch(console.error);
                viewsSalvas.push(id);
                localStorage.setItem('postsLidos', JSON.stringify(viewsSalvas));
              }
            }
          }
          setCarregando(false);
        });

        // Escuta os comentários em tempo real
        const comentariosRef = collection(db, `posts/${id}/comentarios`);
        const qComentarios = query(comentariosRef, orderBy('data', 'asc'));
        
        const unsubscribeComentarios = onSnapshot(qComentarios, (snapshot) => {
          const comentariosArray = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            let dataFormatada = 'Agora mesmo';
            if(data.data) {
              dataFormatada = data.data.toDate().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
            }
            comentariosArray.push({ id: doc.id, ...data, dataFormatada });
          });
          setComentariosLista(comentariosArray);
        });

        return () => unsubscribeComentarios();
      });
    });
  }, [id]);

  const handleEnviarComentario = async (e) => {
    e.preventDefault();
    if (!nome.trim() || !novoComentario.trim()) {
      alert("Por favor, preencha o seu nome e o seu comentário.");
      return;
    }

    setEnviandoComentario(true);
    
    try {
      const { db } = await import('../../firebaseConfig');
      const { collection, addDoc, serverTimestamp, doc, updateDoc, increment } = await import('firebase/firestore');
      
      // 1. Salva o comentário na subcoleção
      await addDoc(collection(db, `posts/${id}/comentarios`), {
        nome,
        texto: novoComentario,
        data: serverTimestamp()
      });

      // 2. Incrementa o contador total de comentários no post principal
      await updateDoc(doc(db, 'posts', id), {
        comentarios: increment(1)
      });

      // 3. Limpa o form (mas pode manter o nome se a pessoa quiser comentar de novo)
      setNovoComentario('');
      
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar o comentário.");
    } finally {
      setEnviandoComentario(false);
    }
  };

  if (carregando) {
    return <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#eaeaea', paddingTop: '150px', textAlign: 'center', fontSize: '1.2rem' }}>Carregando diário...</div>;
  }

  if (!post) {
    return (
      <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#eaeaea', paddingTop: '150px', textAlign: 'center' }}>
        <h2>História não encontrada.</h2>
        <Link to="/blog" style={{ color: 'var(--terra)', textDecoration: 'none' }}>Voltar para o Diário</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#eaeaea', paddingTop: '100px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Botão de Voltar */}
        <Link to="/blog" style={{ color: 'var(--terra)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block', marginBottom: '32px', fontWeight: '600' }}>
          ← Voltar para o Diário de Bordo
        </Link>

        {/* Meta Header (Autor, Data, Tempo) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--terra)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            📸
          </div>
          <div style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: '500' }}>
            <span style={{ color: '#fff', fontWeight: '600' }}>{post.autor}</span> • {post.data} • {post.tempoLeitura}
          </div>
        </div>

        {/* Título Principal */}
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3.2rem', color: '#fff', lineHeight: '1.1', marginBottom: '24px' }}>
          {post.titulo}
        </h1>

        {/* IMAGEM PRINCIPAL DINÂMICA FUNCIONANDO! */}
        <div style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <img 
            src={post.imagemCapa} 
            alt={post.titulo} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#777', fontWeight: '600', marginBottom: '48px' }}>
          {post.categoria}
        </p>

        {/* História Completa (substitui os tópicos falsos) */}
        <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc', marginBottom: '80px', fontWeight: '300' }}>
          {post.historia}
        </div>

        {/* ─── SEÇÃO DE COMENTÁRIOS ─── */}
        <div style={{ borderTop: '1px solid #333', paddingTop: '40px' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: '#fff', marginBottom: '32px' }}>
            Comentários ({post.comentarios || 0})
          </h2>

          {/* Lista de Comentários */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
            {comentariosLista.length === 0 ? (
              <p style={{ color: '#777', fontStyle: 'italic' }}>Ninguém comentou ainda. Seja o primeiro a compartilhar o que achou!</p>
            ) : (
              comentariosLista.map(comentario => (
                <div key={comentario.id} style={{ background: '#151515', padding: '24px', borderRadius: '12px', borderLeft: '3px solid var(--terra)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                    <h4 style={{ color: '#fff', margin: 0, fontSize: '1.1rem' }}>{comentario.nome}</h4>
                    <span style={{ color: '#777', fontSize: '0.8rem' }}>{comentario.dataFormatada}</span>
                  </div>
                  <p style={{ color: '#ccc', margin: 0, lineHeight: '1.6', fontSize: '0.95rem' }}>{comentario.texto}</p>
                </div>
              ))
            )}
          </div>

          {/* Formulário para Novo Comentário */}
          <div style={{ background: '#111', padding: '32px', borderRadius: '16px' }}>
            <h3 style={{ color: '#fff', marginBottom: '24px', fontSize: '1.3rem' }}>Deixe seu comentário</h3>
            <form onSubmit={handleEnviarComentario} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Seu Nome</label>
                <input 
                  type="text" 
                  placeholder="Como quer ser chamado?"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={{ background: '#222', border: '1px solid #333', color: '#fff', padding: '16px', borderRadius: '8px', outline: 'none' }}
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Comentário</label>
                <textarea 
                  rows="4"
                  placeholder="O que achou dessa história?"
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                  style={{ background: '#222', border: '1px solid #333', color: '#fff', padding: '16px', borderRadius: '8px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button 
                type="submit" 
                disabled={enviandoComentario}
                style={{ 
                  background: 'var(--terra)', color: '#fff', border: 'none', padding: '16px', 
                  borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', 
                  marginTop: '8px', opacity: enviandoComentario ? 0.7 : 1
                }}
              >
                {enviandoComentario ? 'Enviando...' : 'Publicar Comentário'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}