import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaTrash,
  FaBookmark,
  FaRegBookmark,
  FaRetweet,
  FaVideo,
  FaCrown,
  FaCommentDots
} from 'react-icons/fa';

export default function DetalhesReceita({
  receitas,
  excluirReceita,
  alternarSalva,
  alternarRepublicada,
  adendos,
  adicionarAdendo,
  excluirAdendo
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const receita = receitas.find((item) => item.id === Number(id));
  const adendosDaReceita = adendos.filter((a) => a.receitaId === Number(id));

  const [autorAdendo, setAutorAdendo] = useState('');
  const [textoAdendo, setTextoAdendo] = useState('');
  const [erroAdendo, setErroAdendo] = useState('');

  if (!receita) {
    return (
      <div className="pagina-livro" style={{ textAlign: 'center' }}>
        <h2>Página não encontrada no caderno</h2>
        <p style={{ margin: '1rem 0' }}>Esta receita pode ter sido removida.</p>
        <Link to="/" className="btn btn-primario">
          <FaArrowLeft /> Voltar para o início
        </Link>
      </div>
    );
  }

  function handleExcluirReceita() {
    excluirReceita(receita.id);
    navigate('/');
  }

  function handlePublicarAdendo(e) {
    e.preventDefault();

    if (!autorAdendo.trim() || !textoAdendo.trim()) {
      setErroAdendo('Informe seu nome e escreva o adendo da receita.');
      return;
    }

    if (textoAdendo.length > 300) {
      setErroAdendo('O adendo deve ter no máximo 300 caracteres.');
      return;
    }

    adicionarAdendo({
      receitaId: receita.id,
      autor: autorAdendo.trim(),
      mencaoReceita: receita.titulo,
      texto: textoAdendo.trim()
    });

    setAutorAdendo('');
    setTextoAdendo('');
    setErroAdendo('');
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" className="btn btn-secundario">
          <FaArrowLeft /> Voltar à Cesta de Receitas
        </Link>
      </div>

      <div className="pagina-livro">
        <img
          src={receita.imagem}
          alt={receita.titulo}
          style={{
            width: '100%',
            maxHeight: '320px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginBottom: '1.2rem',
            border: '2px dashed var(--borda-papel)'
          }}
        />

        <div className="badges" style={{ marginBottom: '0.8rem' }}>
          <span className={`badge ${receita.tipoCriador === 'Oficial' ? 'badge-oficial' : 'badge-parceiro'}`}>
            <FaCrown /> {receita.tipoCriador === 'Oficial' ? 'Criadora Oficial' : 'Criador Parceiro'}
          </span>
          <span className="badge" style={{ background: '#f3e8d8' }}>
            {receita.categoria} • {receita.tempoPreparo}
          </span>
          {receita.temAula && (
            <span className="badge badge-aula">
              <FaVideo /> Aula Disponível
            </span>
          )}
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{receita.titulo}</h1>
        <p style={{ color: 'var(--texto-suave)', marginBottom: '1.2rem' }}>
          Escrita por <strong>{receita.criador}</strong>
        </p>

        {/* Ações da Receita */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <button type="button" className="btn btn-secundario" onClick={() => alternarSalva(receita.id)}>
            {receita.salva ? <><FaBookmark color="var(--vermelho-piquenique)" /> Salva no Caderno</> : <><FaRegBookmark /> Salvar Receita</>}
          </button>

          <button
            type="button"
            className="btn btn-secundario"
            onClick={() => alternarRepublicada(receita.id)}
            style={{
              backgroundColor: receita.republicada ? '#def7ec' : undefined,
              color: receita.republicada ? 'var(--verde-folha)' : undefined
            }}
          >
            <FaRetweet /> {receita.republicada ? 'Republicada no Perfil' : 'Republicar'}
          </button>

          <button type="button" className="btn btn-perigo" onClick={handleExcluirReceita} style={{ marginLeft: 'auto' }}>
            <FaTrash /> Excluir Receita
          </button>
        </div>

        {/* Bloco de Vídeo-Aula */}
        {receita.temAula && (
          <div
            style={{
              backgroundColor: '#def7ec',
              border: '1.5px solid #84e1bc',
              borderRadius: '10px',
              padding: '1rem 1.2rem',
              marginBottom: '1.5rem'
            }}
          >
            <h3 style={{ color: 'var(--verde-folha)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <FaVideo /> Aula Prática Inclusa
            </h3>
            <p style={{ fontSize: '0.9rem' }}>
              Assinantes têm acesso ao passo a passo em vídeo desta receita gravado por <strong>{receita.criador}</strong>.
            </p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h3 style={{ marginBottom: '0.6rem', borderBottom: '2px dashed var(--borda-papel)', paddingBottom: '0.3rem' }}>
              Ingredientes
            </h3>
            <p style={{ lineHeight: '1.6' }}>{receita.ingredientes}</p>
          </div>

          <div>
            <h3 style={{ marginBottom: '0.6rem', borderBottom: '2px dashed var(--borda-papel)', paddingBottom: '0.3rem' }}>
              Modo de Preparo
            </h3>
            <p style={{ lineHeight: '1.6' }}>{receita.modoPreparo}</p>
          </div>
        </div>
      </div>

      {/* Seção de Adendos / Comentários (máx. 300 caracteres com menção à receita) */}
      <div className="pagina-livro">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <FaCommentDots color="var(--verde-folha)" /> Adendos & Notas da Comunidade ({adendosDaReceita.length})
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--texto-suave)', marginBottom: '1.2rem' }}>
          Todo comentário menciona automaticamente <strong>"{receita.titulo}"</strong> e funciona como uma dica adicional (limite de 300 caracteres).
        </p>

        {erroAdendo && <div className="erro-msg">{erroAdendo}</div>}

        <form onSubmit={handlePublicarAdendo} style={{ marginBottom: '1.5rem' }}>
          <div className="form-grupo">
            <label>Seu Nome (Leitor / Assinante)</label>
            <input
              type="text"
              className="input-campo"
              placeholder="Ex: Juliana (Assinante)"
              value={autorAdendo}
              onChange={(e) => setAutorAdendo(e.target.value)}
            />
          </div>

          <div className="form-grupo">
            <label>
              Seu Adendo mencionando "{receita.titulo}" ({textoAdendo.length}/300 caracteres)
            </label>
            <textarea
              rows="3"
              maxLength={300}
              className="textarea-campo"
              placeholder={`Sobre "${receita.titulo}": escreva uma variação, substituição de ingrediente ou dica extra...`}
              value={textoAdendo}
              onChange={(e) => setTextoAdendo(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-verde">
            Publicar Adendo
          </button>
        </form>

        {adendosDaReceita.length === 0 ? (
          <p style={{ color: 'var(--texto-suave)', fontStyle: 'italic' }}>
            Nenhum adendo publicado para esta receita ainda. Seja o primeiro a deixar uma dica!
          </p>
        ) : (
          adendosDaReceita.map((adendo) => (
            <div key={adendo.id} className="adendo-card">
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--verde-folha)', fontWeight: '700', marginBottom: '0.2rem' }}>
                  Menção à receita: @{adendo.mencaoReceita}
                </div>
                <strong>{adendo.autor}:</strong> <span>{adendo.texto}</span>
              </div>

              <button
                type="button"
                className="btn btn-perigo"
                title="Remover adendo"
                onClick={() => excluirAdendo(adendo.id)}
                style={{ padding: '0.4rem 0.6rem' }}
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}