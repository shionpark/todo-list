import { useState, useCallback } from 'react';

/**
 * @hook useTodoInput
 * @description
 *   Todo 입력 폼을 제어하는 훅입니다.
 *   입력값 상태(`value`), 변경 이벤트(`handleChange`), 제출 이벤트(`handleSubmit`)를 제공합니다.
 *   `handleSubmit`은 내부적으로 trim 처리와 빈 문자열 방지를 포함합니다.
 *
 * @param {(value: string) => void} onSubmit - 유효한 입력값이 제출될 때 호출되는 콜백
 *
 * @returns {{
 *   value: string;
 *   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 *   handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
 * }} 입력 상태와 이벤트 핸들러를 반환합니다.
 *
 */

export function useTodoInput(onSubmit: (value: string) => void) {
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  }, []);

  const handleSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      const name = value.trim();
      if (!name) return;
      onSubmit(name);
      setValue('');
    },
    [value, onSubmit]
  );

  return { value, handleChange, handleSubmit };
}
