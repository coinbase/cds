import React from 'react';
import { useTheme } from '@coinbase/cds-web/hooks/useTheme';

export const HeroSquareBanner = () => {
  const { activeColorScheme } = useTheme();
  const isDark = activeColorScheme === 'dark';
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
        }}
        viewBox="0 0 826 201"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_3930_159)">
          <rect
            fill="rgb(var(--purple15))"
            height="200"
            transform="translate(0 0.43457)"
            width="826"
          />
          <path
            d="M218.5 1.32368e-10C286.5 1.32786e-10 275.961 76.9167 318 100C275.961 123.083 241.468 157.75 218.5 200C195.532 157.75 151.039 123.083 109 100C151.039 76.9167 195.532 42.25 218.5 1.32368e-10Z"
            fill="rgb(var(--purple20))"
          />
          <path
            d="M0.5 0C23.4679 42.25 67.9612 76.9167 110 100C67.9612 123.083 23.4679 157.75 0.5 200C-22.4679 157.75 -56.9613 123.083 -99 100C-56.9613 76.9167 -22.4679 42.25 0.5 0Z"
            fill="rgb(var(--purple20))"
          />
          <path
            d="M607.5 0C539.5 0 550.039 76.9167 508 100C550.039 123.083 544.5 201 607.5 201C630.468 158.75 674.961 123.083 717 100C674.961 76.9167 630.468 42.25 607.5 0Z"
            fill="rgb(var(--purple20))"
          />
          <path
            d="M825.5 0C802.532 42.25 758.039 76.9167 716 100C758.039 123.083 802.532 157.75 825.5 200C848.468 157.75 882.961 123.083 925 100C882.961 76.9167 848.468 42.25 825.5 0Z"
            fill="rgb(var(--purple20))"
          />
          <ellipse cx="411.5" cy="107" fill="rgb(var(--purple20))" rx="215.5" ry="206" />
          <circle cx="413" cy="107.018" fill="rgb(var(--purple40))" r="131.937" />
          <circle cx="413" cy="100" fill="rgb(var(--purple50))" r="75" />
          <path
            d="M413.5 25C430.928 56.8987 457.101 83.0721 489 100.5C457.101 117.928 430.928 144.101 413.5 176C396.072 144.101 369.899 117.928 338 100.5C369.899 83.0721 396.072 56.8987 413.5 25Z"
            fill="rgb(var(--purple70))"
          />
          <path d="M334 23L494 23" stroke={isDark ? '#0A0B0D' : '#FFF'} strokeWidth="4" />
          <path d="M334 177L494 177" stroke={isDark ? '#0A0B0D' : '#FFF'} strokeWidth="4" />
          <path d="M490 23L490 177" stroke={isDark ? '#0A0B0D' : '#FFF'} strokeWidth="4" />
          <path d="M336 23L336 177" stroke={isDark ? '#0A0B0D' : '#FFF'} strokeWidth="4" />
          <rect
            fill="rgb(var(--purple0))"
            height="16"
            stroke={isDark ? '#0A0B0D' : '#FFF'}
            strokeWidth="4"
            width="16"
            x="328"
            y="15"
          />
          <rect
            fill="rgb(var(--purple0))"
            height="16"
            stroke={isDark ? '#0A0B0D' : '#FFF'}
            strokeWidth="4"
            width="16"
            x="328"
            y="169"
          />
          <rect
            fill="rgb(var(--purple0))"
            height="16"
            stroke={isDark ? '#0A0B0D' : '#FFF'}
            strokeWidth="4"
            width="16"
            x="482"
            y="169"
          />
          <rect
            fill="rgb(var(--purple0))"
            height="16"
            stroke={isDark ? '#0A0B0D' : '#FFF'}
            strokeWidth="4"
            width="16"
            x="482"
            y="15"
          />
        </g>
        <defs>
          <clipPath id="clip0_3930_159">
            <rect fill="white" height="200" transform="translate(0 0.43457)" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
