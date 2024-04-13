import React from "react";
import { getInitials } from "../../components/helperfunctions/functions";
import { ButtonSpinner } from "./Spinner";

interface AvatarProps {
  logo?: string;
  initials?: string;
  handlechange?: () => void;
  width?: string;
  height?: string;
  classStyle?: string;
  loading?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  logo,
  initials,
  handlechange,
  width = "40",
  height = "40",
  classStyle,
  loading,
}) => {
  return (
    <div
      className={`rounded-full flex justify-center items-center shadow-lg ${
        classStyle || ""
      }`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {loading ? (
        <ButtonSpinner />
      ) : logo && logo !== "null" ? (
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
        <span className="text-xl font-bold">{getInitials(initials)}</span>
      )}
    </div>
  );
};
