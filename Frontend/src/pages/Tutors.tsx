import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTutors } from '../hooks/useTutors';
import { TutorForm } from '../components/TutorForm.tsx';
import type { Tutor, CreateTutorData, UpdateTutorData } from '../types/index.ts';

export const Tutors: React.FC = () => {
  const { logout } = useAuth();
  const { tutors, fetchTutors, createTutor, editTutor, removeTutor } = useTutors();
  const [showForm, setShowForm] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  const handleCreateTutor = async (tutorData: CreateTutorData) => {
    setLoading(true);
    try {
      await createTutor(tutorData);
      setShowForm(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTutor = async (tutorData: UpdateTutorData) => {
    if (!editingTutor) return;
    
    setLoading(true);
    try {
      await editTutor(editingTutor.id, tutorData);
      setEditingTutor(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTutor = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este tutor?')) {
      await removeTutor(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">AnimalHotels - Tutores</h1>
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
          {/* Header da página */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gerenciar Tutores</h2>
              <p className="text-gray-600">Cadastre e gerencie os tutores dos animais</p>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + Novo Tutor
            </button>
          </div>

          {/* Formulário */}
          {(showForm || editingTutor) && (
            <div className="mb-6 bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">
                {editingTutor ? 'Editar Tutor' : 'Novo Tutor'}
              </h3>
              <TutorForm
                onSubmit={editingTutor ? handleEditTutor : handleCreateTutor}
                initialData={editingTutor || undefined}
                isLoading={loading}
                onCancel={() => {
                  setShowForm(false);
                  setEditingTutor(null);
                }}
              />
            </div>
          )}

          {/* Lista de Tutores */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {tutors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum tutor cadastrado ainda.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Cadastrar Primeiro Tutor
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {tutors.map((tutor) => (
                  <li key={tutor.id}>
                    <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {tutor.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {tutor.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {tutor.email} • {tutor.phone}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingTutor(tutor)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteTutor(tutor.id)}
                          className="text-red-600 hover:text-red-900"
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
        </div>
      </main>
    </div>
  );
};