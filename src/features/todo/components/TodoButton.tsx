'use client';

import { Plus, Check, X } from 'lucide-react';
import Button from '@components/Button';

interface TodoButtonProps {
  type: 'add' | 'edit' | 'delete';
  primary?: boolean;
  iconOnly?: boolean;
  onClick: () => void;
}

export default function TodoButton({
  type,
  primary = false,
  iconOnly = false,
  onClick,
}: TodoButtonProps) {
  const variants = {
    add: {
      icon: <Plus className="size-5" />,
      label: '추가하기',
      baseColor: primary ? 'bg-primary text-white' : 'bg-border',
    },
    edit: {
      icon: <Check className="size-5" />,
      label: '수정 완료',
      baseColor: primary ? 'bg-edit text-slate-900' : 'bg-border',
    },
    delete: {
      icon: <X className="size-5" />,
      label: '삭제하기',
      baseColor: 'bg-delete text-white',
    },
  };

  const { icon, label, baseColor } = variants[type];
  const shape = iconOnly
    ? 'w-auto p-2.5 justify-center'
    : 'flex gap-1 px-3 py-2';

  return (
    <Button className={`${baseColor} ${shape}`} onClick={onClick}>
      {icon}
      {!iconOnly && <span>{label}</span>}
    </Button>
  );
}
