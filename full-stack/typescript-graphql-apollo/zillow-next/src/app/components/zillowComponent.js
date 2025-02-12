import React from 'react';

const ZillowLogo = ({ width = 100, height = 100, fill = '#006AFF' }) => {
  return (
    <svg
    className="logoSVG"
      width={width}
      height={height}
      viewBox="0 0 240 240" // Maintain aspect ratio
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Zillow Logo" // Accessibility
    >
      <path
        d="M120 0C53.7258 0 0 53.7258 0 120C0 186.274 53.7258 240 120 240C186.274 240 240 186.274 240 120C240 53.7258 186.274 0 120 0ZM176.87 154.12L120 192.48L63.13 154.12L120 115.76L176.87 154.12ZM120 27.52L188.8 72.76L120 118L51.2 72.76L120 27.52Z"
        fill={fill}
      />
    </svg>
  );
};

export default ZillowLogo;