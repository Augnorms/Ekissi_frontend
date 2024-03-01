import { useEffect, useState } from "react";

interface Props {
  rotate?: string;
  size?: string;
  color?:string;
}

export const CircularProgressBar = (props: Props) => {
  const { rotate, size, color } = props;
  const [percentage, setPercentage] = useState<string>("0");
  const [circleWidth, setCircleWidth] = useState<number>(0);
  const radius = 0.4 * circleWidth; 
  const strokeWidth = 0.06 * circleWidth; 
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * Number(percentage)) / 100;

  const handlePercentage = () => {
    rotate !== undefined && setPercentage(rotate);
  };

  useEffect(() => {
    handlePercentage();
  }, [rotate]);

  useEffect(() => {
    if(size === "extrasmall"){
        setCircleWidth(80);
    }
    else if (size === "small") {
      setCircleWidth(100);
    }else if(size === "medium"){
        setCircleWidth(150);
    }else if(size === "large"){
        setCircleWidth(200);
    }
  }, [circleWidth]);

  return (
    <div
      className="relative"
      style={{ width: `${circleWidth}px`, height: `${circleWidth}px` }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={`${strokeWidth}px`}
          r={radius}
          style={{
            fill: "none",
            stroke: "grey",
          }}
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={`${strokeWidth}px`}
          r={radius}
          style={{
            fill: "none",
            stroke: color,
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          className={
            size === "extrasmall"
              ? "font-bold text-[1rem]"
              : size === "small"
                ? "font-bold text-[1.3rem]"
                : size === "medium"
                  ? "font-bold text-[1.8rem]"
                  : "font-bold text-[2rem]"
          }
        >
          {percentage}%
        </text>
      </svg>

      <input
        className="hidden"
        type="range"
        min={"0"}
        max={"100"}
        step={"1"}
        value={percentage}
        onChange={(env) => setPercentage(env.target.value)}
      />
    </div>
  );
};
