import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Decrypt } from "../components/helperfunctions/functions";
import { Avatar } from "../components/reusables/Avatar";

export const DigitalProfileView = () => {
  let params = useParams();

  useEffect(() => {
    params.id && console.log(Decrypt(params.id));
  });

  return (
    <div className="w-full h-screen bg-slate-100 p-10">
      <div className="w-[100%] h-[100%] shadow-xl rounded bg-white grid grid-cols-2 grid-rows-2 gap-2 p-2">
        <div className="w-full  shadow-lg p-2">
          <div className="w-full flex">
            <div className="rounded-md border-r-[3px] border-r-cyan-400 w-[25%] flex">
              <Avatar width={"200"} height={"200"} />
              <div
                className="w-10 h-10 rounded-full full shadow-lg relative right-12 z-2 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
              >
                <img src="/images/editicon.svg" alt="edit-icon" />
              </div>
            </div>
            <div className="w-full p-2">
              <p className="w-full text-center text-2xl font-bold">
                Members Details Page
              </p>
              {/* fullname */}
              <div className="w-full mt-10 flex gap-2">
                <div
                  className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
                >
                  <img src="/public/images/user.svg" alt="user-icon" />
                </div>
                <div className="w-[30%] font-bold flex items-center">
                  Full Name:
                </div>
                <div className="w-[50%] flex items-center"></div>
              </div>

              {/* email */}
              <div className="w-full mt-10 flex gap-2">
                <div
                  className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
                >
                  <img src="/images/email.svg" alt="email-icon" />
                </div>
                <div className="w-[30%] font-bold flex items-center">
                  Email:
                </div>
                <div className="w-[50%] flex items-center"></div>
              </div>
            </div>
          </div>

          {/* Primary Education */}
          <div className="w-full mt-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/notification.svg" alt="edu-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Primary Education:
            </div>
            <div className="w-[50%] flex items-center"></div>
          </div>

          {/* Secondary Education */}
          <div className="w-full mt-2 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/notification.svg" alt="edu-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Secondary Education:
            </div>
            <div className="w-[50%] flex items-center">
              Fiaseman snr high school
            </div>
          </div>

          {/* Tertiary Education */}
          <div className="w-full mt-5 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/notification.svg" alt="edu-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Tertiary Education:
            </div>
            <div className="w-[50%] flex items-center"></div>
          </div>
        </div>

        <div className="w-full shadow-lg pl-4">
          {/* Gender */}
          <div className="w-full mt-2 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/user.svg" alt="email-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">Gender:</div>
            <div className="w-[50%] flex items-center"></div>
          </div>

          {/* date of birth */}
          <div className="w-full mt-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/p-infor.svg" alt="date-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Date of Birth:
            </div>
            <div className="w-[50%] flex items-center"></div>
          </div>

          {/* Place of Birth */}
          <div className="w-full mt-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/public/images/placeofbirth.svg" alt="place-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Place of Birth:
            </div>
            <div className="w-[50%] flex items-center"></div>
          </div>

          {/* Nationality */}
          <div className="w-full mt-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/public/images/natioanlity.svg" alt="national" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Nationality:
            </div>
            <div className="w-[50%] flex items-center"></div>
          </div>

          {/* Phone Number */}
          <div className="w-full mt-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/public/images/phone.svg" alt="phone-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Phone Number:
            </div>
            <div className="w-[50%] flex items-center"></div>
          </div>
        </div>

        <div className="w-full shadow-lg pl-2">
          {/* Mothers Name */}
          <div className="w-full mt-2 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/female.svg" alt="female-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Mothers Name:
            </div>
            <div className="w-[50%] flex items-center"></div>
          </div>
          {/* Fathers Name */}
          <div className="w-full mt-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/public/images/male.svg" alt="father-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Fathers Name :
            </div>
            <div className="w-[50%] flex items-center"></div>
          </div>
          {/* Marital Status */}
          <div className="w-full mt-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/public/images/maritalStatus.svg" alt="marital-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Marital Status:
            </div>
            <div className="w-[50%] flex items-center"></div>
          </div>
          {/* Number of Children */}
          <div className="w-full mt-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/numberofchildren.svg" alt="email-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Number of Children:
            </div>
            <div className="w-[50%] flex items-center"></div>
          </div>

          {/* Home Town */}
          <div className="w-full mt-5 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/placeofbirth.svg" alt="place-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Home Town:
            </div>
            <div className="w-[50%] flex items-center"></div>
          </div>
        </div>

        <div className="w-full shadow-lg pl-2"></div>
      </div>
    </div>
  );
};
