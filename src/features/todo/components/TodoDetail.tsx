'use client';

import Image from 'next/image';
import { Loader, Plus } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useTodo } from '@lib/queryClient/useTodo';
import { useUpdateTodo } from '@lib/queryClient/useUpdateTodo';
import { useDeleteTodo } from '@lib/queryClient/useDeleteTodo';
import { useUploadImage } from '@lib/queryClient/useUploadImage';

import IconButton from '@components/IconButton';
import TodoButton from './TodoButton';

export default function TodoDetailForm({ id }: { id: number }) {
  const router = useRouter();

  // 데이터 로드
  const { data: todo, isLoading, isError, error } = useTodo(id);

  // 뮤테이션 훅
  const { mutate: updateTodo, isPending: saving } = useUpdateTodo(id);
  const { mutate: deleteTodo, isPending: deleting } = useDeleteTodo();
  const { mutate: uploadImage, isPending: uploading } = useUploadImage();

  // 로컬 편집 상태
  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  // 파일 입력 트리거
  const fileRef = useRef<HTMLInputElement | null>(null);

  // 서버 → 로컬 동기화
  useEffect(() => {
    if (!todo) return;
    setName(todo.name ?? '');
    setMemo(todo.memo ?? '');
    setImageUrl(todo.imageUrl);
  }, [todo]);

  const busy = saving || deleting || uploading;

  // 변경 여부(저장 버튼 활성화 조건)
  const isDirty = useMemo(() => {
    if (!todo) return false;
    return (
      (name ?? '') !== (todo.name ?? '') ||
      (memo ?? '') !== (todo.memo ?? '') ||
      (imageUrl ?? '') !== (todo.imageUrl ?? '')
    );
  }, [name, memo, imageUrl, todo]);

  // 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadImage(
      { file }, // 서버가 'image' 키를 요구하면 { file, fieldName: 'image' }
      {
        onSuccess: (url) => {
          setImageUrl(url);
          // 저장은 한 번에 처리하므로 즉시 API 호출은 하지 않음
        },
        onError: (err) => alert((err as Error).message),
      }
    );
  };

  // 저장(한 번에 PATCH)
  const handleSubmitAll = () => {
    if (!todo) return;
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      alert('제목을 입력하세요.');
      return;
    }
    if (!isDirty) return;
    updateTodo({ name: trimmedName, memo: memo.trim(), imageUrl });
  };

  // 삭제
  const handleDelete = () => {
    if (!todo) return;
    if (!confirm('이 Todo를 삭제하시겠습니까?')) return;
    deleteTodo(todo.id, {
      onSuccess: () => {
        alert('삭제되었습니다!');
        router.replace('/'); // 루트로 이동
      },
    });
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
        e.preventDefault(); // 폼 기본 동작 차단(쿼리스트링 방지)
        handleSubmitAll();
      }}
      className="mx-auto max-w-4xl space-y-8 p-6"
    >
      {/* 상단: 제목 + 상태 점 */}
      <div className="flex items-center gap-3 rounded-[24px] border-2 border-slate-900 bg-slate-100 px-6 py-3">
        <span
          className={`inline-block h-6 w-6 rounded-full border-2 border-slate-900 ${
            todo.isCompleted ? 'bg-slate-900' : 'bg-white'
          }`}
          title={todo.isCompleted ? '완료됨' : '진행중'}
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={busy}
          placeholder="제목을 입력하세요"
          className="h-10 w-full flex-1 bg-transparent text-lg font-semibold text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* 본문: 이미지 + 메모 */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* 이미지 영역 */}
        <div className="relative flex min-h-[20rem] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="todo_image"
              fill
              className="rounded-xl object-cover"
              // 외부 도메인이면 next.config의 images.domains 설정 또는 아래 unoptimized
              unoptimized
            />
          ) : (
            <Image
              src="/images/upload_img.png"
              height={60}
              width={60}
              alt="upload_img"
            />
          )}

          <IconButton
            className="absolute right-2 bottom-2"
            icon={<Plus />}
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            aria-label="이미지 업로드"
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={busy}
          />
        </div>

        {/* 메모 영역: 메모지 배경 위에 입력 */}
        <div className="relative h-[320px] w-full overflow-hidden rounded-3xl shadow-sm">
          <Image
            src="/images/memo.png" // 메모지 배경
            alt="메모 카드 배경"
            fill
            className="object-cover"
            // 로컬 파일이므로 최적화 그대로 사용 가능. 외부면 unoptimized 고려
            priority
          />
          <div className="absolute inset-0 p-6">
            <div className="mb-2 text-center font-semibold text-amber-900">
              Memo
            </div>
            <textarea
              name="memo"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모가 없습니다."
              disabled={busy}
              className="h-[240px] w-full resize-none rounded-xl bg-transparent p-3 text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* 액션 바: 저장/삭제 */}
      <div className="flex gap-4 sm:justify-center md:justify-center lg:justify-end">
        {/* 저장은 submit로 한 번에 */}
        <TodoButton variant="edit" onClick={handleSubmitAll} />

        {/* 삭제는 절대 submit 되면 안 됨 */}
        <TodoButton variant="delete" onClick={handleDelete} />
      </div>
    </form>
  );
}
