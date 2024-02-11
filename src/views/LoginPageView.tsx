import { useState } from "react";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { BackgroundDialogue } from "../components/reusables/BackgroundDialogue";


export const LoginPageView = () => {
  const [_LoginDialogue, setLoginDialogue] = useState<string>("");

  const handlechangeLogout = (_e: React.MouseEvent<HTMLDivElement>) => {
    setLoginDialogue(_e.currentTarget.id);
    console.log(_e.currentTarget.id);
  };

  const handlechangeDigital = (_e: React.MouseEvent<HTMLDivElement>) => {
    setLoginDialogue(_e.currentTarget.id);
    console.log(_e.currentTarget.id);
  };

  return (
    <div className="w-full h-screen">
      <HeaderComponent
        logo="/images/logo.svg"
        label="Ekissi Family Leanage"
        navlist={["Home", "About", "Gallery", "Contact"]}
        loginoutlabel={true}
        loggedUserId="1"
        handlechangeLogout={handlechangeLogout}
        handlechangeDigital={handlechangeDigital}
      />
      everyday with God {_LoginDialogue}
      <BackgroundDialogue
        status={_LoginDialogue === "login" ? true : false}
        backgroundColor="bg-slate-100"
      >
        dhh
      </BackgroundDialogue>

    </div>
  );
};
