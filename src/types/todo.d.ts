/**
 * Todo 항목에 대한 타입 정의
 */
export interface Todo {
  id: number;
  tenantId: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

export type CreateTodoPayload = {
  name: string;
  memo?: string;
  imageUrl?: string;
};

export type UpdateTodoPayload = Partial<{
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}>;
