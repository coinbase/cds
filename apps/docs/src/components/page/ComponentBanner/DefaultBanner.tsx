import React from 'react';
import { useTheme } from '@coinbase/cds-web/hooks/useTheme';

export const DefaultBanner = () => {
  const { activeColorScheme } = useTheme();
  const isLight = activeColorScheme === 'light';
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
        viewBox="0 0 826 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4360_243)">
          <rect fill="rgb(var(--blue5))" height="200" width="826" x="0" y="0" />
          <rect fill="rgb(var(--blue15))" height="80.174" width="907.174" x="-41" y="51.7695" />
          <circle cx="344.994" cy="92.5932" fill="rgb(var(--blue20))" r="67.5932" />
          <path
            clipRule="evenodd"
            d="M358.944 148.447C390.165 116.647 428.412 77.0916 453.098 51.4199L599.294 199.619H409.027L409.029 199.621H224.782C228.407 197.77 287.708 136.099 316.906 105.495L358.944 148.447Z"
            fill={isLight ? 'rgb(var(--blue20))' : 'rgb(var(--blue70))'}
            fillRule="evenodd"
          />
          <mask
            height="81"
            id="mask0_4360_243"
            maskUnits="userSpaceOnUse"
            style={{ maskType: 'alpha' }}
            width="908"
            x="-41"
            y="52"
          >
            <rect fill="#012A82" height="80.174" width="907.174" x="-41" y="52.1836" />
          </mask>
          <g mask="url(#mask0_4360_243)">
            <circle
              cx="344.994"
              cy="93.0053"
              fill={isLight ? 'rgb(var(--blue5))' : 'rgb(var(--blue60))'}
              r="67.5932"
            />
            <path
              clipRule="evenodd"
              d="M358.945 148.858C390.166 117.059 428.412 77.5034 453.098 51.832L599.294 200.031H409.029L409.029 200.031H224.782C228.407 198.18 287.708 136.509 316.906 105.905L358.945 148.858Z"
              fill={isLight ? 'rgb(var(--blue50))' : 'rgb(var(--blue90))'}
              fillRule="evenodd"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4360_243">
            <rect fill="white" height="200" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
