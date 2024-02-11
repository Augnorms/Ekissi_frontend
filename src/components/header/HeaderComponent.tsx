
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../reusables/Avatar";
import { LogoutDialogue } from "../reusables/LogoutDialogue";
import { useLocation } from "react-router-dom";
import { AvatarList } from "../reusables/AvatarList";

export interface HeaderProps {
  logo?: string;
  label?: string;
  navlist?: string[];
  loginoutlabel?: boolean;
  loggedUserId?: string;
  avatarArray?: { logo: string; initials: string }[];
  handlechangeLogout?: (e: React.MouseEvent<HTMLDivElement>) => void;
  handlechangeDigital?: (e: React.MouseEvent<HTMLDivElement>) => void;
  handlesearch?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const HeaderComponent = (props: HeaderProps) => {
  const [ismobile, setIsmobile] = useState<boolean>(false);
  const [controlNav, setControlNav] = useState<boolean>(false);
  const [logDialStatus, setlogDialStatus] = useState<boolean>(false);
  const [enablesearch, setEnablesearch] = useState<boolean>(false);

  const router = useLocation();

  const checkWindowSize = () => {
    setIsmobile(window.innerWidth <= 900);
  };

  const handleNavigation = () => {
    setControlNav(!controlNav);
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);

    checkWindowSize();

    //component didunmout
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  const hanldeDisplayLogDiag = ()=>{
    setlogDialStatus(!logDialStatus);
  };

  const hanldeDisplayLog = ()=>{
    setlogDialStatus(!logDialStatus)
  };

  const handlesearch = ()=>{
    setEnablesearch(!enablesearch);
  };

  return (
    <>
      {!ismobile ? (
        <div className="w-full flex shadow-sm">
          {/* Desktop view */}

          <div className="w-[50rem] font-bold flex gap-2 items-center">
            <Avatar logo={props.logo} />
            <div className="">{props.label}</div>
          </div>

          {!props.loginoutlabel ? (
            <div className="w-[200rem] p-3 flex justify-end items-center">
              {enablesearch && router.pathname === "/gallery" && (
                <div className="mr-44">search</div>
              )}

              {props?.navlist?.map((data, idx) => (
                <div
                  className="p-2 cursor-pointer hover:border-b-2
                  border-b-cyan-400
                hover:text-cyan-300 
               "
                  key={idx}
                >
                  <Link
                    to={
                      idx === 0
                        ? "/"
                        : idx === 1
                          ? "/about"
                          : idx === 2
                            ? "/gallery"
                            : idx === 3
                              ? "#contact"
                              : "/"
                    }
                  >
                    <span className="m-4">{data}</span>
                  </Link>
                </div>
              ))}

              {router.pathname === "/" && (
                <div className="border-l-2 border-l-cyan-400 pl-2">
                  <div
                    className="
                    w-[8rem] p-2 text-center 
                    shadow-md rounded-tl-[8rem]
                    rounded-br-[8rem]
                    cursor-pointer hover:bg-cyan-400 hover:text-white
                   "
                    id={!props.loginoutlabel && "login"}
                    onClick={props.handlechangeLogout}
                  >
                    {!props.loginoutlabel && "Login"}
                  </div>
                </div>
              )}

              {router.pathname === "/gallery" && (
                <div className="border-l-2 border-l-cyan-400 pl-2">
                  <div
                    className="
                    w-[8rem] p-2 text-center 
                    shadow-md rounded-tl-[8rem]
                    rounded-br-[8rem]
                    cursor-pointer hover:bg-cyan-400 hover:text-white
                    flex gap-2
                   "
                    id="search"
                    onClick={handlesearch}
                  >
                    <img src="/images/searchIcon.svg" /> search
                  </div>
                </div>
              )}

              {router.pathname === "/about" && (
                <div className="border-l-2 border-l-cyan-400 pl-2">
                  <div
                    className="
                    w-[8rem] p-2 text-center 
                    cursor-pointer
                    flex gap-2
                   "
                    id="search"
                    onClick={handlesearch}
                  >
                    <AvatarList
                      width="10"
                      height="10"
                      avatarArray={props.avatarArray}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-[200rem] p-2 flex justify-end items-center gap-2 ">
              <div className="w-[80%] text-base p-2 flex justify-end">
                bbbkhhfhdfvidfvh
              </div>

              <div className="w-[20%] text-base p-2 flex justify-end gap-3">
                <Avatar />
                <img
                  className="cursor-pointer"
                  src="/images/arrowdown.svg"
                  onClick={hanldeDisplayLogDiag}
                />
              </div>

              <LogoutDialogue
                onMouseclick={hanldeDisplayLog}
                logStatus={props.loginoutlabel}
                handleChangeLogout={props.handlechangeLogout}
                handleChangeDigital={props.handlechangeDigital}
                loggedUserId={props.loggedUserId}
                show={logDialStatus}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full overflow-auto">
          {/* Mobile view */}

          <div className="w-full font-bold text-base p-1 flex gap-4 shadow-md">
            <Avatar logo={props.logo} handlechange={handleNavigation} />

            <div className="mt-1 w-[90%] flex justify-between gap-20">
              <div className="w-[70%] text-center mt-1 p-2">{props.label}</div>
              <Avatar logo={""} initials={""} />
            </div>
          </div>

          <div
            className="w-[50%] p-1 shadow-md bg-[#fff]"
            style={{
              position: "absolute",
              height: "50vh",
              top: "68px",
              left: controlNav ? "0%" : "-50%",
              transition: "left 0.3s ease",
              zIndex: "20",
            }}
          >
            <div className="w-full p-2">
              {props?.navlist?.map((data, idx) => (
                <div
                  className="mt-3 p-2 cursor-pointer hover:border-b
                hover:text-cyan-300
               "
                  key={idx}
                  onClick={handleNavigation}
                >
                  <Link
                    to={
                      idx === 0
                        ? "/"
                        : idx === 1
                          ? "/about"
                          : idx === 2
                            ? "/gallery"
                            : idx === 3
                              ? "#contact"
                              : "/"
                    }
                  >
                    <span className="m-4">{data}</span>
                  </Link>
                </div>
              ))}
            </div>

            <hr />

            <div className="w-[40rem] text-base p-2">
              <div
                className="
                  w-[8rem] mt-3 p-2 text-center 
                  shadow-md rounded-sm
                  cursor-pointer text-cyan-400
                  hover:bg-cyan-400 hover:text-white
                "
                id={!props.loginoutlabel ? "login" : undefined}
                onClick={props.handlechangeLogout}
              >
                {!props.loginoutlabel && "login"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
