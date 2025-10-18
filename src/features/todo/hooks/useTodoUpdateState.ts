'use client';

import { useEffect, useRef, useState } from 'react';
import { useTodo } from '@lib/queryClient/useTodo';
import { useUpdateTodo } from '@lib/queryClient/useUpdateTodo';
import { useUploadImage } from '@lib/queryClient/useUploadImage';

/**
 * Todo 상세 업데이트 상태를 관리하는 기본 훅
 * - name, memo, imageUrl 로컬 상태 관리
 * - 이미지 업로드 및 삭제
 * - 수정 완료 버튼으로 전체 업데이트
 */
export function useTodoUpdateState(id: number) {
  // API hooks
  const { data: todo, isLoading, isError, error } = useTodo(id);
  const { mutate: updateTodo, isPending: saving } = useUpdateTodo(id);
  const { mutate: uploadImage, isPending: uploading } = useUploadImage();

  // Local states
  const [name, setName] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const fileRef = useRef<HTMLInputElement | null>(null);

  // 서버 → 로컬 초기화
  useEffect(() => {
    if (todo) {
      setName(todo.name ?? '');
      setMemo(todo.memo ?? '');
      setImageUrl(todo.imageUrl ?? '');
    }
  }, [todo]);

  // 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadImage(
      { file },
      {
        onSuccess: (url) => setImageUrl(url),
      }
    );
  };

  // 이미지 삭제
  const handleImageRemove = () => {
    setImageUrl('');
  };

  // 전체 수정 (단순 PATCH)
  const handleSubmitAll = () => {
    if (!confirm('Todo를 수정하시겠습니까?')) return;
    updateTodo(
      {
        name,
        memo,
        imageUrl,
      },
      { onSuccess: () => alert('수정이 완료되었습니다!') }
    );
  };

  return {
    // 상태
    name,
    memo,
    imageUrl,
    fileRef,

    isLoading,
    isError,
    error,
    saving,
    uploading,
    todo,

    // 액션
    setName,
    setMemo,
    handleImageUpload,
    handleImageRemove,
    handleSubmitAll,
  };
}
