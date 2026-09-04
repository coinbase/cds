import React from 'react';

export const PlaygroundBanner = () => {
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
        <g clipPath="url(#clip0_3950_617)">
          <rect fill="rgb(var(--purple5))" height="200" width="826" />
          <rect fill="rgb(var(--purple10))" height="200" width="569" x="129" />
          <rect fill="rgb(var(--purple30))" height="71" width="826" y="57" />
          <rect fill="rgb(var(--purple50))" height="71" rx="6.05405" width="432" x="197" y="57" />
          <line stroke="rgb(var(--purple90))" strokeWidth="4" x1="197" x2="629" y1="156" y2="156" />
          <rect fill="rgb(var(--purple15))" height="71" width="129" y="57" />
          <rect fill="rgb(var(--purple15))" height="71" width="129" x="698" y="57" />
        </g>
        <defs>
          <clipPath id="clip0_3950_617">
            <rect fill="white" height="200" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
