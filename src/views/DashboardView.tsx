import { useEffect, useState } from "react";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { AppsComponent } from "../components/reusables/AppsComponent";
import { DashboardComponent } from "../components/non-reusables/DashboardComponent";
import { HeirarchyComponent } from "../components/non-reusables/HeirarchyComponent";
import { AccountComponent } from "../components/non-reusables/AccountComponent";
import { MembersComponent } from "../components/non-reusables/MembersComponent";
import { useNavigate } from "react-router-dom";
import { Encrypt } from "../components/helperfunctions/functions";
import axios from "axios";

export const DashboardView = () => {
  const [_openApps, setOpenApps] = useState<boolean>(false);
  const [page, setPage] = useState<string>(
    localStorage.getItem("page") || "dashboard",
  );
  const navigate = useNavigate();

  //use to handle the logout
  const handlechangeLogout = (_e: React.MouseEvent<HTMLDivElement>) => {
    if (_e.currentTarget.id === "logout") {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  //handles the digital information of a user by routing to the details page
  const handlechangeDigital = (_e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/profile/${Encrypt(_e.currentTarget.id)}digital`);
  };

  //tandle the apps component toggle behaviour
  const handleAppToggle = () => {
    setOpenApps(!_openApps);
  };

  //handles the selection of a selected app
  const selectedApp = (e: React.MouseEvent<HTMLDivElement>) => {
    setOpenApps(!_openApps);

    setPage(e.currentTarget.id);

    localStorage.setItem("page", e.currentTarget.id);

    if (e.currentTarget.id === "settings") {
      navigate("/settings");
    }
  };

  //fetch all members
  const [listallMembers, setLisallMembers] = useState([]);

  const handleFetchmembers = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_GET_ALL_MEMBERS);
      setLisallMembers(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleFetchmembers();
  }, []);

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
          displayAppIcon
          displaydropdownIcon
        />

        <AppsComponent show={_openApps} selectedApp={selectedApp} />

        <div className="w-full h-[90%] p-5 bg-[url('/images/grey-image-bg.jpg')]">
          <div className="w-full h-[100%] shadow-lg bg-white rounded-lg">
            {page === "dashboard" ? (
              <DashboardComponent />
            ) : page === "heirarchy" ? (
              <HeirarchyComponent />
            ) : page === "Accounts" ? (
              <AccountComponent />
            ) : page === "Members" ? (
              <MembersComponent listallMembers={listallMembers} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
