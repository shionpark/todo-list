'use client';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
}

function Input({ value, ...props }: InputProps) {
  return (
    <input
      className="border-text w-full rounded-3xl border border-r-4 border-b-4 px-4 py-2"
      value={value}
      placeholder="할 일을 입력해주세요"
      {...props}
    />
  );
}

export default Input;
