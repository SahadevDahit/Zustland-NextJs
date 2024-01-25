// todoStore.ts
import { create, StoreApi } from 'zustand';
import { Todos } from '@/types';

interface TodoFormState {
  todos: Todos[];
  id: string;
  title: string;
  status: string;
  description: string;
  setFormValues: (values: Partial<TodoFormState>) => void;
  resetForm: () => void;
  loadTodos: () => Promise<void>;
  addTodo: (newTodo: Todos) => Promise<void>;
  updateTodo: (updatedTodo: Todos) => Promise<void>;
  getTodoById: (id: string) => Todos | undefined;
  deleteTodo: (id: string) => Promise<void>;
}

const useTodoStore = create<TodoFormState>((set: StoreApi<TodoFormState>['setState']) => ({
  todos: [], // Initialize todos as an empty array
  id: '',
  title: '',
  status: 'inProgress',
  description: '',
  setFormValues: (values: Partial<TodoFormState>) => set(values),
  resetForm: () => set({ id: '', title: '', status: 'inProgress', description: '' }),

  loadTodos: async () => {
    try {
      // Assuming you might fetch todos from an API or perform other asynchronous operations
      // For now, let's leave todos as an empty array
      set(() => ({ todos: [] }));
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  },

  addTodo: async (newTodo: Todos) => {
    try {
      // Add the new todo to the todos array
      set((state) => ({ todos: [newTodo, ...state.todos] }));
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  },

  updateTodo: async (updatedTodo: Todos) => {
    try {
      // Update the todo in the todos array
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      }));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  },

  getTodoById: (id: string) => {
    // Get a todo by ID from the todos array
    const todo = useTodoStore.getState().todos.find((t: Todos) => t.id === id);
    return todo;
  },

  deleteTodo: async (id: string) => {
    try {
      await Promise.resolve(set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  },
}));

export default useTodoStore;
