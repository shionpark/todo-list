import axios from 'axios';

import { apiBase, itemsUrl, itemUrl } from '@lib/config';
import type { Todo } from '@modules/todo';

const client = axios.create({
  baseURL: apiBase,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodos = async (): Promise<Todo[]> => {
  const response = await client.get(itemsUrl);
  return response.data;
};

export const createTodo = async (text: string): Promise<Todo> => {
  const response = await client.post(itemsUrl, { text, completed: false });
  return response.data;
};

export const patchTodo = async (
  id: number,
  payload: Partial<Omit<Todo, 'id'>>
): Promise<Todo> => {
  const response = await client.patch(itemUrl(id), payload);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await client.delete(itemUrl(id));
};
