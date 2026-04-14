import { type ChangeEvent, type DragEvent, useCallback, useRef } from 'react';

type UseFileUploadOptions = {
  onFiles: (files: File[]) => void;
  onDragEnter?: (itemCount: number) => void;
  onDragLeave?: () => void;
};

export function useFileUpload({ onFiles, onDragEnter, onDragLeave }: UseFileUploadOptions) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      const files = Array.from(e.target.files);
      e.target.value = '';
      setTimeout(() => onFiles(files), 0);
    },
    [onFiles],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!e.dataTransfer.files.length) return;
      const files = Array.from(e.dataTransfer.files);
      setTimeout(() => onFiles(files), 0);
    },
    [onFiles],
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const items = Array.from(e.dataTransfer.items).filter((i) => i.kind === 'file');
      onDragEnter?.(items.length);
    },
    [onDragEnter],
  );

  const handleDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      const zone = e.currentTarget;
      if (!zone.contains(e.relatedTarget as Node)) {
        onDragLeave?.();
      }
    },
    [onDragLeave],
  );

  const dropZoneProps = {
    onDrop: handleDrop,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
  };

  return {
    dropZoneProps,
    fileInputRef,
    handleFileInputChange: handleChange,
  };
}
