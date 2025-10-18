import Image from 'next/image';

export default function EmptyState({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="my-4 flex h-80 flex-col items-center justify-center gap-4 rounded-2xl">
      <Image src={image} alt="empty" width={160} height={160} />
      <span className="text-center text-slate-400">{title}</span>
    </div>
  );
}
