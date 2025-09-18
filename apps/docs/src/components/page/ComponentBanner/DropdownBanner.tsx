import React from 'react';

export const DropdownBanner = () => {
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
        <g clipPath="url(#clip0_3513_10059)">
          <rect
            fill="rgb(var(--orange5))"
            height="200"
            transform="translate(0 0.43457)"
            width="826"
          />
          <rect fill="rgb(var(--orange10))" height="55" width="249" y="1" />
          <rect fill="rgb(var(--orange10))" height="55" width="250" x="576" y="1" />
          <rect fill="rgb(var(--orange20))" height="200" width="327" x="249" />
          <rect fill="rgb(var(--orange50))" height="55" width="327" x="249" y="1" />
          <path d="M286 152L542 152" stroke="var(--color-fg)" strokeWidth="4" />
          <path d="M286 105L542 105" stroke="var(--color-fg)" strokeWidth="4" />
          <path
            clipRule="evenodd"
            d="M537 37.5522L524.057 24.6094L525.942 22.7238L537 33.781L548.057 22.7238L549.942 24.6094L537 37.5522Z"
            fill="rgb(var(--gray10))"
            fillRule="evenodd"
          />
        </g>
        <defs>
          <clipPath id="clip0_3513_10059">
            <rect fill="white" height="200" transform="translate(0 0.43457)" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
