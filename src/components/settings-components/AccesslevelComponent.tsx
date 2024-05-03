import { Inputs } from "../reusables/formcomponent/Inputs";
import { TextArea } from "../reusables/formcomponent/TextArea";
import { Checkbox } from "../reusables/formcomponent/Checkbox";
import { Multiselect } from "../reusables/formcomponent/Multiselect";
import Button from "../reusables/formcomponent/Button";
import { BackgroundDialogue } from "../reusables/BackgroundDialogue";
import TableComponent from "../reusables/TableComponent";
import { CloseDiagComp } from "../reusables/CloseDiagComp";
import { useState } from "react";
import { AvatarList } from "../reusables/AvatarList";
import axios from "axios";
import { SuccessBlock } from "../reusables/SuccessBlock";
import { ErrorBlock } from "../reusables/ErrorBlock";
import Dropdown from "../reusables/ActionComponent";
import { DeleteDialogue } from "../reusables/DeleteDialogue";

interface ListMembers {
  [x: string]: string | number;
  firtname: string;
  lastname: string;
  email: string;
  gender: string;
  children: number;
}

interface AccessLevel {
  id: number;
  accesslevelname: string;
  accessleveldescription: string;
  AccesslevelView: boolean;
  AccesslevelManage: boolean;
  UserverificationView: boolean;
  UserverificationManage: boolean;
  AddmembersView: boolean;
  AddmembersManage: boolean;
  ManageaboutView: boolean;
  ManageaboutViewManage: boolean;
  ManagegalleryView: boolean;
  ManagegalleryManage: boolean;
  ManageaccountView: boolean;
  ManageaccountManage: boolean;
  ManagebioView: boolean;
  ManagebioManage: boolean;
  users: { id: number; name: string }[];
}

type Prop = {
  listallMembers?: ListMembers[];
  listallaccesslevel?: AccessLevel[];
  refetch?: () => void;
};

export const AccesslevelComponent = (props: Prop) => {
  const [updateid, setUpdatieid] = useState<number>(0);
  const [deleteid, setdeleteid] = useState<number>(0);
  const [accesslevename, setAccesslevelname] = useState<string>("");
  const [accessleveldescription, setAccessleveldescription] =
    useState<string>("");
  const [accesslevelView, setAccesslevelView] = useState<boolean>(false);
  const [accesslevelManage, setAccesslevelManage] = useState<boolean>(false);
  const [userverificationView, setUserverificationView] =
    useState<boolean>(false);
  const [userverificationManage, setUserverificationManage] =
    useState<boolean>(false);
  const [addMembersView, setAddMembersView] = useState<boolean>(false);
  const [addMembersManage, setAddMembersManage] = useState<boolean>(false);
  const [manageAboutView, setManageAboutView] = useState<boolean>(false);
  const [manageAboutViewManage, setManageAboutViewManage] =
    useState<boolean>(false);
  const [manageGalleryView, setManageGalleryView] = useState<boolean>(false);
  const [manageGalleryManage, setManageGalleryManage] =
    useState<boolean>(false);
  const [manageAccountView, setManageAccountView] = useState<boolean>(false);
  const [manageAccountManage, setManageAccountManage] =
    useState<boolean>(false);
  const [manageBioView, setManageBioView] = useState<boolean>(false);
  const [manageBioManage, setManageBioManage] = useState<boolean>(false);
  const [assignedMembers, setAssignedMembers] = useState<
    { id: string | number; label: string }[] | { id: number; name: string }[]
  >([]);

  const [popupdelete, setPopupdelete] = useState<boolean>(false);
  const [successStatus, setSuccessStatus] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [blockMessage, setBlockMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editmode, setEditMode] = useState<boolean>(false);

  const members = props?.listallMembers?.map((data) => {
    return {
      id: data.id.toString(),
      label: `${data.firstname} ${data.lastname}`,
    };
  });

  //table content here..
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropDownId, setDropDownId] = useState<number>(0);
  const handleMouseClick = (param: number) => {
    setIsDropdownOpen(true);
    setDropDownId(param);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleCancelDiag = () => {
    setPopupdelete(false);
  };

  const headers = [
    { key: "accesslevelname", label: "Accesslevelname" },
    { key: "members", label: "Members" },
    { key: "action", label: "Action" },
  ];

  const renderCellContent = (headerKey: string, item: Record<string, any>) => {
    switch (headerKey) {
      case "accesslevelname":
        return <div className="whitespace-nowrap">{item.accesslevelname}</div>;

      case "members":
        if (Array.isArray(item.users)) {
          return (
            <div className="whitespace-nowrap">
              <AvatarList
                avatarArray={item.users.map((member: any) => ({
                  logo: "",
                  initials: member.label,
                }))}
                width="35"
                height="35"
                sliceFirstIdx={0}
                sliceSecondIdx={2}
              />
            </div>
          );
        }
        break;

      case "action":
        function emitAction(_id: string | number, _label: string): void {
          if (_label === "Edit") {
            const foundAccessLevel = props.listallaccesslevel?.find(
              (access) => access.id === _id,
            );
            if (foundAccessLevel) {
              setUpdatieid(foundAccessLevel.id);
              setAccesslevelname(foundAccessLevel.accesslevelname);
              setAccessleveldescription(
                foundAccessLevel.accessleveldescription,
              );
              setAccesslevelView(foundAccessLevel.AccesslevelView);
              setAccesslevelManage(foundAccessLevel.AccesslevelManage);
              setUserverificationView(foundAccessLevel.UserverificationView);
              setUserverificationManage(
                foundAccessLevel.UserverificationManage,
              );
              setAddMembersView(foundAccessLevel.AddmembersView);
              setAddMembersManage(foundAccessLevel.AddmembersManage);
              setManageAboutView(foundAccessLevel.ManageaboutView);
              setManageAboutViewManage(foundAccessLevel.ManageaboutViewManage);
              setManageGalleryView(foundAccessLevel.ManagegalleryView);
              setManageGalleryManage(foundAccessLevel.ManagegalleryManage);
              setManageAccountView(foundAccessLevel.ManageaccountView);
              setManageAccountManage(foundAccessLevel.ManageaccountManage);
              setManageBioView(foundAccessLevel.ManagebioView);
              setManageBioManage(foundAccessLevel.ManagebioManage);
              setAssignedMembers(foundAccessLevel.users);
              setIsOpen(false);
              setEditMode(true);
            }
          }

          if (_label === "Delete") {
            setPopupdelete(true);
            setdeleteid(Number(_id));
          }
        }

        return (
          <div className="whitespace-nowrap">
            <img
              src="/images/flatEclipse.svg"
              alt="eclipse"
              className="cursor-pointer"
              onClick={() => handleMouseClick(item.id)}
            />
            <div className="absolute right-[60px]">
              {isDropdownOpen && dropDownId === item.id && (
                <Dropdown
                  onMouseLeave={handleMouseLeave}
                  dropdownItems={[
                    {
                      id: item.id,
                      image: "/images/editicon.svg",
                      label: "Edit",
                      dataCy: "edit",
                    },
                    {
                      id: item.id,
                      image: "/images/delete.svg",
                      label: "Delete",
                      dataCy: "delete",
                    },
                  ]}
                  emitAction={emitAction}
                />
              )}
            </div>
          </div>
        );
    }
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  //handling accesslevel change here...
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;

    if (id === "accesslevelname") {
      setAccesslevelname(value);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const id = e.target.id;
    const value = e.currentTarget.value;

    if (id === "accessdescription") {
      setAccessleveldescription(value);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;

    if (id === "view-access") {
      setAccesslevelView(!accesslevelView);
    } else if (id === "manage-access") {
      setAccesslevelManage(!accesslevelManage);
    } else if (id === "view-verify") {
      setUserverificationView(!userverificationView);
    } else if (id === "manage-verify") {
      setUserverificationManage(!userverificationManage);
    } else if (id === "view-member") {
      setAddMembersView(!addMembersView);
    } else if (id === "manage-member") {
      setAddMembersManage(!addMembersManage);
    } else if (id === "view-about") {
      setManageAboutView(!manageAboutView);
    } else if (id === "manage-about") {
      setManageAboutViewManage(!manageAboutViewManage);
    } else if (id === "view-gallery") {
      setManageGalleryView(!manageGalleryView);
    } else if (id === "manage-gallery") {
      setManageGalleryManage(!manageGalleryManage);
    } else if (id === "view-account") {
      setManageAccountView(!manageAccountView);
    } else if (id === "manage-account") {
      setManageAccountManage(!manageAccountManage);
    } else if (id === "view-bio") {
      setManageBioView(!manageBioView);
    } else if (id === "manage-bio") {
      setManageBioManage(!manageBioManage);
    }
  };

  const handleOnSelect = (
    selectedOptions: { id: number | string; label: string }[],
  ) => {
    setAssignedMembers(selectedOptions);
  };

  //handle creating access level here
  const handleaccesslevelcreation = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}/createaccesslevel`,
        {
          accesslevelname: accesslevename,
          accessleveldescription: accessleveldescription,
          AccesslevelView: accesslevelView,
          AccesslevelManage: accesslevelManage,
          UserverificationView: userverificationManage,
          UserverificationManage: userverificationManage,
          AddmembersView: addMembersView,
          AddmembersManage: addMembersManage,
          ManageaboutView: manageAboutView,
          ManageaboutViewManage: manageAboutViewManage,
          ManagegalleryView: manageGalleryView,
          ManagegalleryManage: manageGalleryManage,
          ManageaccountView: manageAccountView,
          ManageaccountManage: manageAccountManage,
          ManagebioView: manageBioView,
          ManagebioManage: manageBioManage,
          users: assignedMembers,
        },
      );

      if (result && result.data.code === 200) {
        setSuccessStatus(true);
        setBlockMessage(result.data.message);
        setTimeout(() => {
          setSuccessStatus(false);
          setBlockMessage("");
          props.refetch && props.refetch();
        }, 3000);
      }
      resetStates();
    } catch (error: any) {
      setErrorStatus(true);
      setBlockMessage(error.message);
      setTimeout(() => {
        setErrorStatus(false);
        setBlockMessage("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  //handling edit mutation of access level
  const handleEditaccesslevel = async () => {
    try {
      setIsLoading(true);

      let response = await axios.put(
        `${import.meta.env.VITE_ENDPOINT}/updateaccesslevel`,
        {
          update_id: updateid,
          accesslevelname: accesslevename,
          accessleveldescription: accessleveldescription,
          AccesslevelView: accesslevelView,
          AccesslevelManage: accesslevelManage,
          UserverificationView: userverificationManage,
          UserverificationManage: userverificationManage,
          AddmembersView: addMembersView,
          AddmembersManage: addMembersManage,
          ManageaboutView: manageAboutView,
          ManageaboutViewManage: manageAboutViewManage,
          ManagegalleryView: manageGalleryView,
          ManagegalleryManage: manageGalleryManage,
          ManageaccountView: manageAccountView,
          ManageaccountManage: manageAccountManage,
          ManagebioView: manageBioView,
          ManagebioManage: manageBioManage,
          users: assignedMembers,
        },
      );

      if (response && response.data.code === 200) {
        setSuccessStatus(true);
        setBlockMessage(response.data.message);
        setTimeout(() => {
          setSuccessStatus(false);
          setBlockMessage("");
          props.refetch && props.refetch();
        }, 3000);
      }
      resetStates();
    } catch (error: any) {
      setErrorStatus(true);
      setBlockMessage(error.message);
      setTimeout(() => {
        setErrorStatus(false);
        setBlockMessage("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  //handle delete dialog
  const handleDelete = async () => {
    try {
      setIsLoading(true);

      let response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}/deletaccesslevel`,
        {
          user_id: deleteid,
        },
      );

      if (response && response.data.code === 200) {
        setSuccessStatus(true);
        setBlockMessage(response.data.message);
        setTimeout(() => {
          setSuccessStatus(false);
          setPopupdelete(false); //this for delete dialogue
          setIsOpen(false);//for table
          setBlockMessage("");
          props.refetch && props.refetch();
        }, 3000);
      }
    } catch (error: any) {
      setErrorStatus(true);
      setBlockMessage(error.message);
      setTimeout(() => {
        setErrorStatus(false);
        setBlockMessage("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const [clearMulti, setClearMulti] = useState<boolean>(false);

  const resetStates = () => {
    setAccesslevelname("");
    setAccessleveldescription("");
    setAccesslevelView(false);
    setAccesslevelManage(false);
    setUserverificationView(false);
    setUserverificationManage(false);
    setAddMembersView(false);
    setAddMembersManage(false);
    setManageAboutView(false);
    setManageAboutViewManage(false);
    setManageGalleryView(false);
    setManageGalleryManage(false);
    setManageAccountView(false);
    setManageAccountManage(false);
    setManageBioView(false);
    setManageBioManage(false);
    setAssignedMembers([]);
    setClearMulti(false);
  };

  return (
    <>
      <SuccessBlock blockControl={successStatus} message={blockMessage} />
      <ErrorBlock blockControl={errorStatus} message={blockMessage} />
      <DeleteDialogue
        text="this access level"
        popup={popupdelete}
        loading={isLoading}
        onCancel={handleCancelDiag}
        onDelete={handleDelete}
      />

      <div className="w-full  bg-slate-100 p-5">
        <div className="w-full grid grid-cols-3 h-[80vh] shadow-xl gap-1">
          <div className="w-full bg-white overflow-auto">
            <div className="p-2 font-bold underline text-xl">
              {editmode ? "Edit Access Level" : "Create Access Level"}
            </div>

            <div className=" p-2">
              <Inputs
                type="text"
                style="w-full 
              border-2
              border-cyan-300
              h-8 rounded-xl
              text-gray-500 
              outline-cyan-300
              p-5
              placeholder:text-sm
              "
                id={"accesslevelname"}
                labelOne="Access level name:"
                placeholder="Enter your access level name..."
                onChange={handleChange}
                value={accesslevename}
              />
            </div>

            <div className="mt-2 p-2">
              <TextArea
                style="w-full 
              border-2
              border-cyan-300
              rounded-xl
              text-gray-500 
              outline-cyan-300
              p-5
              placeholder:text-sm
              "
                placeholder="Enter access level description here..."
                label="Access level description:"
                id="accessdescription"
                onChange={handleTextChange}
                value={accessleveldescription}
              />
            </div>
          </div>

          <div className="w-full p-2 overflow-auto">
            <div className="p-2 font-bold underline text-md">
              {editmode ? "Edit Manage Access Level" : "Manage Access Level"}
            </div>
            <div className="w-full flex">
              <div className="text-sm font-bold w-1/2 pl-2">Access level</div>
              <div className="text-sm w-1/2 flex gap-10">
                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="View"
                  id="view-access"
                  isChecked={accesslevelView}
                  labelStyle="text-cyan-500"
                  onSelect={handleSelect}
                />

                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="Manage"
                  id="manage-access"
                  labelStyle="text-cyan-500"
                  isChecked={accesslevelManage}
                  onSelect={handleSelect}
                />
              </div>
            </div>

            <div className="w-full flex mt-5">
              <div className="text-sm font-bold w-1/2 pl-2">
                User verification
              </div>
              <div className="text-sm w-1/2 flex gap-10">
                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="View"
                  id="view-verify"
                  labelStyle="text-cyan-500"
                  isChecked={userverificationView}
                  onSelect={handleSelect}
                />

                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="Manage"
                  id="manage-verify"
                  labelStyle="text-cyan-500"
                  isChecked={userverificationManage}
                  onSelect={handleSelect}
                />
              </div>
            </div>

            <div className="w-full flex mt-5">
              <div className="text-sm font-bold w-1/2 pl-2">Add members</div>
              <div className="text-sm w-1/2 flex gap-10">
                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="View"
                  id="view-member"
                  labelStyle="text-cyan-500"
                  isChecked={addMembersView}
                  onSelect={handleSelect}
                />

                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="Manage"
                  id="manage-member"
                  labelStyle="text-cyan-500"
                  isChecked={addMembersManage}
                  onSelect={handleSelect}
                />
              </div>
            </div>

            <div className="w-full flex mt-5">
              <div className="text-sm font-bold w-1/2 pl-2">Manage about</div>
              <div className="text-sm w-1/2 flex gap-10">
                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="View"
                  id="view-about"
                  labelStyle="text-cyan-500"
                  isChecked={manageAboutView}
                  onSelect={handleSelect}
                />

                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="Manage"
                  id="manage-about"
                  labelStyle="text-cyan-500"
                  isChecked={manageAboutViewManage}
                  onSelect={handleSelect}
                />
              </div>
            </div>

            <div className="w-full flex mt-5">
              <div className="text-sm font-bold w-1/2 pl-2">Manage gallery</div>
              <div className="text-sm w-1/2 flex gap-10">
                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="View"
                  id="view-gallery"
                  labelStyle="text-cyan-500"
                  isChecked={manageGalleryView}
                  onSelect={handleSelect}
                />

                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="Manage"
                  id="manage-gallery"
                  labelStyle="text-cyan-500"
                  isChecked={manageGalleryManage}
                  onSelect={handleSelect}
                />
              </div>
            </div>

            <div className="w-full flex mt-5">
              <div className="text-sm font-bold w-1/2 pl-2">Manage account</div>
              <div className="text-sm w-1/2 flex gap-10">
                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="View"
                  id="view-account"
                  labelStyle="text-cyan-500"
                  isChecked={manageAccountView}
                  onSelect={handleSelect}
                />

                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="Manage"
                  id="manage-account"
                  labelStyle="text-cyan-500"
                  isChecked={manageAccountManage}
                  onSelect={handleSelect}
                />
              </div>
            </div>

            <div className="w-full flex mt-5">
              <div className="text-sm font-bold w-1/2 pl-2">Manage bio</div>
              <div className="text-sm w-1/2 flex gap-10">
                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="View"
                  id="view-bio"
                  labelStyle="text-cyan-500"
                  isChecked={manageBioView}
                  onSelect={handleSelect}
                />

                <Checkbox
                  style="
                focus:ring-[#F2BEAB] 
                accent-pink-500
                md:accent-pink-500
                focus:accent-pink-500
                cursor-pointer
                "
                  label="Manage"
                  id="manage-bio"
                  labelStyle="text-cyan-500"
                  isChecked={manageBioManage}
                  onSelect={handleSelect}
                />
              </div>
            </div>
          </div>

          <div className="w-full bg-white p-2 overflow-auto">
            <div className="text-sm font-bold w-full mb-5 flex justify-between">
              <div className="underline flex items-center">
                {editmode ? "Edit Assign Members" : "Assign Members"}
              </div>
              <div className="flex gap-2">
                <Button
                  buttonLabel="Cancel"
                  className="border w-full p-2 
                rounded text-white bg-red-600"
                  onClick={resetStates}
                />

                <Button
                  buttonLabel="table"
                  className="border w-full p-2 
                rounded text-white bg-cyan-800"
                  onClick={handleClose}
                />

                <Button
                  buttonLabel={editmode ? "update" : "create"}
                  className="border w-full p-2 
                  rounded text-white bg-cyan-400"
                  loading={isLoading}
                  disabled={accesslevename === ""}
                  onClick={
                    editmode ? handleEditaccesslevel : handleaccesslevelcreation
                  }
                />
              </div>
            </div>

            <Multiselect
              data={members}
              placeholder="Select Members"
              label={"Members"}
              style="border-2 border-cyan-300"
              dropdownstyle="border-2 border-cyan-300 mb-1"
              onSelect={handleOnSelect}
              updateOptions={assignedMembers}
              clear={clearMulti}
            />
          </div>
        </div>
        <BackgroundDialogue status={isOpen} backgroundColor="bg-black">
          <div className="w-[70%] h-[600px] bg-white p-2 rounded overflow-auto">
            <CloseDiagComp
              styles="flex justify-end -mt-2"
              onClick={handleClose}
            />

            <div className="p-10">
              <TableComponent
                headers={headers}
                items={props.listallaccesslevel || []}
                renderCellContent={renderCellContent}
              />
            </div>
          </div>
        </BackgroundDialogue>
      </div>
    </>
  );
};
