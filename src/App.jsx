import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { FaUtensils, FaPlusCircle, FaUserCircle, FaBook } from 'react-icons/fa';

import { receitasIniciais, adendosIniciais } from './data/receitasIniciais';
import Inicio from './pages/Inicio';
import Gerenciar from './pages/Gerenciar';
import DetalhesReceita from './pages/DetalhesReceita';
import Perfil from './pages/Perfil';

export default function App() {
  const [receitas, setReceitas] = useState(receitasIniciais);
  const [adendos, setAdendos] = useState(adendosIniciais);

  // CREATE: Adicionar nova receita
  function adicionarReceita(novaReceita) {
    const registro = {
      ...novaReceita,
      id: Date.now(),
      salva: false,
      republicada: false
    };
    setReceitas([registro, ...receitas]);
  }

  // UPDATE: Editar receita existente usando spread operator
  function editarReceita(id, dadosAtualizados) {
    setReceitas(
      receitas.map((item) =>
        item.id === id ? { ...item, ...dadosAtualizados } : item
      )
    );
  }

  // UPDATE: Alternar status de salva
  function alternarSalva(id) {
    setReceitas(
      receitas.map((item) =>
        item.id === id ? { ...item, salva: !item.salva } : item
      )
    );
  }

  // UPDATE: Alternar status de republicada
  function alternarRepublicada(id) {
    setReceitas(
      receitas.map((item) =>
        item.id === id ? { ...item, republicada: !item.republicada } : item
      )
    );
  }

  // DELETE: Excluir receita
  function excluirReceita(id) {
    setReceitas(receitas.filter((item) => item.id !== id));
    setAdendos(adendos.filter((a) => a.receitaId !== id));
  }

  // CREATE: Adicionar adendo (comentário até 300 caracteres)
  function adicionarAdendo(novoAdendo) {
    const registro = {
      ...novoAdendo,
      id: Date.now()
    };
    setAdendos([registro, ...adendos]);
  }

  // DELETE: Excluir adendo
  function excluirAdendo(id) {
    setAdendos(adendos.filter((a) => a.id !== id));
  }

  return (
    <BrowserRouter>
      <header className="navbar">
        <NavLink to="/" className="navbar-logo">
          <FaUtensils />
          <span className="fonte-livro">Caderno de Piquenique</span>
        </NavLink>

        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'ativo' : ''}`}>
            <FaBook /> Receitas
          </NavLink>

          <NavLink to="/gerenciar" className={({ isActive }) => `nav-link ${isActive ? 'ativo' : ''}`}>
            <FaPlusCircle /> Painel Criador
          </NavLink>

          <NavLink to="/perfil" className={({ isActive }) => `nav-link ${isActive ? 'ativo' : ''}`}>
            <FaUserCircle /> Meu Perfil
          </NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Inicio
                receitas={receitas}
                alternarSalva={alternarSalva}
                alternarRepublicada={alternarRepublicada}
              />
            }
          />
          <Route
            path="/gerenciar"
            element={
              <Gerenciar
                receitas={receitas}
                adicionarReceita={adicionarReceita}
                editarReceita={editarReceita}
              />
            }
          />
          <Route
            path="/receita/:id"
            element={
              <DetalhesReceita
                receitas={receitas}
                excluirReceita={excluirReceita}
                alternarSalva={alternarSalva}
                alternarRepublicada={alternarRepublicada}
                adendos={adendos}
                adicionarAdendo={adicionarAdendo}
                excluirAdendo={excluirAdendo}
              />
            }
          />
          <Route
            path="/perfil"
            element={<Perfil receitas={receitas} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}