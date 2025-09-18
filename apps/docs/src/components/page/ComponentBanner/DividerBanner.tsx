import React from 'react';

export const DividerBanner = () => {
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
        <g clipPath="url(#clip0_3513_10019)">
          <rect
            fill="rgb(var(--pink5))"
            height="200"
            transform="translate(0 0.43457)"
            width="826"
          />
          <circle cx="413" cy="107.018" fill="#7E1E6F" r="205.916" />
          <circle cx="413" cy="107.018" fill="rgb(var(--pink40))" r="131.937" />
          <path d="M207 101L619 101" stroke="rgb(var(--gray10))" strokeWidth="4" />
          <path d="M619 100L826 100" stroke="rgb(var(--pink40))" strokeWidth="4" />
          <path d="M0 101L207 101" stroke="rgb(var(--pink40))" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_3513_10019">
            <rect fill="white" height="200" transform="translate(0 0.43457)" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
