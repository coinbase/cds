import React from 'react';

export const HStackBanner = () => {
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
        <g clipPath="url(#clip0_3862_296)">
          <rect
            fill="rgb(var(--yellow15))"
            height="200"
            transform="translate(0 0.43457)"
            width="826"
          />
          <rect fill="rgb(var(--yellow20))" height="200" width="355" x="237" />
          <rect fill="rgb(var(--yellow40))" height="118.84" rx="4" width="160.393" x="157" y="41" />
          <rect fill="rgb(var(--yellow20))" height="118.84" rx="4" width="160.393" x="-19" y="41" />
          <rect fill="rgb(var(--yellow20))" height="118.84" rx="4" width="160.393" x="686" y="41" />
          <rect
            fill="rgb(var(--yellow80))"
            height="118.84"
            rx="4"
            width="160.393"
            x="332.804"
            y="41"
          />
          <path
            d="M237 41H313C315.209 41 317 42.7909 317 45V156C317 158.209 315.209 160 313 160H237V41Z"
            fill="#rgb(var(--yellow60))"
          />
          <rect
            fill="rgb(var(--yellow40))"
            height="118.84"
            rx="4"
            width="160.393"
            x="509.607"
            y="41"
          />
          <path
            d="M592 160L513 160C510.791 160 509 158.209 509 156L509 45C509 42.7909 510.791 41 513 41L592 41L592 160Z"
            fill="#rgb(var(--yellow60))"
          />
          <path d="M333 100L493 100" stroke="rgb(var(--gray10))" strokeWidth="4" />
          <path d="M237 100L317 100" stroke="rgb(var(--gray10))" strokeWidth="4" />
          <path d="M157 100L237 100" stroke="rgb(var(--yellow20))" strokeWidth="4" />
          <path d="M0 100L141 100" stroke="rgb(var(--yellow15))" strokeWidth="4" />
          <path d="M685 100L826 100" stroke="rgb(var(--yellow15))" strokeWidth="4" />
          <path d="M509 100L592 100" stroke="rgb(var(--gray10))" strokeWidth="4" />
          <path d="M592 100L670 100" stroke="rgb(var(--yellow20))" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_3862_296">
            <rect fill="white" height="200" transform="translate(0 0.43457)" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
