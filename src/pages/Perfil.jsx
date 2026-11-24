import { Link } from 'react-router-dom';
import { FaBookmark, FaRetweet, FaCrown, FaUserCheck, FaBookOpen } from 'react-icons/fa';

export default function Perfil({ receitas }) {
  const receitasSalvas = receitas.filter((r) => r.salva);
  const receitasRepublicadas = receitas.filter((r) => r.republicada);

  return (
    <div>
      <div className="pagina-livro">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>Meu Caderno Pessoal</h1>
            <p style={{ color: 'var(--texto-suave)' }}>
              Gerencie as receitas que você salvou, suas republicações e os criadores que acompanha.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-oficial">
              <FaCrown /> Fundadora & Criadora
            </span>
            <span className="badge badge-aula">
              <FaUserCheck /> Acesso Total às Aulas
            </span>
          </div>
        </div>
      </div>

      {/* Receitas Salvas */}
      <div className="pagina-livro">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <FaBookmark color="var(--vermelho-piquenique)" /> Receitas Salvas ({receitasSalvas.length})
        </h2>

        {receitasSalvas.length === 0 ? (
          <p style={{ color: 'var(--texto-suave)' }}>Você ainda não salvou nenhuma receita.</p>
        ) : (
          <div className="grid-receitas">
            {receitasSalvas.map((receita) => (
              <div key={receita.id} className="card-receita">
                <div className="card-corpo">
                  <h3>{receita.titulo}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--texto-suave)' }}>
                    Por {receita.criador} • {receita.categoria}
                  </p>
                  <Link to={`/receita/${receita.id}`} className="btn btn-primario" style={{ marginTop: '0.6rem' }}>
                    <FaBookOpen /> Ler Receita
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Receitas Republicadas */}
      <div className="pagina-livro">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <FaRetweet color="var(--verde-folha)" /> Minhas Republicações ({receitasRepublicadas.length})
        </h2>

        {receitasRepublicadas.length === 0 ? (
          <p style={{ color: 'var(--texto-suave)' }}>Você ainda não republicou nenhuma receita.</p>
        ) : (
          <div className="grid-receitas">
            {receitasRepublicadas.map((receita) => (
              <div key={receita.id} className="card-receita">
                <div className="card-corpo">
                  <h3>{receita.titulo}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--texto-suave)' }}>
                    Original de {receita.criador}
                  </p>
                  <Link to={`/receita/${receita.id}`} className="btn btn-secundario" style={{ marginTop: '0.6rem' }}>
                    <FaBookOpen /> Ver Página
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}