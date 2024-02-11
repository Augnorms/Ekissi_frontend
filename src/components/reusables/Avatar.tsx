import React from "react";

interface AvatarProps {
  logo?: string;
  initials?: string;
  handlechange?: () => void;
  width?: string;
  height?: string;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { logo, initials, handlechange, width="40" , height="40"  } = props;

  return (
    <div
      className={`rounded-full flex justify-center items-center shadow-lg`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {logo && logo !== "null" ? (
        <img
          src={logo}
          className={`rounded-full border`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          alt="User Avatar"
          onClick={handlechange}
        />
      ) : (
        <span className="text-xl font-bold">{initials}</span>
      )}
    </div>
  );
};
