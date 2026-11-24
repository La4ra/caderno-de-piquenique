import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBookmark,
  FaRegBookmark,
  FaRetweet,
  FaClock,
  FaVideo,
  FaCrown,
  FaSearch,
  FaBookOpen
} from 'react-icons/fa';

export default function Inicio({ receitas, alternarSalva, alternarRepublicada }) {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [filtroCriador, setFiltroCriador] = useState('Todos');

  // Uso obrigatório do filter() do checklist
  const receitasFiltradas = receitas.filter((receita) => {
    const bateBusca =
      receita.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      receita.criador.toLowerCase().includes(busca.toLowerCase());
    const bateCategoria =
      filtroCategoria === 'Todas' || receita.categoria === filtroCategoria;
    const bateCriador =
      filtroCriador === 'Todos' || receita.tipoCriador === filtroCriador;

    return bateBusca && bateCategoria && bateCriador;
  });

  return (
    <div>
      <div className="pagina-livro">
        <h1 style={{ marginBottom: '0.5rem' }}>Cesta de Receitas & Aulas</h1>
        <p style={{ color: 'var(--texto-suave)' }}>
          Explore receitas autorais da fundadora e de criadores parceiros assinantes. Salve suas favoritas ou republique no seu caderno pessoal.
        </p>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="filtros-barra">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '220px' }}>
          <FaSearch color="var(--texto-suave)" />
          <input
            type="text"
            className="input-campo"
            style={{ width: '100%' }}
            placeholder="Buscar por receita ou criador..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <select
          className="select-campo"
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="Todas">Todas as Categorias</option>
          <option value="Bolos & Tortas">Bolos & Tortas</option>
          <option value="Pães & Salgados">Pães & Salgados</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Doces de Pote">Doces de Pote</option>
        </select>

        <select
          className="select-campo"
          value={filtroCriador}
          onChange={(e) => setFiltroCriador(e.target.value)}
        >
          <option value="Todos">Todos os Criadores</option>
          <option value="Oficial">Criadora Oficial</option>
          <option value="Parceiro">Criadores Parceiros</option>
        </select>
      </div>

      {/* Listagem com map() */}
      {receitasFiltradas.length === 0 ? (
        <div className="pagina-livro" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p>Nenhuma receita encontrada com esses filtros.</p>
        </div>
      ) : (
        <div className="grid-receitas">
          {receitasFiltradas.map((receita) => (
            <div key={receita.id} className="card-receita">
              <img
                src={receita.imagem || 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&w=800&q=80'}
                alt={receita.titulo}
                className="card-img"
              />

              <div className="card-corpo">
                <div className="badges">
                  <span className={`badge ${receita.tipoCriador === 'Oficial' ? 'badge-oficial' : 'badge-parceiro'}`}>
                    <FaCrown /> {receita.tipoCriador === 'Oficial' ? 'Criadora Oficial' : 'Criador Parceiro'}
                  </span>

                  {receita.temAula && (
                    <span className="badge badge-aula">
                      <FaVideo /> Com Aula
                    </span>
                  )}
                </div>

                <h3>{receita.titulo}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--texto-suave)' }}>
                  Por <strong>{receita.criador}</strong> • {receita.categoria}
                </p>

                <p style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FaClock color="var(--vermelho-piquenique)" /> {receita.tempoPreparo}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.8rem', flexWrap: 'wrap' }}>
                  <Link to={`/receita/${receita.id}`} className="btn btn-primario" style={{ flex: 1 }}>
                    <FaBookOpen /> Abrir Página
                  </Link>

                  <button
                    type="button"
                    className="btn btn-secundario"
                    title="Salvar receita"
                    onClick={() => alternarSalva(receita.id)}
                  >
                    {receita.salva ? <FaBookmark color="var(--vermelho-piquenique)" /> : <FaRegBookmark />}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secundario"
                    title="Republicar no meu perfil"
                    onClick={() => alternarRepublicada(receita.id)}
                    style={{
                      backgroundColor: receita.republicada ? '#def7ec' : undefined,
                      color: receita.republicada ? 'var(--verde-folha)' : undefined
                    }}
                  >
                    <FaRetweet />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}