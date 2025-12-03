import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-wrapper">

   
      <nav className="dashboard-navbar">
        <h1 className="dashboard-navbar-title">AnimalHotels</h1>

        <div className="dashboard-user">
          <span>Olá, {user?.name}</span>
          <button onClick={logout} className="dashboard-logout">
            Sair
          </button>
        </div>
      </nav>

    
      <main className="dashboard-main">

        <header className="dashboard-header">
          <h1 className="dashboard-header-title">
            Bem-vindo ao AnimalHotels! 🐾
          </h1>
          <p className="dashboard-header-subtitle">
            Sistema completo de gerenciamento para tutores e seus animais de estimação.
          </p>
        </header>

 
        <div className="dashboard-cards">

          <Link to="/tutors" className="dashboard-card">
            <div className="dashboard-card-icon">👨‍👩‍👧‍👦</div>
            <h3 className="dashboard-card-title">Gerenciar Tutores</h3>
            <p className="dashboard-card-description">
              Cadastre e gerencie os tutores dos animais
            </p>
            <div className="dashboard-card-cta">
              Clique para acessar →
            </div>
          </Link>

          <Link to="/animals" className="dashboard-card">
            <div className="dashboard-card-icon">🐕🐈</div>
            <h3 className="dashboard-card-title">Gerenciar Animais</h3>
            <p className="dashboard-card-description">
              Cadastre e gerencie os animais dos tutores
            </p>
            <div className="dashboard-card-cta">
              Clique para acessar →
            </div>
          </Link>

        </div>

        <section className="dashboard-steps">
          <h2 className="dashboard-steps-title">Como usar o sistema:</h2>

          <div className="dashboard-steps-grid">

            <div className="dashboard-step-card" style={{ background: '#e0edff' }}>
              <div className="dashboard-step-number">1️⃣</div>
              <h3 className="dashboard-step-title">Cadastre Tutores</h3>
              <p className="dashboard-step-text">
                Comece cadastrando os tutores que possuem animais
              </p>
            </div>

            <div className="dashboard-step-card" style={{ background: '#e7f9ed' }}>
              <div className="dashboard-step-number">2️⃣</div>
              <h3 className="dashboard-step-title">Adicione Animais</h3>
              <p className="dashboard-step-text">
                Para cada tutor, cadastre seus animais de estimação
              </p>
            </div>

            <div className="dashboard-step-card" style={{ background: '#f2e7ff' }}>
              <div className="dashboard-step-number">3️⃣</div>
              <h3 className="dashboard-step-title">Gerencie</h3>
              <p className="dashboard-step-text">
                Edite, visualize e mantenha tudo organizado
              </p>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};
