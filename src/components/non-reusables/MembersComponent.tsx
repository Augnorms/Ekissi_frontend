import { useState } from "react";
import { SearchComp } from "../reusables/formcomponent/SearchComp";
// import { Select } from "../reusables/formcomponent/Select";
import { Avatar } from "../reusables/Avatar";
import { SkeletalLoader } from "../reusables/SkeletalLoader";
import Dropdown from "../reusables/ActionComponent";
import { Encrypt } from "../helperfunctions/functions";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "../reusables/Tooltip";

interface ListMembers {
  [x: string]: string | number;
  firtname: string;
  lastname: string;
  email: string;
  gender: string;
  children: number;
  image:string;
}

type Prop = {
  listallMembers?: ListMembers[];
  refetch?: () => void;
};

export const MembersComponent = (props:Prop) => {
 
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState<string>("");
  // const [selected, setSelected] = useState<string>("");

  const handlesearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchVal(value);
  };

  const emitAction = (id:string|number)=>{
    navigate(`/profile/${Encrypt(String(id))}`);
  }

  //handling table actions
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropDownId, setDropDownId] = useState<number>(0);
  const handleMouseClick = (param: number) => {
    setIsDropdownOpen(true);
    setDropDownId(param);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full h-[100%] p-10 overflow-auto">
      <div className="flex gap-1">
        <p className="font-extrabold text-xl">Members Count</p>
        <span className="mt-1 font-extrabold">
          ({props.listallMembers?.length})
        </span>
      </div>
      <div className="mt-4 mb-4 text-sm">
        <p>
          This page shows a list of all family members both alive and deceased
        </p>
      </div>

      <div className="w-full mt-5 mb-5 flex justify-between">
        <div className="w-[20%]">
          <SearchComp
            classStyle="ring-2 ring-cyan-500 p-2 rounded-xl border"
            handlesearch={handlesearch}
            value={searchVal}
          />
        </div>

        <div className="w-[15%] flex gap-2 ">
          {/* <p className="mt-4 mr-2">Filter</p> */}
          {/* <Select
            placeholder="Select your status"
            style="w-full ring-2 ring-cyan-500 p-1.5 rounded-xl border"
            data={[
              { id: "1", name: "alive" },
              { id: "2", name: "deceased" },
            ]}
            onChange={handleSelect}
            value={selected}
          /> */}
        </div>
      </div>
      <hr />
      <div className="mt-4 w-full grid grid-cols-4 p-2 gap-1">
        {props.listallMembers?.length &&
          props.listallMembers
            ?.filter((member) =>
              `${member.firstname} ${member.lastname}`
                .toLowerCase()
                .includes(searchVal.toLowerCase()),
            )
            .map((member, idx) => (
              <div
                className="w-full border rounded-md shadow-md grid grid-cols-2 grid-rows-1 relative"
                key={idx}
              >
                <div className="w-full flex justify-center p-2">
                  <Avatar
                    width="100"
                    height="100"
                    logo={member.image}
                    initials={member.firstname + " " + member.lastname}
                  />
                </div>
                <div className="w-full p-2">
                  <Tooltip
                    content={`${member.firstname} ${member.lastname}`}
                    style="bg-white border"
                  >
                    <div className="w-full p-2 text-md font-bold">
                      {`${member.firstname} ${member.lastname}`.slice(0, 16) +
                        "..."}
                    </div>
                  </Tooltip>
                  <Tooltip content={member.email} style="bg-white border">
                    <div className="w-full p-2 text-sm cursor-pointer">
                      {member.email.slice(0, 15) + "..."}
                    </div>
                  </Tooltip>
                  <div className="w-full p-2 text-sm">
                    {member.phonenumber ? member.phonenumber : "N/A"}
                  </div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <div
                    className="w-[60%] 
                      text-center border 
                      p-2 rounded cursor-pointer 
                      hover:bg-cyan-300
                      hover:text-white
                    "
                    onClick={() => emitAction(member.id)}
                  >
                    view
                  </div>
                </div>
                <div className="w-full flex justify-end items-end p-4 mb-4">
                  <img
                    className="cursor-pointer"
                    src="/images/flatEclipse.svg"
                    alt="flateclipse"
                    onClick={() => handleMouseClick(Number(member.id))}
                  />
                </div>
                <div className="absolute top-32 right-4">
                  {isDropdownOpen && dropDownId === member.id && (
                    <Dropdown
                      onMouseLeave={handleMouseLeave}
                      dropdownItems={[
                        {
                          id: member.id,
                          image: "/images/view.svg",
                          label: "View",
                          dataCy: "view",
                        },
                      ]}
                      emitAction={emitAction}
                    />
                  )}
                </div>
              </div>
            ))}
        {/* Display skeleton loaders if list is empty */}
        {!props.listallMembers?.length && (
          <>
            {[...Array(8)].map((_, index) => (
              <SkeletalLoader key={index} />
            ))}
          </>
        )}
      </div>

      <div>{/*pgination goes here..*/}</div>
    </div>
  );
};
