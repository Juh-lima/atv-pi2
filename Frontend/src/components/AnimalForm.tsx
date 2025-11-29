import React, { useState, useEffect } from 'react';
import type { Animal, Tutor } from '../types/index.ts';

interface AnimalFormProps {
  onSubmit: (data: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
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
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    species: initialData?.species || 'dog' as 'cat' | 'dog',
    breed: initialData?.breed || '',
    age: initialData?.age || 1,
    tutorId: initialData?.tutorId || '',
    photo: initialData?.photo || '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        species: initialData.species,
        breed: initialData.breed,
        age: initialData.age,
        tutorId: initialData.tutorId,
        photo: initialData.photo || '',
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 1 : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome do Animal *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            placeholder="Ex: Rex, Luna, etc."
          />
        </div>

        <div>
          <label htmlFor="species" className="block text-sm font-medium text-gray-700">
            Espécie *
          </label>
          <select
            name="species"
            id="species"
            required
            value={formData.species}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          >
            <option value="dog">Cachorro</option>
            <option value="cat">Gato</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
            Raça *
          </label>
          <input
            type="text"
            name="breed"
            id="breed"
            required
            value={formData.breed}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            placeholder="Ex: Labrador, Siames, etc."
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Idade (anos) *
          </label>
          <input
            type="number"
            name="age"
            id="age"
            min="0"
            max="30"
            required
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="tutorId" className="block text-sm font-medium text-gray-700">
          Tutor *
        </label>
        <select
          name="tutorId"
          id="tutorId"
          required
          value={formData.tutorId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
        >
          <option value="">Selecione um tutor</option>
          {tutors.map(tutor => (
            <option key={tutor.id} value={tutor.id}>
              {tutor.name} - {tutor.email}
            </option>
          ))}
        </select>
        {tutors.length === 0 && (
          <p className="text-sm text-red-600 mt-1">
            Nenhum tutor cadastrado. Cadastre um tutor primeiro.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
          Foto (URL opcional)
        </label>
        <input
          type="url"
          name="photo"
          id="photo"
          value={formData.photo}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          placeholder="https://exemplo.com/foto.jpg"
        />
      </div>

      {formData.photo && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview da Foto
          </label>
          <img 
            src={formData.photo} 
            alt="Preview" 
            className="h-32 w-32 object-cover rounded-md border"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading || tutors.length === 0}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Salvando...' : initialData ? 'Atualizar' : 'Cadastrar'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};