import { HeaderProps } from "../../Interfaces/HeaderInterface";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../reusables/Avatar";

export const HeaderComponent = (props: HeaderProps) => {
  const [ismobile, setIsmobile] = useState<boolean>(false);
  const [controlNav, setControlNav] = useState<boolean>(false);

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

  return (
    <>
      {!ismobile ? (
        <div className="w-full p-2 flex shadow-sm">
          <div className="w-[50rem] font-bold text-base p-1 flex gap-2">
            <Avatar logo={props.logo} />
            <div className="mt-4">{props.label}</div>
          </div>

          {!props.loginoutlabel ? (
            <div className="w-[200rem] p-2 flex justify-end">
              {props?.navlist?.map((data, idx) => (
                <div
                  className="mt-3 p-2 cursor-pointer hover:border-b
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
                              ? "/contact"
                              : "/"
                    }
                  >
                    <span className="m-4">{data}</span>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-[200rem] p-2 flex justify-end gap-2">
              <Avatar logo="u" />

              <div className="font-bold text-base p-1 mt-3">
                bbbkhhfhdfvidfvh
              </div>
            </div>
          )}

          <div className="w-[40rem] text-base p-2 flex">
            <div
              className="
              w-[8rem] mt-3 p-2 text-center 
              shadow-md rounded-tl-[8rem]
              rounded-br-[8rem]
              cursor-pointer
            "
              id={props.loginoutlabel ? "logout" : "login"}
              onClick={props.handlechange}
            >
              {props.loginoutlabel ? "Logout" : "Login"}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full overflow-auto">
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
                              ? "/contact"
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
              shadow-md rounded-tl-[8rem]
              rounded-br-[8rem]
              cursor-pointer
            "
                id={props.loginoutlabel ? "logout" : "login"}
                onClick={props.handlechange}
              >
                {props.loginoutlabel ? "Logout" : "Login"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
