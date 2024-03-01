import { useState } from "react";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { AppsComponent } from "../components/reusables/AppsComponent";
import { CircularProgressBar } from "../components/reusables/CircularProgressBar";
// import { LoaderComponent } from "../components/reusables/LoaderComponent";

export const DashboardView = () => {
  const [_LoginDialogue, setLoginDialogue] = useState<string>("");
  const [_openApps, setOpenApps] = useState<boolean>(false);

  const handlechangeLogout = (_e: React.MouseEvent<HTMLDivElement>) => {
    setLoginDialogue(_e.currentTarget.id);
    console.log(_e.currentTarget.id);
  };

  const handlechangeDigital = (_e: React.MouseEvent<HTMLDivElement>) => {
    setLoginDialogue(_e.currentTarget.id);
    console.log(_e.currentTarget.id);
  };

  const handleAppToggle = () => {
    setOpenApps(!_openApps);
  };

  const selectedApp = (e: React.MouseEvent<HTMLDivElement>) => {
    setOpenApps(!_openApps);
    console.log(e.currentTarget.id);
  };

  return (
    <>
      <div className="w-full h-screen ">
        <HeaderComponent
          logo="/images/Ekissi2.PNG"
          label="Ekissi Family Leanage"
          loginoutlabel={true}
          loggedUserId={"1"}
          username={"Augustine Normanyo"}
          handlechangeLogout={handlechangeLogout}
          handlechangeDigital={handlechangeDigital}
          handleAppToggle={handleAppToggle}
        />
        <AppsComponent show={_openApps} selectedApp={selectedApp} />
        <CircularProgressBar rotate="10" size="large" color="deeppink" />
        <CircularProgressBar rotate="70" size="small" color="dodgerblue" />
        {/* <LoaderComponent />    */}
     
      </div>
    </>
  );
};
