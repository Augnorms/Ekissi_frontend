import { useState } from "react";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { AppsComponent } from "../components/reusables/AppsComponent";
import { DashboardComponent } from "../components/non-reusables/DashboardComponent";
import { SettingsComponent } from "../components/non-reusables/SettingsComponent";
import { HeirarchyComponent } from "../components/non-reusables/HeirarchyComponent";
import { AccountComponent } from "../components/non-reusables/AccountComponent";
import { MembersComponent } from "../components/non-reusables/MembersComponent";
import { useNavigate } from "react-router-dom";
import { Encrypt } from "../components/helperfunctions/functions";

export const DashboardView = () => {
  const [_LoginDialogue, setLoginDialogue] = useState<string>("");
  const [_openApps, setOpenApps] = useState<boolean>(false);
  const [page, setPage] = useState<string>("dashboard");
  const navigate = useNavigate();

  //use to handle the logout
  const handlechangeLogout = (_e: React.MouseEvent<HTMLDivElement>) => {
    setLoginDialogue(_e.currentTarget.id);
    console.log(_e.currentTarget.id);
  };

  //handles the digital information of a user by routing to the details page
  const handlechangeDigital = (_e: React.MouseEvent<HTMLDivElement>) => {
    setLoginDialogue(_e.currentTarget.id);
    navigate(`/profile/${Encrypt(_e.currentTarget.id)}`);
  };

  //tandle the apps component toggle behaviour
  const handleAppToggle = () => {
    setOpenApps(!_openApps);
  };

  //handles the selection of a selected app
  const selectedApp = (e: React.MouseEvent<HTMLDivElement>) => {
    setOpenApps(!_openApps);
    setPage(e.currentTarget.id);
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
          pagedisplayed={page}
        />
        
        <AppsComponent show={_openApps} selectedApp={selectedApp} />

        <div className="w-full h-[90%] p-5 bg-[url('/images/grey-image-bg.jpg')]">
          <div className="w-full h-[100%] shadow-lg bg-white rounded-lg">
            {page === "dashboard" ? (
              <DashboardComponent />
            ) : page === "settings" ? (
              <SettingsComponent />
            ) : page === "heirarchy" ? (
              <HeirarchyComponent />
            ) : (
              page === "Accounts" ? 
              <AccountComponent />
              : 
              page === "Members" ? <MembersComponent /> : 
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
