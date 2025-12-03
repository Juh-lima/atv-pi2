import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTutors } from '../hooks/useTutors';
import { TutorForm } from '../components/TutorForm.tsx';
import type { Tutor, CreateTutorData, UpdateTutorData } from '../types/index.ts';

import '../styles/tutors.css';

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
    <div className="tutors-page">
  
      <nav className="tutors-navbar">
        <div className="tutors-navbar-inner">
          <div className="tutors-navbar-title">
            <h1>AnimalHotels - Tutores</h1>

            <button
              onClick={() => window.history.back()}
              className="tutors-navbar-back"
            >
              ← Voltar
            </button>
          </div>

          <button
            onClick={logout}
            className="tutors-navbar-logout"
          >
            Sair
          </button>
        </div>
      </nav>
      <main className="tutors-container">

        <div className="tutors-header">
          <div>
            <h2 className="tutors-header-title">Gerenciar Tutores</h2>
            <p className="tutors-header-subtitle">
              Cadastre e gerencie os tutores dos animais
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="tutors-new-btn"
          >
            + Novo Tutor
          </button>
        </div>

        {(showForm || editingTutor) && (
          <div className="tutors-form-card">
            <h3 className="tutors-form-title">
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
     <div className="tutors-list-card">
          {tutors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum tutor cadastrado ainda.</p>
              <button
                onClick={() => setShowForm(true)}
                className="tutors-empty-btn"
              >
                Cadastrar Primeiro Tutor
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {tutors.map((tutor) => (
                <li key={tutor.id}>
                  <div className="tutor-item">
                    <div className="flex items-center gap-4">

                      <div className="tutor-avatar">
                        {tutor.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <div className="tutor-info-name">{tutor.name}</div>
                        <div className="tutor-info-details">
                          {tutor.email} • {tutor.phone}
                        </div>
                      </div>
                    </div>

                    <div className="tutor-actions">
                      <button
                        onClick={() => setEditingTutor(tutor)}
                        className="tutor-edit"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleDeleteTutor(tutor.id)}
                        className="tutor-delete"
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

      </main>
    </div>
  );
};
