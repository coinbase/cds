import React from 'react';

export const GettingStartedBanner = () => {
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
        <g clipPath="url(#clip0_552_9695)">
          <rect
            fill="rgb(var(--green5))"
            height="731.529"
            rx="54.9505"
            width="844.864"
            x="0.210938"
            y="-258.746"
          />
          <circle cx="413" cy="107.018" fill="rgb(var(--green15))" r="205.916" />
          <circle cx="989.952" cy="107.019" fill="rgb(var(--green15))" r="245.616" />
          <circle cx="-163.953" cy="107.019" fill="rgb(var(--green15))" r="245.616" />
          <circle cx="413" cy="107.018" fill="rgb(var(--green40))" r="131.937" />
          <circle cx="413" cy="100.434" fill="rgb(var(--green70))" r="79.1084" />
          <path
            d="M375.327 99.2194L400.674 124.913L450.673 75.9558"
            stroke="rgb(var(--gray10))"
            strokeWidth="4"
          />
        </g>
        <defs>
          <clipPath id="clip0_552_9695">
            <rect fill="white" height="200" transform="translate(0 0.434326)" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
