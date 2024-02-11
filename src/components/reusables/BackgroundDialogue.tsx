import React from "react";

interface BackgroundDialogueProps {
  children?: React.ReactNode;
}

interface Props {
  status?: boolean;
  backgroundColor?: string;
}

export const BackgroundDialogue = ({
  status,
  backgroundColor, 
  children,
}: Props & BackgroundDialogueProps) => {

  return (
    <div
      className={`
        w-full h-screen 
        fixed inset-0 ${backgroundColor} 
        bg-opacity-50 flex items-center 
        justify-center`}
      style={{
        position: "fixed",
        top: status ? "0vh" : "-100vh",
        transition: "top 0.3s ease",
        zIndex:"30"
      }}
    >
      {children}
    </div>
  );
};
