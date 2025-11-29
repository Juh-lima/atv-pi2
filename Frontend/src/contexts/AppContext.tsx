import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Tutor, Animal, AppState } from '../types/index.ts';

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TUTORS'; payload: Tutor[] }
  | { type: 'ADD_TUTOR'; payload: Tutor }
  | { type: 'UPDATE_TUTOR'; payload: Tutor }
  | { type: 'DELETE_TUTOR'; payload: string }
  | { type: 'SET_ANIMALS'; payload: Animal[] }
  | { type: 'ADD_ANIMAL'; payload: Animal }
  | { type: 'UPDATE_ANIMAL'; payload: Animal }
  | { type: 'DELETE_ANIMAL'; payload: string };

interface AppContextType extends AppState {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTutors: (tutors: Tutor[]) => void;
  addTutor: (tutor: Tutor) => void;
  updateTutor: (tutor: Tutor) => void;
  deleteTutor: (id: string) => void;
  setAnimals: (animals: Animal[]) => void;
  addAnimal: (animal: Animal) => void;
  updateAnimal: (animal: Animal) => void;
  deleteAnimal: (id: string) => void;
  getTutorAnimals: (tutorId: string) => Animal[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TUTORS':
      return { ...state, tutors: action.payload };
    case 'ADD_TUTOR':
      return { ...state, tutors: [...state.tutors, action.payload] };
    case 'UPDATE_TUTOR':
      return {
        ...state,
        tutors: state.tutors.map(tutor =>
          tutor.id === action.payload.id ? action.payload : tutor
        ),
      };
    case 'DELETE_TUTOR':
      return {
        ...state,
        tutors: state.tutors.filter(tutor => tutor.id !== action.payload),
        animals: state.animals.filter(animal => animal.tutorId !== action.payload),
      };
    case 'SET_ANIMALS':
      return { ...state, animals: action.payload };
    case 'ADD_ANIMAL':
      return { ...state, animals: [...state.animals, action.payload] };
    case 'UPDATE_ANIMAL':
      return {
        ...state,
        animals: state.animals.map(animal =>
          animal.id === action.payload.id ? action.payload : animal
        ),
      };
    case 'DELETE_ANIMAL':
      return {
        ...state,
        animals: state.animals.filter(animal => animal.id !== action.payload),
      };
    default:
      return state;
  }
};

const initialState: AppState = {
  tutors: [],
  animals: [],
  loading: false,
  error: null,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value: AppContextType = {
    ...state,
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    setTutors: (tutors) => dispatch({ type: 'SET_TUTORS', payload: tutors }),
    addTutor: (tutor) => dispatch({ type: 'ADD_TUTOR', payload: tutor }),
    updateTutor: (tutor) => dispatch({ type: 'UPDATE_TUTOR', payload: tutor }),
    deleteTutor: (id) => dispatch({ type: 'DELETE_TUTOR', payload: id }),
    setAnimals: (animals) => dispatch({ type: 'SET_ANIMALS', payload: animals }),
    addAnimal: (animal) => dispatch({ type: 'ADD_ANIMAL', payload: animal }),
    updateAnimal: (animal) => dispatch({ type: 'UPDATE_ANIMAL', payload: animal }),
    deleteAnimal: (id) => dispatch({ type: 'DELETE_ANIMAL', payload: id }),
    getTutorAnimals: (tutorId: string) => 
      state.animals.filter(animal => animal.tutorId === tutorId),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};