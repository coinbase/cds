import React, { memo, useEffect, useRef } from 'react';
import { useKBar, VisualState } from 'kbar';

const bumpAnimationKeyframes = [
  {
    transform: 'scale(1)',
  },
  {
    transform: 'scale(.98)',
  },
  {
    transform: 'scale(1)',
  },
];

/**
 * Partially pulled from KBar source code and then replaced UI portion with CDS equivalent.
 * This component handles transitioning the Modal content when navigating through KBar.
 */
const KBarAnimator = memo(function KBarAnimator({ children }: { children: React.ReactNode }) {
  const { visualState, currentRootActionId, options } = useKBar((state) => ({
    visualState: state.visualState,
    currentRootActionId: state.currentRootActionId,
  }));

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const enterMs = options?.animations?.enterMs ?? 0;
  const exitMs = options?.animations?.exitMs ?? 0;

  // Height animation
  const previousHeight = useRef<number>();
  useEffect(() => {
    // Only animate if we're actually showing
    if (visualState === VisualState.showing) {
      const outer = outerRef.current;
      const inner = innerRef.current;

      if (!outer || !inner) {
        return;
      }

      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const cr = entry.contentRect;

          if (!previousHeight.current) {
            previousHeight.current = cr.height;
          }

          outer.animate(
            [
              {
                height: `${previousHeight.current}px`,
              },
              {
                height: `${cr.height}px`,
              },
            ],
            {
              duration: enterMs / 2,
              // TODO: expose configs here
              easing: 'ease-out',
              fill: 'forwards',
            },
          );
          previousHeight.current = cr.height;
        }
      });

      ro.observe(inner);
      return () => {
        ro.unobserve(inner);
      };
    }
  }, [visualState, options, enterMs, exitMs]);

  // Bump animation between nested actions
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const element = outerRef.current;
    if (element) {
      element.animate(bumpAnimationKeyframes, {
        duration: enterMs,
        easing: 'ease-out',
      });
    }
  }, [currentRootActionId, enterMs]);

  return (
    <div
      ref={outerRef}
      style={{
        pointerEvents: 'auto',
      }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
});

export default KBarAnimator;
