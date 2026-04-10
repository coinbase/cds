import React, { type ChangeEvent, type DragEvent, memo, type ReactNode, type Ref } from 'react';
import { Box } from '@coinbase/cds-web/layout';

type FileDropZoneProps = {
  /** MIME types for the file input accept attribute (e.g. "image/png,image/jpeg") */
  accept?: string;
  /** Allow selecting multiple files */
  multiple?: boolean;
  /** Ref for the hidden file input element */
  fileInputRef: Ref<HTMLInputElement>;
  /** File input change handler (from useFileUpload) */
  onFileInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Drop zone event handlers (from useFileUpload) */
  dropZoneProps: {
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  };
  /** Whether interaction is disabled (hides pointer events) */
  disabled?: boolean;
  /** Minimum height of the drop zone */
  minHeight?: number;
  /** Content to render inside the drop zone */
  children: ReactNode;
};

export const FileDropZone = memo(function FileDropZone({
  accept,
  multiple = false,
  fileInputRef,
  onFileInputChange,
  dropZoneProps,
  disabled = false,
  minHeight = 240,
  children,
}: FileDropZoneProps) {
  return (
    <Box
      alignItems="center"
      background="bg"
      borderRadius={200}
      justifyContent="center"
      position="relative"
      {...dropZoneProps}
      style={{
        border: '1px dashed',
        borderColor: 'color-mix(in srgb, var(--cds-lineHeavy) 66%, transparent)',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'border-color 0.2s',
        minHeight,
        display: 'flex',
        pointerEvents: disabled ? 'none' : undefined,
      }}
    >
      <input
        ref={fileInputRef as React.RefObject<HTMLInputElement>}
        accept={accept}
        multiple={multiple}
        onChange={onFileInputChange}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          cursor: 'pointer',
          width: '100%',
          height: '100%',
        }}
        type="file"
      />
      {children}
    </Box>
  );
});

export { useFileUpload } from './useFileUpload';
