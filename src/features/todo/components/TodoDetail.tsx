'use client';

import Image from 'next/image';
import { Loader, Plus } from 'lucide-react';
import { useTodo } from '@lib/queryClient/useTodo';
import IconButton from '@components/IconButton';
import TodoButton from './TodoButton';

export default function TodoDetailSimple({ id }: { id: number }) {
  const { data: todo, isLoading, isError, error } = useTodo(id);

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
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div className="flex items-center gap-3 rounded-[24px] border-2 border-slate-900 px-6 py-3 text-center">
        <span
          className={`inline-block h-6 w-6 rounded-full border-2 border-slate-900 ${
            todo.isCompleted ? 'bg-slate-900' : 'bg-white'
          }`}
          aria-label={todo.isCompleted ? '완료됨' : '진행중'}
          title={todo.isCompleted ? '완료됨' : '진행중'}
        />
        <h1 className="flex-1 text-lg font-semibold text-slate-800">
          {todo.name}
        </h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="relative flex min-h-[20rem] items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-100">
          <Image
            src="/images/upload_img.png"
            height={60}
            width={60}
            alt="upload_img"
          />
          <IconButton className="absolute right-2 bottom-2" icon={<Plus />} />
        </div>

        <div className="relative h-[320px] w-full overflow-hidden rounded-3xl shadow-sm">
          <Image
            src="/images/memo.png"
            alt="메모 카드 배경"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            priority
          />

          <div className="absolute inset-0 p-6">
            <div className="mb-2 text-center font-semibold text-amber-900">
              Memo
            </div>
            <div className="h-[240px] overflow-auto rounded-xl bg-transparent p-3 text-slate-700">
              {todo.memo ? (
                <p className="leading-7 whitespace-pre-wrap">{todo.memo}</p>
              ) : (
                <p className="text-slate-400">메모가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 sm:justify-center md:justify-center lg:justify-end">
        <TodoButton type="edit" onClick={() => {}} />
        <TodoButton type="delete" onClick={() => {}} />
      </div>
    </div>
  );
}
