import TodoDetail from 'features/todo/components/TodoDetail';

export default async function TodoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (Number.isNaN(id)) {
    return (
      <div className="p-6 text-red-500">
        잘못된 요청입니다. (id가 숫자가 아님)
      </div>
    );
  }
  return <TodoDetail id={numId} />;
}
