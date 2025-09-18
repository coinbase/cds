import React from 'react';

export const ButtonGroupBanner = () => {
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
        <g clipPath="url(#clip0_3513_9941)">
          <rect
            fill="rgb(var(--indigo5))"
            height="200"
            transform="translate(0 0.43457)"
            width="826"
          />
          <rect fill="rgb(var(--indigo15))" height="200" width="409" x="209" />
          <rect fill="rgb(var(--indigo30))" height="96" width="409" x="209" y="52" />
          <rect fill="rgb(var(--indigo10))" height="96" width="208" x="618" y="52" />
          <rect fill="rgb(var(--indigo10))" height="96" width="208" x="1" y="52" />
          <rect fill="rgb(var(--indigo80))" height="60" rx="30" width="139.216" x="266" y="70" />
          <path d="M296.757 100H374.459" stroke="rgb(var(--gray10))" strokeWidth="4" />
          <rect
            fill="rgb(var(--indigo50))"
            height="60"
            rx="30"
            width="139.216"
            x="421.216"
            y="70"
          />
          <path d="M451.973 100H529.674" stroke="rgb(var(--gray10))" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_3513_9941">
            <rect fill="white" height="200" transform="translate(0 0.43457)" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
