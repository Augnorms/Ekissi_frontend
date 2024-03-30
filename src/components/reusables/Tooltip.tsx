import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  style?: string;
  children: React.ReactNode;
  content: string | string[];
}

export const Tooltip: React.FC<TooltipProps> = ({
  style,
  children,
  content,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const childRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isShow && childRef.current && tooltipRef.current) {
      const childRect = childRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const top = childRect.top - tooltipRect.height;
      const left = childRect.left + childRect.width / 2 - tooltipRect.width / 2;

      setTooltipPosition({ top, left });
    }
  }, [isShow]);

  const onMouseEnter = () => {
    setIsShow(true);
  };

  const onMouseLeave = () => {
    setIsShow(false);
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ position: "relative" }}
    >
      <div
        ref={childRef}
        style={{ position: "relative", display: "inline-block" }}
      >
        {children}
        {isShow && (
          <div>
            <div
              ref={tooltipRef}
              style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
              className={`h-[100px] p-5 fixed z-[100] min-w-[10rem] 
              border-2 border-[#17191C] cursor-pointer rounded-md overflow-auto ${style}`}
            >
              <div>
                {Array.isArray(content) ? (
                  // If content is an array, render each item separately
                  content.map((item, index) => (
                    <div
                      className="bg-slate-300 rounded-md text-cyan-600 mb-1 p-1"
                      key={index}
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  // If content is a string, render it directly
                  <div className="bg-slate-300 rounded-md text-cyan-600 p-1">
                    {content}
                  </div>
                )}
              </div>
            </div>
            <div className="-mt-[2.9rem] flex justify-center mb-[1rem]">
              <img
                src="/images/tooltip-arrow-down.svg"
                alt="tooltip-arrow-down"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
