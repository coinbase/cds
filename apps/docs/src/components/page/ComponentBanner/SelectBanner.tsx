import React from 'react';

export const SelectBanner = () => {
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
        <g clipPath="url(#clip0_4191_139)">
          <rect fill="rgb(var(--gray10))" height="200" width="826" />
          <rect fill="rgb(var(--gray15))" height="69" width="249" y="-13" />
          <rect fill="rgb(var(--gray15))" height="69" width="250" x="576" y="-13" />
          <rect fill="rgb(var(--gray20))" height="200" width="327" x="249" y="-0.43457" />
          <rect fill="rgb(var(--gray50))" height="87" width="327" x="249" y="-31" />
          <rect fill="rgb(var(--gray50))" height="2" width="327" x="249" y="112.565" />
          <rect fill="rgb(var(--gray50))" height="2" width="327" x="249" y="171.565" />
          <path
            clipRule="evenodd"
            d="M537 37.1177L524.057 24.1749L525.942 22.2892L537 33.3464L548.057 22.2892L549.942 24.1749L537 37.1177Z"
            fill="rgb(var(--gray10))"
            fillRule="evenodd"
          />
          <circle cx="277" cy="84.5654" fill="rgb(var(--gray50))" r="16" />
          <rect fill="rgb(var(--gray50))" height="32" width="248" x="305" y="68.5654" />
          <rect fill="rgb(var(--gray50))" height="32" width="195" x="305" y="128.018" />
          <rect
            fill="rgb(var(--gray50))"
            height="23.2795"
            transform="rotate(45 277.009 127.565)"
            width="23.2795"
            x="277.009"
            y="127.565"
          />
          <rect fill="rgb(var(--gray50))" height="32" width="248" x="305" y="188.565" />
          <rect fill="rgb(var(--gray50))" height="28" rx="8" width="28" x="263" y="188.565" />
        </g>
        <defs>
          <clipPath id="clip0_4191_139">
            <rect fill="white" height="200" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
