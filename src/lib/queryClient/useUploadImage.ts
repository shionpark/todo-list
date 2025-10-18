import { uploadImage } from '@lib/api/todo';
import { useMutation } from '@tanstack/react-query';

export const useUploadImage = () => {
  return useMutation({
    // (file, { onProgress, signal }) 형태를 맞추기 위한 래퍼
    mutationFn: ({
      file,
    }: {
      file: File;
      onProgress?: (percent: number) => void;
      signal?: AbortSignal;
    }) => uploadImage(file),
  });
};
