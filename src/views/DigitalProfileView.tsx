import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Decrypt } from "../components/helperfunctions/functions";
import { Avatar } from "../components/reusables/Avatar";
import axios from "axios";
import { UserDetails } from "../Interfaces/usersInterface";
import { ErrorBlock } from "../components/reusables/ErrorBlock";
import { SuccessBlock } from "../components/reusables/SuccessBlock";

export const DigitalProfileView = () => {
  let params = useParams();
  const [listallMembers, setLisallMembers] = useState<UserDetails[]>([]);
  const [userid, setUserid] = useState<number>(0);
  const [mainUser, setMainUser] = useState<string | undefined>("");
  const [profileimage, setProfileimage] = useState<string>("");

  const [updateid, setUpdateid] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [successBlockStatus, setSuccessBlockStatus] = useState<boolean>(false);
  const [errorBlockStatus, setErrorBlockStatus] = useState<boolean>(false);
  const [blockMessage, setBlockMessage] = useState<string>("");

  useEffect(() => {
    params.id && setUserid(Number(Decrypt(params.id)));
    setMainUser(params?.id && params?.id.split("=")[1]); //checking if the params contains digital
  });

  //fetch all members
  const handleFetchmembers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}/fetchallmembers`,
      );
      setLisallMembers(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  //fetch users image
  const fetchmembersprofileImage = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}/fetchmemberprofileimage`,
        {
          req_id: String(userid),
        },
      );

      if (response) {
        setUpdateid(response?.data?.imageid);
        setProfileimage(response?.data?.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

useEffect(() => {
  handleFetchmembers();
}, []);

useEffect(() => {
  fetchmembersprofileImage();
}, [userid]); // Add userid to the dependency array to trigger the effect whenever userid changes

  //find a users detailed information
  const usersDetails = listallMembers?.find((info) => info?.id === userid);

  //handling image upload here
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener(
      "change",
      handleInputChange as unknown as EventListener,
    );
    input.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && files.length > 0) {
      const selectedImage = files[0];

      if(profileimage === ""){
        //create image
        handleUploads(selectedImage as Blob);
      }else{
        //update image
        handleUpdateUploads(selectedImage as Blob);
      }
    }
  };

  const handleUploads = async (imageparam: Blob) => {
    try {
      setIsLoading(true);
      const data = new FormData();

      // Append file and upload preset to FormData for each file
      data.append("file", imageparam as Blob);
      data.append("upload_preset", "ekissicloud");
      data.append("cloud_name", "dkpqdqz3i");

      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        data,
      );

      const fileUrl = response.data.secure_url;

      if (response && fileUrl) {
        const uploadResponse = await axios.post(
          `${import.meta.env.VITE_ENDPOINT}/createprofileimage`,
          {
            memberId: String(userid),
            image: fileUrl,
          },
        );

        if (uploadResponse && uploadResponse?.data?.status === true) {
          setSuccessBlockStatus(true);
          setBlockMessage(uploadResponse?.data?.message);
          setTimeout(() => {
            setSuccessBlockStatus(false);
            setBlockMessage("");
          }, 3000);
          setProfileimage(uploadResponse?.data?.data?.image);
        }
      }
    } catch (error: any) {
      console.error(error);
      setErrorBlockStatus(true);
      setBlockMessage(error.message);
      setTimeout(() => {
        setErrorBlockStatus(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  //update profile image
  const handleUpdateUploads = async (imageparam: Blob) => {
    try {
      setIsLoading(true);
      const data = new FormData();

      // Append file and upload preset to FormData for each file
      data.append("file", imageparam as Blob);
      data.append("upload_preset", "ekissicloud");
      data.append("cloud_name", "dkpqdqz3i");

      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        data,
      );

      const fileUrl = response.data.secure_url;

      if (response && fileUrl) {
        const uploadResponse = await axios.put(
          `${import.meta.env.VITE_ENDPOINT}/updateprofileimage`,
          {
            updateId: updateid,
            image: fileUrl,
          },
        );

        if (uploadResponse && uploadResponse?.data?.status === true) {
          setSuccessBlockStatus(true);
          setBlockMessage(uploadResponse?.data?.message);
          setTimeout(() => {
            setSuccessBlockStatus(false);
            setBlockMessage("");
          }, 3000);
          setProfileimage(uploadResponse?.data?.data?.image);
        }
      }
    } catch (error: any) {
      console.error(error);
      setErrorBlockStatus(true);
      setBlockMessage(error.message);
      setTimeout(() => {
        setErrorBlockStatus(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-100 p-10">
      <SuccessBlock blockControl={successBlockStatus} message={blockMessage} />
      <ErrorBlock blockControl={errorBlockStatus} message={blockMessage} />
      <div className="w-[100%] h-[100%] shadow-xl rounded bg-white grid grid-cols-2 grid-rows-2 gap-2 p-2">
        <div className="w-full  shadow-lg p-2 overflow-auto">
          <div className="w-full flex">
            <div className="rounded-md border-r-[3px] border-r-cyan-400 w-[25%] flex">
              <Avatar
                width={"150"}
                height={"150"}
                loading={isLoading}
                logo={profileimage}
              />
              {mainUser === "digital" && (
                <div
                  className="w-10 h-10 rounded-full full shadow-lg relative right-12 z-2 
                  flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
                  onClick={handleImageUpload}
                >
                  <img src="/images/editicon.svg" alt="edit-icon" />
                </div>
              )}
            </div>
            <div className="w-full p-2">
              <p className="w-full text-center text-2xl font-bold underline">
                Members Details Page
              </p>
              {/* fullname */}
              <div className="w-full mt-10 flex gap-2">
                <div
                  className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
                >
                  <img src="/images/user.svg" alt="user-icon" />
                </div>
                <div className="w-[30%] font-bold flex items-center">
                  Full Name:
                </div>
                <div className="w-[50%] flex items-center text-cyan-500">
                  {usersDetails?.firstname + " " + usersDetails?.lastname}
                </div>
              </div>

              {/* email */}
              <div className="w-full mt-5 flex gap-2">
                <div
                  className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
                >
                  <img src="/images/email.svg" alt="email-icon" />
                </div>
                <div className="w-[30%] font-bold flex items-center">
                  Email:
                </div>
                <div className="w-[50%] flex items-center text-cyan-500">
                  {usersDetails?.email ? usersDetails?.email : "N/A"}
                </div>
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
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.primaryeducation
                ? usersDetails?.primaryeducation
                : "N/A"}
            </div>
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
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.secondaryeducation
                ? usersDetails?.secondaryeducation
                : "N/A"}
            </div>
          </div>

          {/* Tertiary Education */}
          <div className="w-full mt-2 mb-5 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/notification.svg" alt="edu-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Tertiary Education:
            </div>
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.tertiaryeducation
                ? usersDetails?.tertiaryeducation
                : "N/A"}
            </div>
          </div>
        </div>

        <div className="w-full shadow-lg pl-4 overflow-auto">
          {/* Gender */}
          <div className="w-full mt-2 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/user.svg" alt="email-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">Gender:</div>
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.gender ? usersDetails?.gender : "N/A"}
            </div>
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
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.dateofbirth ? usersDetails?.dateofbirth : "N/A"}
            </div>
          </div>

          {/* Place of Birth */}
          <div className="w-full mt-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/placeofbirth.svg" alt="place-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Place of Birth:
            </div>
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.placeofbirth ? usersDetails?.placeofbirth : "N/A"}
            </div>
          </div>

          {/* Nationality */}
          <div className="w-full mt-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/natioanlity.svg" alt="national" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Nationality:
            </div>
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.nationality ? usersDetails?.nationality : "N/A"}
            </div>
          </div>

          {/* Phone Number */}
          <div className="w-full mt-10 mb-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/phone.svg" alt="phone-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Phone Number:
            </div>
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.phonenumber ? usersDetails?.phonenumber : "N/A"}
            </div>
          </div>
        </div>

        <div className="w-full shadow-lg pl-2 overflow-auto">
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
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.mothersname ? usersDetails?.mothersname : "N/A"}
            </div>
          </div>
          {/* Fathers Name */}
          <div className="w-full mt-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/male.svg" alt="father-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Fathers Name :
            </div>
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.fathersname ? usersDetails?.fathersname : "N/A"}
            </div>
          </div>
          {/* Marital Status */}
          <div className="w-full mt-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/maritalStatus.svg" alt="marital-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Marital Status:
            </div>
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.maritalstatus
                ? usersDetails?.maritalstatus
                : "N/A"}
            </div>
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
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.numberofchildren
                ? usersDetails?.numberofchildren
                : "N/A"}
            </div>
          </div>

          {/* Home Town */}
          <div className="w-full mt-10 mb-10 flex gap-2">
            <div
              className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
            >
              <img src="/images/placeofbirth.svg" alt="place-icon" />
            </div>
            <div className="w-[30%] font-bold flex items-center">
              Home Town:
            </div>
            <div className="w-[50%] flex items-center text-cyan-500">
              {usersDetails?.hometown ? usersDetails?.hometown : "N/A"}
            </div>
          </div>
        </div>

        <div className="w-full shadow-lg pl-2 overflow-auto">
          <div>
            <div className="w-full pl-2 mt-1 flex gap-2">
              <div
                className="w-10 h-10 rounded-full full shadow-lg 
                flex justify-center items-center border border-cyan-500 hover:scale-[1.2] cursor-pointer"
              >
                <img src="/images/placeofbirth.svg" alt="place-icon" />
              </div>
              <div className="w-[30%] font-bold flex items-center">
                Occupation:
              </div>
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-1 mt-4 ">
            {usersDetails?.occupation &&
            Number(usersDetails.occupation) !== 0 ? (
              JSON.parse(usersDetails.occupation as any).map(
                (job: any, index: any) => (
                  <div
                    key={index}
                    className="w-[100%] h-[180px] rounded shadow-xl border bg-opacity-50 bg-cyan-900 text-white"
                  >
                    <div className="text-center p-5 underline">
                      {job.nameofcompany}
                    </div>
                    <div>
                      <div className="flex justify-center">
                        <img src="/images/calender.svg" alt="date-icon" />
                        <p className="ml-2">{job.startdate}</p>
                      </div>
                      <div className="flex justify-center">
                        <img src="/images/calender.svg" alt="date-icon" />
                        <p className="ml-2">
                          {job.enddate ? job.enddate : "Current"}
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <img src="/images/manager.svg" alt="date-icon" />
                        <p className="ml-2">{job.position}</p>
                      </div>
                    </div>
                  </div>
                ),
              )
            ) : (
              <div className="w-full">
                <div className="w-[100%] shadow-md rounded">
                  <div className="flex justify-center p-4">
                    <img src="/images/emptystat.svg" alt="empty-icon" />
                  </div>
                  <div className="text-center p-4">
                    No occupation data available
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
