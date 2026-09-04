import React from 'react';

import { useDocsTheme } from '../../../theme/Layout/Provider/UnifiedThemeContext';

export const SlideButtonBanner = () => {
  const { colorScheme } = useDocsTheme();

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
        viewBox="0 0 896 246"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          fill={colorScheme === 'light' ? 'rgb(var(--teal15))' : 'rgb(var(--indigo80))'}
          height="246"
          width="896"
        />
        <g clipPath="url(#clip0_302_22182)">
          <rect
            fill={colorScheme === 'light' ? 'rgb(var(--blue20))' : 'rgb(var(--gray30))'}
            height="150"
            rx="75"
            width="692"
            x="102"
            y="48"
          />
          <rect fill="rgb(var(--blue60))" height="150" rx="75" width="150" x="102" y="48" />
          <path d="M221.751 123L131.751 123" stroke="rgb(var(--gray0))" strokeWidth="2" />
          <path
            d="M177 168.248L222.249 122.999L177 77.7505"
            stroke="rgb(var(--gray0))"
            strokeWidth="2"
          />
          <path d="M680 123L366 123" stroke="rgb(var(--gray100))" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_302_22182">
            <rect fill="rgb(var(--gray0))" height="150" rx="75" width="692" x="102" y="48" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
