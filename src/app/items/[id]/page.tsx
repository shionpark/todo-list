import TodoDetail from 'features/todo/components/TodoDetail';

export default function TodoDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return (
      <div className="p-6 text-red-500">
        잘못된 요청입니다. (id가 숫자가 아님)
      </div>
    );
  }
  return <TodoDetail id={id} />;
}
