/**
 * Todo 항목에 대한 타입 정의
 */
export interface Todo {
  id: number;
  title: string;
  memo?: string;
  imageUrl?: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Todo를 수정할 때 보내는 데이터 타입
 */
export interface TodoUpdatePayload {
  title: string;
  memo?: string;
  imageUrl?: string;
  done: boolean;
}
