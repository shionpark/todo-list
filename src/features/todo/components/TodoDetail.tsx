'use client';

import Image from 'next/image';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useDeleteTodo } from '@lib/queryClient/useDeleteTodo';

import TodoButton from './TodoButton';
import { useTodoUpdateState } from '../hooks/useTodoUpdateState';

export default function TodoDetail({ id }: { id: number }) {
  const router = useRouter();
  const {
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
    setName,
    setMemo,
    handleImageUpload,
    handleImageRemove,
    handleSubmitAll,
  } = useTodoUpdateState(id);

  const { mutate: deleteTodo, isPending: deleting } = useDeleteTodo();

  const handleDelete = () => {
    if (!todo) return;
    if (confirm('이 Todo를 삭제하시겠습니까?')) {
      deleteTodo(todo.id, {
        onSuccess: () => {
          router.replace('/');
          alert('삭제가 완료되었습니다!');
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader className="animate-spin text-slate-500" />
      </div>
    );
  }

  if (isError || !todo) {
    return (
      <div className="p-6 text-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다: {error?.message}
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmitAll();
      }}
      className="mx-auto max-w-4xl space-y-8 p-6"
    >
      {/* 제목 입력 */}
      <div className="flex items-center gap-3 rounded-[24px] border-2 border-slate-900 px-6 py-3">
        <span
          className={`inline-block h-6 w-6 rounded-full border-2 border-slate-900 ${
            todo.isCompleted ? 'bg-slate-900' : 'bg-white'
          }`}
          title={todo.isCompleted ? '완료됨' : '진행중'}
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={saving}
          placeholder="할 일 제목"
          className="h-10 w-full flex-1 bg-transparent text-lg font-semibold text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* 이미지 & 메모 */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* 이미지 */}
        <div className="relative flex min-h-[20rem] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-slate-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="todo_image"
              fill
              className="rounded-xl object-cover"
              unoptimized
            />
          ) : (
            <Image
              src="/images/upload_img.png"
              alt="upload_img"
              width={60}
              height={60}
            />
          )}

          <div className="absolute right-2 bottom-2 flex gap-2">
            <button
              type="button"
              className="rounded-lg bg-white/90 px-3 py-1 text-sm shadow"
              onClick={() => fileRef.current?.click()}
            >
              {uploading ? '업로드 중…' : '이미지 변경'}
            </button>
            {imageUrl && (
              <button
                type="button"
                className="rounded-lg bg-white/90 px-3 py-1 text-sm shadow"
                onClick={handleImageRemove}
              >
                삭제
              </button>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* 메모 */}
        <div className="relative h-[320px] w-full overflow-hidden rounded-3xl shadow-sm">
          <Image
            src="/images/memo.png"
            alt="메모 카드 배경"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 p-6">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력하세요"
              disabled={saving}
              className="h-[240px] w-full resize-none rounded-xl bg-transparent p-3 text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-4">
        <TodoButton type="submit" variant="edit" />
        <TodoButton type="button" variant="delete" onClick={handleDelete} />
      </div>
    </form>
  );
}
