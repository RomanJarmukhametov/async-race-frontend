function Logo() {
  return (
    <svg
      width="400"
      height="100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="gradient1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            style={{ stopColor: '#b3b3b3', stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: '#666666', stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="#f0f0f0"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="48"
        fill="url(#gradient1)"
      >
        Async Race
      </text>
    </svg>
  );
}

export default Logo;
