import { useState } from 'react';
import { FaPlusCircle, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

export default function Gerenciar({ receitas, adicionarReceita, editarReceita }) {
  const [idEditando, setIdEditando] = useState(null);
  const [erro, setErro] = useState('');

  // Estados do formulário controlado
  const [titulo, setTitulo] = useState('');
  const [criador, setCriador] = useState('Laura (Fundadora)');
  const [tipoCriador, setTipoCriador] = useState('Oficial');
  const [categoria, setCategoria] = useState('Bolos & Tortas');
  const [tempoPreparo, setTempoPreparo] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [temAula, setTemAula] = useState(false);
  const [imagem, setImagem] = useState('');

  function limparFormulario() {
    setIdEditando(null);
    setTitulo('');
    setCriador('Laura (Fundadora)');
    setTipoCriador('Oficial');
    setCategoria('Bolos & Tortas');
    setTempoPreparo('');
    setIngredientes('');
    setModoPreparo('');
    setTemAula(false);
    setImagem('');
    setErro('');
  }

  function carregarParaEdicao(receita) {
    setIdEditando(receita.id);
    setTitulo(receita.titulo);
    setCriador(receita.criador);
    setTipoCriador(receita.tipoCriador);
    setCategoria(receita.categoria);
    setTempoPreparo(receita.tempoPreparo);
    setIngredientes(receita.ingredientes);
    setModoPreparo(receita.modoPreparo);
    setTemAula(receita.temAula);
    setImagem(receita.imagem);
    setErro('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validação básica obrigatória do checklist
    if (!titulo.trim() || !criador.trim() || !tempoPreparo.trim() || !ingredientes.trim() || !modoPreparo.trim()) {
      setErro('Por favor, preencha todos os campos obrigatórios (Título, Criador, Tempo, Ingredientes e Modo de Preparo).');
      return;
    }

    const dadosReceita = {
      titulo: titulo.trim(),
      criador: criador.trim(),
      tipoCriador,
      categoria,
      tempoPreparo: tempoPreparo.trim(),
      ingredientes: ingredientes.trim(),
      modoPreparo: modoPreparo.trim(),
      temAula,
      imagem: imagem.trim() || 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&w=800&q=80'
    };

    if (idEditando) {
      editarReceita(idEditando, dadosReceita);
    } else {
      adicionarReceita(dadosReceita);
    }

    limparFormulario();
  }

  return (
    <div>
      <div className="pagina-livro">
        <h1 style={{ marginBottom: '0.4rem' }}>
          {idEditando ? 'Editar Página do Caderno' : 'Escrever Nova Receita'}
        </h1>
        <p style={{ color: 'var(--texto-suave)', marginBottom: '1.2rem' }}>
          Área exclusiva para a fundadora e criadores parceiros com assinatura ativa publicarem receitas e aulas.
        </p>

        {erro && <div className="erro-msg">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div className="form-grupo">
              <label>Título da Receita *</label>
              <input
                type="text"
                className="input-campo"
                placeholder="Ex: Torta de Limão Siciliano"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div className="form-grupo">
              <label>Perfil da Conta Publicadora *</label>
              <select
                className="select-campo"
                value={tipoCriador}
                onChange={(e) => {
                  const tipo = e.target.value;
                  setTipoCriador(tipo);
                  setCriador(tipo === 'Oficial' ? 'Laura (Fundadora)' : 'Criador Parceiro');
                }}
              >
                <option value="Oficial">Criadora Oficial (Você / Admin)</option>
                <option value="Parceiro">Criador Parceiro (Plano Mensal)</option>
              </select>
            </div>

            <div className="form-grupo">
              <label>Nome do Criador *</label>
              <input
                type="text"
                className="input-campo"
                value={criador}
                onChange={(e) => setCriador(e.target.value)}
              />
            </div>

            <div className="form-grupo">
              <label>Categoria</label>
              <select
                className="select-campo"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Bolos & Tortas">Bolos & Tortas</option>
                <option value="Pães & Salgados">Pães & Salgados</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Doces de Pote">Doces de Pote</option>
              </select>
            </div>

            <div className="form-grupo">
              <label>Tempo de Preparo *</label>
              <input
                type="text"
                className="input-campo"
                placeholder="Ex: 50 min"
                value={tempoPreparo}
                onChange={(e) => setTempoPreparo(e.target.value)}
              />
            </div>

            <div className="form-grupo">
              <label>Link da Foto (opcional)</label>
              <input
                type="text"
                className="input-campo"
                placeholder="https://..."
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
              />
            </div>
          </div>

          <div className="form-grupo">
            <label>Ingredientes *</label>
            <textarea
              rows="3"
              className="textarea-campo"
              placeholder="Liste os ingredientes e medidas..."
              value={ingredientes}
              onChange={(e) => setIngredientes(e.target.value)}
            />
          </div>

          <div className="form-grupo">
            <label>Modo de Preparo *</label>
            <textarea
              rows="4"
              className="textarea-campo"
              placeholder="Explique o passo a passo da receita..."
              value={modoPreparo}
              onChange={(e) => setModoPreparo(e.target.value)}
            />
          </div>

          <div className="form-grupo" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.6rem' }}>
            <input
              type="checkbox"
              id="checkAula"
              checked={temAula}
              onChange={(e) => setTemAula(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <label htmlFor="checkAula" style={{ margin: 0, cursor: 'pointer' }}>
              Esta receita acompanha vídeo-aula exclusiva para assinantes
            </label>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primario">
              {idEditando ? <><FaCheck /> Salvar Alterações</> : <><FaPlusCircle /> Publicar no Caderno</>}
            </button>

            {idEditando && (
              <button type="button" className="btn btn-secundario" onClick={limparFormulario}>
                <FaTimes /> Cancelar Edição
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista rápida para escolher qual receita editar */}
      <div className="pagina-livro">
        <h2 style={{ marginBottom: '1rem' }}>Receitas Publicadas ({receitas.length})</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {receitas.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.8rem 1rem',
                border: '1px solid var(--borda-papel)',
                borderRadius: '8px',
                background: '#fff'
              }}
            >
              <div>
                <strong>{item.titulo}</strong>
                <div style={{ fontSize: '0.85rem', color: 'var(--texto-suave)' }}>
                  {item.criador} • {item.categoria}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-secundario"
                onClick={() => carregarParaEdicao(item)}
              >
                <FaEdit /> Editar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}