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
import { useJwt } from "react-jwt";
import { DecodedToken } from "../Interfaces/usersInterface";
import { LoaderComponent } from "../components/reusables/LoaderComponent";

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
      localStorage.removeItem("page");
      localStorage.removeItem("component");
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
      localStorage.removeItem("page");
    }
  };

  //fetch all members
  const [listallMembers, setLisallMembers] = useState([]);
  const [listallAccounts, setListallAccount] = useState([]);
  const [listallHeirrarchy, setListallHeirrarchy] = useState([]);
  const [allmemcount, setAllmemcount] = useState(0);
  const [allfemalecount, setAllfemalecount] = useState(0);
  const [allmalecount, setAllmalecount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchmembers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}/fetchallmembers`,
      );
      setLisallMembers(response?.data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchmembers();
  }, []);

  const handleFetchaccounts = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}/getallaccounts`,
      );
      setListallAccount(response?.data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchaccounts();
  }, []);

  //get heirrarchy structure
  const handleHeirrarchy = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}/getallrelation`,
      );

      if (response) {
        setListallHeirrarchy(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleHeirrarchy();
  }, []);

  //handle members count
  const handleallmembercount = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}/allmemberscount`,
      );

      if (response) {
        setAllmemcount(response?.data?.count);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleallmembercount();
  }, []);

  //handle male count
  const handleallmalecount = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}/malecount`,
      );

      if (response) {
        setAllmalecount(response?.data?.count);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleallmalecount();
  }, []);

  //all female count
  const handleallfemalecount = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}/femalecount`,
      );

      if (response) {
        setAllfemalecount(response?.data?.count);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleallfemalecount();
  }, []);

  //decode token for users information
  const token = localStorage.getItem("token") ?? "";
  const { decodedToken } = useJwt(token) as {
    decodedToken: DecodedToken | null;
  };

  return (
    <>
      <LoaderComponent loaderTwo={isLoading} />

      <div className="  w-full h-screen ">
        <HeaderComponent
          logo="/images/Ekissi2.PNG"
          label="Ekissi Family Leanage"
          loginoutlabel={true}
          loggedUserId={String(decodedToken?.userid)}
          username={decodedToken?.fullname}
          handlechangeLogout={handlechangeLogout}
          handlechangeDigital={handlechangeDigital}
          handleAppToggle={handleAppToggle}
          pagedisplayed={page}
          displayAppIcon
          displaydropdownIcon
          loginUserimage={decodedToken?.image}
        />

        <AppsComponent
          show={_openApps}
          selectedApp={selectedApp}
          accesslevelname={
            decodedToken?.accesslevel?.accessLevelData?.accesslevelname
          }
        />

        <div className="w-full h-[90%] p-5 bg-[url('/images/grey-image-bg.jpg')]">
          <div className="w-full h-[100%] shadow-lg bg-white rounded-lg">
            {page === "dashboard" ? (
              <DashboardComponent
                allmemcount={allmemcount}
                allmalecount={allmalecount}
                allfemalecount={allfemalecount}
              />
            ) : page === "heirarchy" ? (
              <HeirarchyComponent
                listallMembers={listallMembers}
                listheirarchy={listallHeirrarchy}
                refetchHeirarchy={handleHeirrarchy}
              />
            ) : page === "Accounts" ? (
              <AccountComponent
                listallMembers={listallMembers}
                refetch={handleFetchaccounts}
                listallaccounts={listallAccounts}
              />
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
