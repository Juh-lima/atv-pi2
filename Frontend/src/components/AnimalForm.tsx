import React, { useState, useEffect } from 'react';
import type { Animal, Tutor } from '../types/index.ts';

interface AnimalFormProps {
  onSubmit: (data: any) => Promise<void>;
  initialData?: Animal;
  tutors: Tutor[];
  isLoading?: boolean;
  onCancel?: () => void;
}

export const AnimalForm: React.FC<AnimalFormProps> = ({
  onSubmit,
  initialData,
  tutors,
  isLoading = false,
  onCancel
}) => {

  // 🔥 tutorId sempre STRING no estado (React exige isso no select)
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    species: initialData?.species || 'dog',
    breed: initialData?.breed || '',
    age: initialData?.age || 1,
    tutorId: initialData?.tutorId ? String(initialData.tutorId) : '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        species: initialData.species,
        breed: initialData.breed,
        age: initialData.age,
        tutorId: initialData.tutorId ? String(initialData.tutorId) : '',
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // 🔥 não converte tutorId aqui!
    setFormData(prev => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 🔥 Envia tutorId como STRING
  const payload = {
    ...formData,
    tutorId: formData.tutorId, 
  };

  await onSubmit(payload);
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Nome e espécie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div>
          <label className="block text-sm font-medium">Nome *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Espécie *</label>
          <select
            name="species"
            value={formData.species}
            required
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          >
            <option value="dog">Cachorro</option>
            <option value="cat">Gato</option>
          </select>
        </div>
      </div>

      {/* Raça e idade */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium">Raça *</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            required
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Idade *</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            min={0}
            max={30}
            required
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
      </div>

      {/* Tutor */}
      <div>
        <label className="block text-sm font-medium">Tutor *</label>

        <select
          name="tutorId"
          value={formData.tutorId}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded-md"
        >
          <option value="">Selecione um tutor</option>

          {tutors.map(t => (
            <option key={t.id} value={String(t.id)}>
              {t.name} - {t.email}
            </option>
          ))}
        </select>
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {isLoading ? 'Salvando...' : initialData ? 'Atualizar' : 'Cadastrar'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
