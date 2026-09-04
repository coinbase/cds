import React from 'react';

export const ModalBanner = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg
        fill="none"
        height="201"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
        }}
        viewBox="0 0 826 201"
        width="826"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_3950_631)">
          <rect fill="rgb(var(--pink5))" height="200" width="826" />
          <rect fill="rgb(var(--pink15))" height="70" width="826" y="30" />
          <rect fill="rgb(var(--pink20))" height="216.147" width="253.709" x="274.919" />
          <path
            clipRule="evenodd"
            d="M274.92 100.165V29.6533H528.629V100.165H274.92Z"
            fill="rgb(var(--pink40))"
            fillRule="evenodd"
          />
          <path d="M304.902 116.97H505.233" stroke="#101114" strokeWidth="2" />
          <path d="M304.902 135.751H505.233" stroke="#101114" strokeWidth="2" />
          <rect
            fill="rgb(var(--pink90))"
            height="27.6308"
            rx="13.8154"
            transform="matrix(1 0 0 -1 339.136 182.266)"
            width="132.437"
          />
        </g>
        <defs>
          <clipPath id="clip0_3950_631">
            <rect fill="white" height="200" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
