import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">AnimalHotels</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Olá, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bem-vindo ao AnimalHotels! 🐾
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sistema completo de gerenciamento para tutores e seus animais de estimação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link
              to="/tutors"
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow border-2 border-transparent hover:border-blue-500"
            >
              <div className="px-6 py-8 text-center">
                <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Gerenciar Tutores</h3>
                <p className="text-gray-600 mb-4">
                  Cadastre e gerencie os tutores dos animais
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  Clique para acessar →
                </div>
              </div>
            </Link>

            <Link
              to="/animals"
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow border-2 border-transparent hover:border-green-500"
            >
              <div className="px-6 py-8 text-center">
                <div className="text-6xl mb-4">🐕🐈</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Gerenciar Animais</h3>
                <p className="text-gray-600 mb-4">
                  Cadastre e gerencie os animais dos tutores
                </p>
                <div className="text-sm text-green-600 font-medium">
                  Clique para acessar →
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Como usar o sistema:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">1️⃣</div>
                <h3 className="font-semibold text-blue-900 mb-2">Cadastre Tutores</h3>
                <p className="text-blue-700 text-sm">
                  Comece cadastrando os tutores que possuem animais
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">2️⃣</div>
                <h3 className="font-semibold text-green-900 mb-2">Adicione Animais</h3>
                <p className="text-green-700 text-sm">
                  Para cada tutor, cadastre seus animais de estimação
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">3️⃣</div>
                <h3 className="font-semibold text-purple-900 mb-2">Gerencie</h3>
                <p className="text-purple-700 text-sm">
                  Edite, visualize e mantenha tudo organizado
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};