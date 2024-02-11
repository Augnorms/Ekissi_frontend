import React from "react";

interface AvatarProps {
  logo?: string;
  initials?: string;
  handlechange?: () => void;
  width?: string;
  height?: string;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { logo, initials, handlechange, width = "14", height = "14" } = props;

  return (
    <div
      className={`w-${width} h-${height} rounded-full flex justify-center items-center shadow-lg`}
    >
      {logo && logo !== "null" ? (
        <img
          src={logo}
          className={`w-${width} h-${height} rounded-full`}
          alt="User Avatar"
          onClick={handlechange}
        />
      ) : (
        <span className="text-xl font-bold">{initials}</span>
      )}
    </div>
  );
};
