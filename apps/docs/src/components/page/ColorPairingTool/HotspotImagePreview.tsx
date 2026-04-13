import React, { memo, useCallback, useEffect, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { useTheme } from '@coinbase/cds-web';
import { Text } from '@coinbase/cds-web/typography';

import type { ExtractedColor, Spectrum, TokenMatch } from './colorUtils';
import { findClosestPrimitive } from './colorUtils';
import styles from './ResultCard.module.css';

type HotspotImagePreviewProps = {
  imgSrc: string;
  imgDataURL: string;
  imgWidth: number;
  imgHeight: number;
  /** Percentage (0–100) for the initial hotspot x position. */
  hotspotX: number;
  /** Percentage (0–100) for the initial hotspot y position. */
  hotspotY: number;
  hotspotColor: string;
  onResample: (color: ExtractedColor, secondary: TokenMatch) => void;
};

export const HotspotImagePreview = memo(function HotspotImagePreview({
  imgSrc,
  imgDataURL,
  imgWidth,
  imgHeight,
  hotspotX,
  hotspotY,
  hotspotColor,
  onResample,
}: HotspotImagePreviewProps) {
  const theme = useTheme();
  const lightSpectrum = theme.lightSpectrum as Spectrum;
  const imgCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgSectionRef = useRef<HTMLDivElement>(null);
  const hotspotRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const ic = imgCanvasRef.current;
    if (!ic) return;
    const img = new Image();
    img.onload = () => {
      ic.width = imgWidth;
      ic.height = imgHeight;
      ic.getContext('2d')!.drawImage(img, 0, 0);
    };
    img.src = imgDataURL;
  }, [imgDataURL, imgWidth, imgHeight]);

  const samplePixel = useCallback((xFrac: number, yFrac: number): Uint8ClampedArray | null => {
    const ic = imgCanvasRef.current;
    if (!ic) return null;
    const cx = Math.max(0, Math.min(ic.width - 1, Math.round(xFrac * ic.width)));
    const cy = Math.max(0, Math.min(ic.height - 1, Math.round(yFrac * ic.height)));
    return ic.getContext('2d')!.getImageData(cx, cy, 1, 1).data;
  }, []);

  const getFracs = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const section = imgSectionRef.current;
    if (!section) return null;
    const rect = section.getBoundingClientRect();
    return {
      xFrac: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
      yFrac: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
    };
  }, []);

  const handlePointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      const fracs = getFracs(e);
      if (!fracs) return;

      // Update position directly via DOM ref for performance (no re-render during drag)
      const hotspot = hotspotRef.current;
      if (hotspot) {
        hotspot.style.left = `${fracs.xFrac * 100}%`;
        hotspot.style.top = `${fracs.yFrac * 100}%`;
      }
      const px = samplePixel(fracs.xFrac, fracs.yFrac);
      if (px && dotRef.current) {
        dotRef.current.style.background = `rgb(${px[0]},${px[1]},${px[2]})`;
      }
    },
    [getFracs, samplePixel],
  );

  const handlePointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      dragging.current = false;
      const fracs = getFracs(e);
      if (!fracs) return;
      const px = samplePixel(fracs.xFrac, fracs.yFrac);
      if (!px) return;
      const sampled: ExtractedColor = {
        r: px[0],
        g: px[1],
        b: px[2],
        imgX: fracs.xFrac,
        imgY: fracs.yFrac,
      };
      const secondary = findClosestPrimitive(sampled.r, sampled.g, sampled.b, lightSpectrum);
      onResample(sampled, secondary);
    },
    [getFracs, samplePixel, onResample, lightSpectrum],
  );

  return (
    <>
      <div className={styles.blurredBg} style={{ backgroundImage: `url(${imgSrc})` }} />
      <div ref={imgSectionRef} className={styles.imageSection}>
        <canvas
          ref={imgCanvasRef}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        />
        <img alt="" className={styles.previewImg} src={imgSrc} />
        <div
          ref={hotspotRef}
          className={styles.hotspotWrap}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{ left: `${hotspotX}%`, top: `${hotspotY}%` }}
        >
          <div ref={dotRef} className={styles.hotspotDot} style={{ background: hotspotColor }} />
          <Text className={styles.hotspotLabel} font="legal">
            drag to resample
          </Text>
        </div>
      </div>
    </>
  );
});
