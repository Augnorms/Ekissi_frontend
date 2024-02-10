import { useState } from "react";
import { HeaderComponent } from "../components/header/HeaderComponent";
// import { useLocation } from "react-router-dom";
import { BackgroundDialogue } from "../components/reusables/BackgroundDialogue";

export const LoginPageView = () => {
//   const route = useLocation()
const [_LoginDialogue, setLoginDialogue] = useState<string>("");

const handlechange = (_e: React.MouseEvent<HTMLDivElement>) => {
  setLoginDialogue(_e.currentTarget.id);
};

  return (
    <div className="w-full h-screen">
      <HeaderComponent
        logo="/images/logo.svg"
        label="Ekissi Family Leanage"
        navlist={["Home", "About", "Gallery", "Contact"]}
        loginoutlabel={false}
        handlechange={handlechange}
      />

      everyday with God {_LoginDialogue}

      <BackgroundDialogue status={true}>
        bcgc
      </BackgroundDialogue>
    </div>
  );
};
