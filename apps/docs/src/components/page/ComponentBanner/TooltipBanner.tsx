import React from 'react';

export const TooltipBanner = () => {
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
        <g clipPath="url(#clip0_4232_29878)">
          <rect fill="rgb(var(--pink10))" height="200" width="826" />
          <rect fill="rgb(var(--pink20))" height="98" width="826" y="67" />
          <rect fill="rgb(var(--pink30))" height="200" width="344" x="241" />
          <rect fill="rgb(var(--pink50))" height="98" width="344" x="241" y="67" />
          <path
            d="M413.5 51.5C422.616 51.5 430 44.1163 430 35C430 25.8837 422.616 18.5 413.5 18.5C404.384 18.5 397 25.8837 397 35C397 44.1163 404.384 51.5 413.5 51.5ZM412.125 25.375H414.875V28.125H412.125V25.375ZM412.125 30.875H414.875V44.625H412.125V30.875Z"
            fill="rgb(var(--pink60))"
          />
          <rect fill="rgb(var(--pink90))" height="63" rx="16" width="261" x="283" y="83.5" />
          <line
            stroke="rgb(var(--gray10))"
            strokeWidth="4"
            x1="320"
            x2="508"
            y1="113.5"
            y2="113.5"
          />
        </g>
        <defs>
          <clipPath id="clip0_4232_29878">
            <rect fill="white" height="200" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
