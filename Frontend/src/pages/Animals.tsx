import React, { useState } from 'react';
import { useAnimals } from '../hooks/useAnimals';
import { useApp } from '../contexts/AppContext';
import { AnimalForm } from '../components/AnimalForm';
import { animalService } from '../services/api';

const Animals: React.FC = () => {
  const { animals, addAnimal, updateAnimal, deleteAnimal, loading } = useAnimals();
  const { tutors } = useApp();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<any>(null);

const handleCreateAnimal = async (data: any) => {
  try {
    // 🔥 Validação correta
    if (
      data.tutorId === "" ||
      data.tutorId === null ||
      data.tutorId === undefined
    ) {
      alert("Selecione um tutor.");
      return;
    }

    const payload = {
      ...data,
      tutorId: data.tutorId, // 🔥 converte aqui
    };

    const response = await animalService.create(payload);
    addAnimal(response.data);

  } catch (error) {
    console.error("Erro ao criar animal: ", error);
  }
};


  const handleUpdateAnimal = async (id: number, data: any) => {
    try {
      const response = await animalService.update(id, data);
      updateAnimal(response.data);
      setEditingAnimal(null);
      setIsFormOpen(false);
    } catch (error: any) {
      console.error("Erro ao atualizar animal:", error);
      alert(error?.response?.data?.error || "Erro ao atualizar animal");
    }
  };

  const handleDeleteAnimal = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este animal?")) return;

    try {
      await animalService.remove(id);
      deleteAnimal(id.toString());
    } catch (error: any) {
      console.error("Erro ao excluir animal:", error);
      alert(error?.response?.data?.error || "Erro ao excluir animal");
    }
  };

  const openCreateForm = () => {
    setEditingAnimal(null);
    setIsFormOpen(true);
  };

  const openEditForm = (animal: any) => {
    setEditingAnimal(animal);
    setIsFormOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Animais</h1>
        <button
          onClick={openCreateForm}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Cadastrar Animal
        </button>
      </div>

      {/* FORMULÁRIO */}
      {isFormOpen && (
        <div className="mb-6 p-4 bg-gray-100 rounded-md shadow">
          <AnimalForm
            onSubmit={editingAnimal ? 
              (data) => handleUpdateAnimal(editingAnimal.id, data) : 
              handleCreateAnimal
            }
            initialData={editingAnimal || undefined}
            tutors={tutors}
            onCancel={() => setIsFormOpen(false)}
            isLoading={loading}
          />
        </div>
      )}

      {/* LISTAGEM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {animals.map((animal) => (
          <div key={animal.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{animal.name}</h2>
            <p><strong>Espécie:</strong> {animal.species}</p>
            <p><strong>Raça:</strong> {animal.breed}</p>
            <p><strong>Idade:</strong> {animal.age} anos</p>

          

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEditForm(animal)}
                className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteAnimal(animal.id)}
                className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Se não houver animais */}
      {animals.length === 0 && !loading && (
        <p className="text-gray-500 text-center mt-8">
          Nenhum animal cadastrado ainda.
        </p>
      )}
    </div>
  );
};

export default Animals;
