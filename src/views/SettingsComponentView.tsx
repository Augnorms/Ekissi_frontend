import { useEffect, useState } from "react";
import { AddMembersComponent } from "../components/settings-components/AddMembersComponent";
import { AccesslevelComponent } from "../components/settings-components/AccesslevelComponent";
import { UserVerificationComponent } from "../components/settings-components/UserVerificationComponent";
import { ManageAboutComponent } from "../components/settings-components/ManageAboutComponent";
import { ManageGalleryComponent } from "../components/settings-components/ManageGalleryComponent";
import axios from "axios";
import { HeaderComponent } from "../components/header/HeaderComponent";


export const SettingsComponent = () => {

  const [components, setComponents] = useState<string>("accesslevel");
  const [listallMembers, setLisallMembers] = useState([]);


  //handle component displayed in the settings area
  const handleComponents = (event: React.MouseEvent<HTMLSpanElement>) => {
    const targetId = event.currentTarget.id;
    setComponents(targetId);
  };

  //fetch all members
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
    <div className="w-full h-[100%] p-2">
      <HeaderComponent
        logo="/images/Ekissi2.PNG"
        label="Ekissi Family Leanage"
        loginoutlabel={true}
        username={"Augustine Normanyo"}
      />
      <div className="w-full h-[50px] p-1 shadow-md overflow-y-auto flex gap-2">
        <span
          id="accesslevel"
          className="p-2 flex items-center cursor-pointer rounded bg-blue-200
           hover:bg-gradient-to-r from-indigo-500 hover:scale-75"
          onClick={handleComponents}
        >
          access_level
        </span>

        <span
          id="userverification"
          className="p-2 flex items-center cursor-pointer rounded bg-blue-200
          hover:bg-gradient-to-r from-indigo-500 hover:scale-75"
          onClick={handleComponents}
        >
          users_verifications
        </span>

        <span
          id="addmembers"
          className="p-2 flex items-center cursor-pointer rounded bg-blue-200
          hover:bg-gradient-to-r from-indigo-500 hover:scale-75"
          onClick={handleComponents}
        >
          add_members
        </span>

        <span
          id="manageabout"
          className="p-2 flex items-center cursor-pointer rounded bg-blue-200
          hover:bg-gradient-to-r from-indigo-500 hover:scale-75"
          onClick={handleComponents}
        >
          Manage_About
        </span>

        <span
          id="managegallery"
          className="p-2 flex items-center cursor-pointer rounded bg-blue-200
          hover:bg-gradient-to-r from-indigo-500 hover:scale-75"
          onClick={handleComponents}
        >
          Manage_Gallery
        </span>
      </div>

      {components === "addmembers" ? (
        <AddMembersComponent listallMembers={listallMembers} refetch={handleFetchmembers}/>
      ) : components === "accesslevel" ? (
        <AccesslevelComponent />
      ) : components === "userverification" ? (
        <UserVerificationComponent />
      ) : components === "manageabout" ? (
        <ManageAboutComponent />
      ) : components === "managegallery" ? (
        <ManageGalleryComponent />
      ) : (
        "accesslevel"
      )}
    </div>
  );
};
