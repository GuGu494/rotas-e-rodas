import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importando as imagens do perfil e dos posts
import fotoEliete from '../../assets/imagens/bike2.jpeg';
import fotoBike from '../../assets/imagens/imagemBike.jpeg';
import fotoMoto from '../../assets/imagens/imagemMoto.jpeg';
import fotoCarro from '../../assets/imagens/imagemCarro.jpeg';

export default function Blog() {
  // Garante que a página sempre comece no topo ao carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Busca os posts do Firebase em tempo real
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Importar funções do Firebase (estas precisam ser importadas no topo também, farei num segundo momento)
    import('firebase/firestore').then(({ collection, onSnapshot, query, orderBy }) => {
      import('../../firebaseConfig').then(({ db }) => {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const curtidasSalvas = JSON.parse(localStorage.getItem('postsCurtidos') || '[]');
          
          const postsFirebase = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            // Formatando a data
            let dataFormatada = 'Recente';
            if (data.createdAt) {
              const date = data.createdAt.toDate();
              dataFormatada = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
            }

            postsFirebase.push({
              id: doc.id,
              categoria: data.categoria,
              autor: data.autor,
              data: dataFormatada,
              tempoLeitura: '4 min de leitura',
              titulo: data.titulo,
              resumo: data.resumo,
              historia: data.historia,
              views: data.views || 0,
              likes: data.likes || 0,
              comentarios: data.comentarios || 0,
              curtido: curtidasSalvas.includes(doc.id),
              imagemCapa: data.imagemCapa
            });
          });
          setPosts(postsFirebase);
          setCarregando(false);
        });
        
        return () => unsubscribe();
      });
    });
  }, []);

  // Função que gerencia o clique no coraçãozinho e salva no banco
  const handleLike = (e, id, curtidoAtual, likesAtuais) => {
    e.preventDefault(); 
    e.stopPropagation(); 

    // Atualiza o localStorage primeiro
    let curtidasSalvas = JSON.parse(localStorage.getItem('postsCurtidos') || '[]');
    if (curtidoAtual) {
      // Se estava curtido, o usuário está "descurtindo"
      curtidasSalvas = curtidasSalvas.filter(postId => postId !== id);
    } else {
      // Se não estava curtido, o usuário está curtindo
      curtidasSalvas.push(id);
    }
    localStorage.setItem('postsCurtidos', JSON.stringify(curtidasSalvas));

    // Atualiza o estado local para parecer instantâneo para o usuário
    setPosts(postsAtuais =>
      postsAtuais.map(post => {
        if (post.id === id) {
          return {
            ...post,
            curtido: !post.curtido,
            likes: post.curtido ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      })
    );

    // Envia a atualização para o Firebase silenciosamente no fundo
    import('firebase/firestore').then(({ doc, updateDoc, increment }) => {
      import('../../firebaseConfig').then(({ db }) => {
        const docRef = doc(db, 'posts', id);
        updateDoc(docRef, {
          likes: curtidoAtual ? increment(-1) : increment(1)
        }).catch(console.error);
      });
    });
  };

  const navigate = useNavigate();

  const handleComentario = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/blog/${id}`);
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: '80px', background: 'var(--creme)', minHeight: '100vh', position: 'relative' }}>
      
      {/* ─── PERFIL DA ELIETE ─── */}
      <section className="sec-pad" style={{ paddingBottom: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'center' }}>
          
          <div style={{ borderRadius: '16px', aspectRatio: '1/1', overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}>
            <img 
              src={fotoEliete} 
              alt="Eliete Bahia" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          
          <div>
            <span style={{ color: 'var(--terra)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Fotografia, Natureza e Superação
            </span>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3rem', color: 'var(--verde)', marginTop: '8px', marginBottom: '16px' }}>
              Conheça a Eliete Bahia
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--pedra)', lineHeight: '1.8', marginBottom: '12px', fontWeight: '300' }}>
              Profissional da área audiovisual e apaixonada pela liberdade, idealizei o <strong>Rotas & Rodas</strong> como um projeto audacioso de documentário fotográfico. O objetivo? Cruzar o Brasil e as Américas capturando a verdadeira essência e história de cada destino.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--pedra)', lineHeight: '1.8', fontWeight: '300' }}>
              Através das minhas lentes e relatos, convido você a acompanhar a experiência de uma mulher desbravando o continente. Seja pilotando nas serras, explorando o off-road, ou sentindo o vento no cicloturismo.
            </p>
          </div>
        </div>
      </section>


      {/* ─── MURAL DE HISTÓRIAS (BLOG) ─── */}
      <section className="sec-pad" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', borderBottom: '1px solid var(--areia2)', paddingBottom: '12px' }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: 'var(--verde)' }}>
              Diário de Bordo
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {posts.map(post => (
              
              <Link 
                to={`/blog/${post.id}`}
                key={post.id} 
                style={{ textDecoration: 'none', background: '#111', color: '#fff', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* ── AQUI ESTÁ A MÁGICA DAS IMAGENS REAIS ── */}
                <div style={{ height: '200px', background: '#222', overflow: 'hidden', borderBottom: '1px solid #333' }}>
                  <img 
                    src={post.imagemCapa} 
                    alt={post.titulo} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--terra)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      📸
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#aaa' }}>
                      <span style={{ color: '#fff', fontWeight: '600' }}>{post.autor}</span> <br/>
                      {post.data} • {post.tempoLeitura}
                    </div>
                  </div>

                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', color: '#fff', marginBottom: '12px', lineHeight: '1.3' }}>
                    {post.titulo}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: '1.6', marginBottom: '24px', flex: 1 }}>
                    {post.resumo}
                  </p>
                  
                  {/* BARRA DE INTERAÇÕES - ESTILO INSTAGRAM */}
                  <div style={{ paddingTop: '16px', color: '#fff' }}>
                    
                    {/* Linha de Ícones */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        
                        {/* Ícone de Curtir (Coração) */}
                        <div 
                          onClick={(e) => handleLike(e, post.id, post.curtido, post.likes)} 
                          style={{ cursor: 'pointer', transform: post.curtido ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.2s', display: 'flex', alignItems: 'center' }}
                        >
                          <svg viewBox="0 0 24 24" fill={post.curtido ? "#ed4956" : "none"} stroke={post.curtido ? "#ed4956" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '26px', height: '26px'}}>
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </div>

                        {/* Ícone de Comentar (Balãozinho) */}
                        <div 
                          onClick={(e) => handleComentario(e, post.id)} 
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#fff', transition: 'opacity 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '26px', height: '26px'}}>
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                          </svg>
                        </div>

                      </div>

                      {/* Ícone de Visualizações (Olho) na direita */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '0.9rem' }} title={`${post.views} visualizações`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '24px', height: '24px'}}>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <span>{post.views}</span>
                      </div>
                    </div>

                    {/* Textos de curtidas e comentários */}
                    <div style={{ fontSize: '0.95rem' }}>
                      <p style={{ fontWeight: 'bold', margin: '0 0 6px 0', color: '#fff' }}>
                        {post.likes} curtida{post.likes !== 1 && 's'}
                      </p>
                      
                      {post.comentarios > 0 ? (
                        <p 
                          onClick={(e) => handleComentario(e, post.id)} 
                          style={{ margin: 0, color: '#888', cursor: 'pointer' }}
                        >
                          Ver {post.comentarios === 1 ? 'o único comentário' : `todos os ${post.comentarios} comentários`}
                        </p>
                      ) : (
                        <p 
                          onClick={(e) => handleComentario(e, post.id)} 
                          style={{ margin: 0, color: '#888', cursor: 'pointer' }}
                        >
                          Seja o primeiro a comentar
                        </p>
                      )}
                    </div>

                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPLORE NOSSAS AVENTURAS (VÍDEOS) ─── */}
      <section className="sec-pad" style={{ background: '#fff', padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3rem', color: 'var(--verde)', marginBottom: '16px' }}>
              Explore Nossas Aventuras
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--cinza)', maxWidth: '700px', lineHeight: '1.7', fontWeight: '300' }}>
              Acompanhe nossa jornada em tempo real. Desde expedições solo de bicicleta até travessias épicas de moto e descobrimentos em 4x4, cada quilômetro é uma nova história para contar à nossa comunidade.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', marginBottom: '48px' }}>
            {/* Vídeo 1: TR4 MotorHome (do site original) */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(26,51,40,0.1)', aspectRatio: '16/9' }}>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/rlwF3UlCwOY?vq=hd1080" 
                title="TR4 MotorHome - Rotas e Rodas" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ display: 'block' }}
              ></iframe>
            </div>

            {/* Vídeo 2: Playlist da Eliete */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(26,51,40,0.1)', aspectRatio: '16/9' }}>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/videoseries?list=PLJLfMaH8hq7VTmoefDvmZq4EEdMCOAM9m&vq=hd1080" 
                title="Playlist de Aventuras - Rotas e Rodas" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ display: 'block' }}
              ></iframe>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a 
              href="https://www.youtube.com/@rotaserodas_br" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-prim" 
              style={{ textDecoration: 'none', padding: '16px 48px', fontSize: '1.05rem' }}
            >
              ▶ Ver Canal no YouTube
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}