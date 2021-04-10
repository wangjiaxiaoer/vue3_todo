import { IToDo } from '../types/todo';
export function saveTodos(todos: IToDo[]) {
  localStorage.setItem('todos_key', JSON.stringify(todos));
}

export function readTodos(): IToDo[] {
  return JSON.parse(localStorage.getItem('todos_key') || '[]');
}
