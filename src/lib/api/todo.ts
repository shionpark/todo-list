/**
 * @file Axios 클라이언트를 설정하고 API 호출 함수들을 정의합니다.
 */
import axios from 'axios';
import toast from 'react-hot-toast';

import { apiBase, imageUrl, itemsUrl, itemUrl } from '@lib/api/config';
import type { Todo } from '@modules/todo';

// API 요청을 위한 axios 인스턴스 생성
const client = axios.create({
  baseURL: apiBase,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axios 응답 인터셉터 설정. 모든 API 에러를 여기서 처리합니다.
client.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = '오류가 발생했습니다.';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || errorMessage;
    }
    toast.error(errorMessage); // 사용자에게 토스트로 에러 메시지 표시
    return Promise.reject(error);
  }
);

// API 함수들
export const getTodos = async (): Promise<Todo[]> => {
  const response = await client.get(itemsUrl);
  return response.data;
};

export const createTodo = async (name: string): Promise<Todo> => {
  const response = await client.post<Todo>(itemsUrl, {
    name, // ✅ 서버가 요구하는 필드명
  });
  return response.data;
};

export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await client.get<Todo>(itemUrl(id));
  return response.data;
};

export const updateTodo = async (
  itemId: number,
  payload: Partial<Omit<Todo, 'id'>>
): Promise<Todo> => {
  const response = await client.patch<Todo>(itemUrl(itemId), payload);
  return response.data;
};

export const toggleTodo = async (t: Todo): Promise<Todo> => {
  return updateTodo(t.id, { isCompleted: !t.isCompleted });
};

export const deleteTodo = async (id: number): Promise<void> => {
  await client.delete(itemUrl(id));
};

export const uploadImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await client.post<{ url: string }>(imageUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.url;
};
