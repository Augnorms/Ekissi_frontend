import React from "react";

interface BackgroundDialogueProps {
  children?: React.ReactNode;
}

interface Props {
  status?: boolean;
}

export const BackgroundDialogue = ({status, children}: Props & BackgroundDialogueProps) => {
  return (
    <div
      className="
        w-full h-screen 
        fixed inset-0 bg-black 
        bg-opacity-50 flex items-center 
        justify-center"
      style={{
        position: "fixed",
        top: status ? "0vh" : "-100vh",
        transition: "top 0.3s ease",
      }}
    >
      {children}
    </div>
  );
};
