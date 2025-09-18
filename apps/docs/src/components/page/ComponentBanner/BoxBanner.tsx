import React from 'react';

export const BoxBanner = () => {
  // const { colorScheme } = useDocsTheme(); // If tokens are different for dark mode, we can use this
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
        <g clipPath="url(#clip0_3511_25336)">
          <rect
            fill="rgb(var(--gray15))"
            height="200"
            transform="translate(0 0.434326)"
            width="826"
          />
          <rect fill="rgb(var(--gray20))" height="200" width="657" x="85" />
          <path
            d="M159 43C159 34.1634 166.163 27 175 27H652C660.837 27 668 34.1634 668 43V157C668 165.837 660.837 173 652 173H175C166.163 173 159 165.837 159 157V43Z"
            fill="rgb(var(--gray40))"
          />
          <path
            d="M234 77C234 68.1634 241.163 61 250 61H576C584.837 61 592 68.1634 592 77V123C592 131.837 584.837 139 576 139H250C241.163 139 234 131.837 234 123V77Z"
            fill="rgb(var(--gray80))"
          />
          <path d="M283 101L543 101" stroke="rgb(var(--gray10))" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_3511_25336">
            <rect fill="white" height="200" transform="translate(0 0.434326)" width="826" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
