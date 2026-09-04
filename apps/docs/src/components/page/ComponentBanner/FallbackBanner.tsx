import React from 'react';

export const FallbackBanner = () => {
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
        <g clipPath="url(#clip0_3862_130)">
          <rect
            fill="rgb(var(--gray15))"
            height="200"
            transform="translate(0 0.43457)"
            width="826"
          />
          <path
            d="M0.5 0.00369263L477.215 0.00144958L340.5 207.001L0.5 207.001V0.00369263Z"
            fill="rgb(var(--gray20))"
          />
          <circle cx="282" cy="71" fill="rgb(var(--gray40))" r="21" />
          <path
            d="M327 54C327 51.7909 328.791 50 331 50H562C564.209 50 566 51.7909 566 54V88C566 90.2091 564.209 92 562 92H331C328.791 92 327 90.2091 327 88V54Z"
            fill="rgb(var(--gray40))"
          />
          <path
            d="M327 112C327 109.791 328.791 108 331 108H441C443.209 108 445 109.791 445 112V146C445 148.209 443.209 150 441 150H331C328.791 150 327 148.209 327 146V112Z"
            fill="rgb(var(--gray40))"
          />
          <mask
            height="207"
            id="mask0_3862_130"
            maskUnits="userSpaceOnUse"
            style={{ maskType: 'alpha' }}
            width="477"
            x="0"
            y="0"
          >
            <path
              d="M0 0.00222778L476.715 -1.52588e-05L340 207L0 207V0.00222778Z"
              fill="rgb(var(--gray80))"
            />
          </mask>
          <g mask="url(#mask0_3862_130)">
            <path
              d="M302.5 70.9985C302.5 82.5965 293.098 91.9985 281.5 91.9985C269.902 91.9985 260.5 82.5965 260.5 70.9985C260.5 59.4006 269.902 49.9985 281.5 49.9985C293.098 49.9985 302.5 59.4006 302.5 70.9985Z"
              fill="rgb(var(--gray80))"
            />
            <path
              d="M326.5 53.9985C326.5 51.7894 328.291 49.9985 330.5 49.9985H561.5C563.709 49.9985 565.5 51.7894 565.5 53.9985V87.9985C565.5 90.2077 563.709 91.9985 561.5 91.9985H330.5C328.291 91.9985 326.5 90.2077 326.5 87.9985V53.9985Z"
              fill="rgb(var(--gray80))"
            />
            <path
              d="M326.5 111.999C326.5 109.789 328.291 107.999 330.5 107.999H440.5C442.709 107.999 444.5 109.789 444.5 111.999V145.999C444.5 148.208 442.709 149.999 440.5 149.999H330.5C328.291 149.999 326.5 148.208 326.5 145.999V111.999Z"
              fill="rgb(var(--gray80))"
            />
          </g>
          <path d="M341 207L479 -1.99999" stroke="#FEFFFF" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_3862_130">
            <rect fill="white" height="200" transform="translate(0 0.43457)" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
