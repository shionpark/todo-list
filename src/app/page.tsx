'use client';

import Image from 'next/image';
import Input from '@components/common/Input';
import TodoButton from '@components/todo/TodoButton';
import { useBreakpoint } from '@hooks/useBreakpoint';

export default function Home() {
  const { sm } = useBreakpoint();

  return (
    <>
      <div className="flex justify-between gap-2">
        <Input type="search" />
        <TodoButton type="add" primary onClick={() => alert('추가하기!')} />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
        <div>
          <div className="w-24 rounded-3xl bg-lime-300 p-1.5 text-center font-bold text-green-800">
            TO DO
          </div>
          <div className="my-4 flex h-80 flex-col items-center justify-between gap-4">
            <Image
              src="/images/empty_todo.png"
              alt="My Todo List 로고"
              width={200}
              height={200}
            />
            <span className="ty-1 flex text-center text-slate-400">
              할 일이 없어요.
              <br />
              TODO를 새롭게 추가해주세요!
            </span>
          </div>
        </div>
        <div>
          <div className="w-24 rounded-3xl bg-green-800 p-1.5 text-center font-bold text-yellow-400">
            DONE
          </div>
          <div className="my-4 flex h-80 flex-col items-center justify-between gap-4">
            <Image
              src="/images/empty_done.png"
              alt="My Todo List 로고"
              width={200}
              height={200}
            />
            <span className="ty-1 flex text-center text-slate-400">
              아직 다 한일이 없어요.
              <br />
              해야 할 일을 체크해보세요!
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
