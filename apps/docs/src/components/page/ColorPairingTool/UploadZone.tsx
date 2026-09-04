import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTheme } from '@coinbase/cds-web';
import { Icon } from '@coinbase/cds-web/icons';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { ProgressBar } from '@coinbase/cds-web/visualizations';
import { useColorMode } from '@docusaurus/theme-common';

import { FileDropZone, useFileUpload } from '../FileDropZone';

import type { Spectrum } from './colorUtils';
import styles from './UploadZone.module.css';

type UploadZoneProps = {
  isLoading: boolean;
  progress: { current: number; total: number };
  error?: string;
  onFiles: (files: File[]) => void;
};

export const UploadZone = memo(function UploadZone({
  isLoading,
  progress,
  error,
  onFiles,
}: UploadZoneProps) {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const lightSpectrum = theme.lightSpectrum as Spectrum;
  const darkSpectrum = theme.darkSpectrum as Spectrum;
  const [dragItemCount, setDragItemCount] = useState(0);

  const handleDragEnter = useCallback((count: number) => setDragItemCount(count), []);
  const handleDragLeave = useCallback(() => setDragItemCount(0), []);

  const handleFilesInternal = useCallback(
    (files: File[]) => {
      setDragItemCount(0);
      onFiles(files);
    },
    [onFiles],
  );

  const { dropZoneProps, fileInputRef, handleFileInputChange } = useFileUpload({
    onFiles: handleFilesInternal,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
  });

  const checkerboard = useMemo(() => {
    const spectrum = colorMode === 'light' ? lightSpectrum : darkSpectrum;
    return `repeating-conic-gradient(rgb(${spectrum.gray15}) 0% 25%, rgb(${spectrum.gray10}) 0% 50%) 0 0 / 12px 12px`;
  }, [colorMode, lightSpectrum, darkSpectrum]);

  const isDragOver = dragItemCount > 0;
  const progressPct = progress.total > 0 ? progress.current / progress.total : 0;

  return (
    <FileDropZone
      multiple
      accept="image/png,image/jpeg,image/webp"
      disabled={isLoading}
      dropZoneProps={dropZoneProps}
      fileInputRef={fileInputRef}
      onFileInputChange={handleFileInputChange}
    >
      {!isDragOver && !isLoading && (
        <VStack alignItems="center" gap={1} padding={5}>
          <Icon color="fgMuted" name="withdraw" size="s" />
          <Text font="headline">Add images</Text>
          <Text color="fgMuted" font="label2">
            Up to 10 (PNG, JPG or WEBP)
          </Text>
          {error && (
            <Box
              background="bgNegativeWash"
              borderRadius={200}
              paddingX={2}
              paddingY={1}
              style={{ marginTop: 8 }}
            >
              <Text color="fgNegative" font="legal">
                {error}
              </Text>
            </Box>
          )}
        </VStack>
      )}

      {isDragOver && (
        <VStack alignItems="center" gap={1} padding={5} style={{ pointerEvents: 'none' }}>
          {dragItemCount === 1 ? (
            <div className={styles.thumbSingle} style={{ background: checkerboard }} />
          ) : (
            <div className={styles.dragThumbStack}>
              {Array.from({ length: Math.min(dragItemCount, 3) })
                .reverse()
                .map((_, i) => (
                  <div key={i} className={styles.thumb} style={{ background: checkerboard }} />
                ))}
            </div>
          )}
          <Text color="fgMuted" font="headline">
            Drop to upload
          </Text>
          <Text color="fgMuted" font="label2">
            {dragItemCount === 1 ? '1 image' : `${dragItemCount} images`}
          </Text>
        </VStack>
      )}

      {isLoading && (
        <VStack alignItems="center" gap={2} padding={5}>
          <Box style={{ width: 200 }}>
            <ProgressBar accessibilityLabel="Processing images" progress={progressPct} />
          </Box>
          <Text color="fgMuted" font="label2">
            {progress.total > 1
              ? `Processing ${progress.current} of ${progress.total}…`
              : 'Extracting colors…'}
          </Text>
        </VStack>
      )}
    </FileDropZone>
  );
});
