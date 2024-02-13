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
        logo="/images/Ekissi2.PNG"
        label="Ekissi Family Leanage"
        navlist={["Home", "About", "Gallery", "Contact"]}
        loginoutlabel={false}
        loggedUserId="1"
        handlechangeLogout={handlechangeLogout}
        handlechangeDigital={handlechangeDigital}
      />
      <BackgroundDialogue
        status={_LoginDialogue === "login" ? true : false}
        backgroundColor="bg-black"
      >
        dhh
      </BackgroundDialogue>

      <div className="container mx-auto">
        <div className="mt-20  flex">
          <div className="w-1/2 h-[460px] p-2 flex justify-center items-center">
            <div className="w-3/4">
              <h2 className="font-semibold text-3xl">Ekissi Family Leanage</h2>
              <p className="mt-4 text-gray-500">
                Family, where life begins and love never ends. Cherish every
                moment, celebrate every milestone, and embrace the journey
                together. Our roots may be different, but our family tree is
                forever growing. Welcome to our space of love, laughter, and
                endless memories
              </p>
              <div
                className="
               w-[140px] rounded-tl-[8rem] rounded-br-[8rem] 
               text-center p-2 bg-[#37806B] text-white cursor-pointer 
               text-white mt-4 hover:bg-opacity-50"
              >
                CONTACT
              </div>
            </div>
          </div>
          <div className="w-1/2 h-[460px] p-2">
            <div className="h-[100%] border rounded-tl-[8rem] rounded-br-[8rem]">
              <div
                className="h-[100%] border border-red-500 rounded-tl-[8rem] rounded-br-[8rem] relative 
              -top-5 right-5"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
