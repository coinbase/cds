import React from 'react';

export const ButtonBanner = () => {
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
        <g clipPath="url(#clip0_552_9560)">
          <rect
            fill="rgb(var(--blue5))"
            height="200"
            transform="translate(0 0.786133)"
            width="826"
          />
          <rect
            fill="rgb(var(--blue20))"
            height="414.286"
            rx="60.2031"
            width="388.413"
            x="218.794"
            y="-142.087"
          />
          <rect
            fill="rgb(var(--blue70))"
            height="60.3007"
            rx="30.1504"
            width="231.27"
            x="297.365"
            y="70.6357"
          />
          <rect
            fill="rgb(var(--blue15))"
            height="60.3007"
            rx="30.1504"
            width="231.27"
            x="-61.3652"
            y="70.6357"
          />
          <rect
            fill="rgb(var(--blue15))"
            height="60.3007"
            rx="30.1504"
            width="231.27"
            x="656.096"
            y="70.6357"
          />
          <path d="M348.498 100.786H477.502" stroke="rgb(var(--gray10))" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_552_9560">
            <rect fill="white" height="200" transform="translate(0 0.786133)" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
