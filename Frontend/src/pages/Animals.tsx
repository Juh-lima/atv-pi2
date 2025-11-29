import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAnimals } from '../hooks/useAnimals';
import { useTutors } from '../hooks/useTutors';
import { AnimalForm } from '../components/AnimalForm.tsx';
import type { Animal} from '../types/index.ts';

export const Animals: React.FC = () => {
  const { logout } = useAuth();
  const { animals, fetchAnimals, createAnimal, editAnimal, removeAnimal } = useAnimals();
  const { tutors, fetchTutors } = useTutors();
  const [showForm, setShowForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnimals();
    fetchTutors();
  }, [fetchAnimals, fetchTutors]);

  const handleCreateAnimal = async (animalData: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      await createAnimal(animalData);
      setShowForm(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEditAnimal = async (animalData: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingAnimal) return;
    
    setLoading(true);
    try {
      await editAnimal(editingAnimal.id, animalData);
      setEditingAnimal(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnimal = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este animal?')) {
      await removeAnimal(id);
    }
  };

  const getTutorName = (tutorId: string): string => {
    const tutor = tutors.find(t => t.id === tutorId);
    return tutor ? tutor.name : 'Tutor não encontrado';
  };

  const getSpeciesLabel = (species: 'cat' | 'dog'): string => {
    return species === 'dog' ? 'Cachorro' : 'Gato';
  };

  const getSpeciesIcon = (species: 'cat' | 'dog'): string => {
    return species === 'dog' ? '🐕' : '🐈';
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">AnimalHotels - Animais</h1>
              <button
                onClick={() => window.history.back()}
                className="text-blue-600 hover:text-blue-800"
              >
                ← Voltar
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
     
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gerenciar Animais</h2>
              <p className="text-gray-600">Cadastre e gerencie os animais dos tutores</p>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              disabled={tutors.length === 0}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Novo Animal
            </button>
          </div>

          {tutors.length === 0 && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-yellow-800">
                ⚠️ Você precisa cadastrar pelo menos um tutor antes de adicionar animais.
              </p>
              <button
                onClick={() => window.location.href = '/tutors'}
                className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
              >
                Ir para Tutores
              </button>
            </div>
          )}

          {(showForm || editingAnimal) && (
            <div className="mb-6 bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">
                {editingAnimal ? 'Editar Animal' : 'Novo Animal'}
              </h3>
              <AnimalForm
                onSubmit={editingAnimal ? handleEditAnimal : handleCreateAnimal}
                initialData={editingAnimal || undefined}
                tutors={tutors}
                isLoading={loading}
                onCancel={() => {
                  setShowForm(false);
                  setEditingAnimal(null);
                }}
              />
            </div>
          )}


          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {animals.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🐾</div>
                <p className="text-gray-500 text-lg mb-4">Nenhum animal cadastrado ainda.</p>
                <button
                  onClick={() => setShowForm(true)}
                  disabled={tutors.length === 0}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cadastrar Primeiro Animal
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {animals.map((animal) => (
                  <li key={animal.id}>
                    <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {animal.photo ? (
                            <img
                              src={animal.photo}
                              alt={animal.name}
                              className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNFNUU1RTUiLz4KPHBhdGggZD0iTTMyIDM2QzM1LjMxMzcgMzYgMzggMzMuMzEzNyAzOCAzMEMzOCAyNi42ODYzIDM1LjMxMzcgMjQgMzIgMjRDMjguNjg2MyAyNCAyNiAyNi42ODYzIDI2IDMwQzI2IDMzLjMxMzcgMjguNjg2MyAzNiAzMiAzNloiIGZpbGw9IiM5OTk5OTkiLz4KPHBhdGggZD0iTTQwIDQ0QzQwIDQwLjY4NjMgMzYuNDE1IDM4IDMyIDM4QzI3LjU4NSAzOCAyNCA0MC42ODYzIDI0IDQ0SDQwWiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4K';
                              }}
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                              {getSpeciesIcon(animal.species)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-medium text-gray-900">
                              {animal.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              {getSpeciesIcon(animal.species)} {getSpeciesLabel(animal.species)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Raça:</span> {animal.breed} • 
                            <span className="font-medium ml-2">Idade:</span> {animal.age} {animal.age === 1 ? 'ano' : 'anos'} •
                            <span className="font-medium ml-2">Tutor:</span> {getTutorName(animal.tutorId)}
                          </div>
                          {animal.photo && (
                            <div className="text-xs text-blue-600 mt-1">
                              📷 Tem foto
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingAnimal(animal)}
                          className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded border border-blue-600 hover:bg-blue-50"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteAnimal(animal.id)}
                          className="text-red-600 hover:text-red-900 px-3 py-1 rounded border border-red-600 hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

     
          {animals.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-blue-600">{animals.length}</div>
                <div className="text-gray-600">Total de Animais</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-green-600">
                  {animals.filter(a => a.species === 'dog').length}
                </div>
                <div className="text-gray-600">Cachorros</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {animals.filter(a => a.species === 'cat').length}
                </div>
                <div className="text-gray-600">Gatos</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};