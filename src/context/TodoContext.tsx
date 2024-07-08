import React, { createContext, useState, ReactNode, ChangeEvent } from 'react';

interface TodoContextProps {
  todos: string[];
  todo: string;
  editableIndex: number | null;
  editedElement: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addTodo: () => void;
  deleteTodo: (index: number) => void;
  editTodo: (index: number) => void;
  updateEditedElement: (e: ChangeEvent<HTMLInputElement>) => void;
  saveChanges: () => void;
  closeModal: () => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState('');
  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [editedElement, setEditedElement] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const addTodo = () => {
    if (todo) {
      setTodos([...todos, todo]);
      setTodo('');
    }
  };

  const deleteTodo = (index: number) => {
    const filteredTodos = todos.filter((_, i) => i !== index);
    setTodos(filteredTodos);
  };

  const editTodo = (index: number) => {
    setEditableIndex(index);
    setEditedElement(todos[index]);
  };

  const updateEditedElement = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedElement(e.target.value);
  };

  const saveChanges = () => {
    if (editableIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editableIndex] = editedElement;
      setTodos(updatedTodos);
      setEditableIndex(null);
    }
  };

  const closeModal = () => {
    setEditableIndex(null);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        todo,
        editableIndex,
        editedElement,
        handleChange,
        addTodo,
        deleteTodo,
        editTodo,
        updateEditedElement,
        saveChanges,
        closeModal,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
