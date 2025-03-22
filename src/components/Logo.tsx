import React from "react";

const Logo: React.FC<{ size?: number }> = ({ size = 50 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="logo"
    >
      <circle cx="50" cy="50" r="40" fill="white" />
      <text
        x="50%"
        y="55%"
        fontSize="32"
        fill="black"
        fontFamily="Arial"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        CS
      </text>
    </svg>
  );
};

export default Logo;
