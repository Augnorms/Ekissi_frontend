import { useState } from "react";
import { SearchComp } from "../reusables/formcomponent/SearchComp";
import { Select } from "../reusables/formcomponent/Select";
import { Avatar } from "../reusables/Avatar";
import { SkeletalLoader } from "../reusables/SkeletalLoader";
import Dropdown from "../reusables/ActionComponent";

export const MembersComponent = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [selected, setSelected] = useState<string>("");

  const handlesearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchVal(value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelected(value);
  };

  const emitAction = (id:string|number)=>{
    console.log(id)
  }

  return (
    <div className="w-full h-[100%] p-10">
      <div className="flex gap-1">
        <p className="font-extrabold text-xl">Members Count</p>
        <span className="mt-1 font-extrabold">({20})</span>
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
          <p className="mt-4 mr-2">Filter</p>
          <Select
            placeholder="Select your status"
            style="w-full ring-2 ring-cyan-500 p-1.5 rounded-xl border"
            data={[
              { id: "1", name: "alive" },
              { id: "2", name: "deceased" },
            ]}
            onChange={handleSelect}
            value={selected}
          />
        </div>
      </div>
      <hr />
      <div className="mt-4 w-full h-[55vh] overflow-auto grid grid-cols-4 grid-rows-2 p-2 gap-1">
        <div className="w-full border rounded-md shadow-md grid grid-cols-2 grid-rows-2 relative">
          <div className="w-full flex justify-center p-2">
            <Avatar
              width="100"
              height="100"
              logo="null"
              initials="Augustine Norms"
            />
          </div>
          <div className="w-full p-2">
            <div className="w-full p-2 text-md font-bold">
              {"Augustine Normanyo".slice(0, 16) + "..."}
            </div>
            <div className="w-full p-2 text-sm">
              {"augustine@gmail.com".slice(0, 20) + "..."}
            </div>
            <div className="w-full p-2 text-sm">{"02444657893"}</div>
          </div>
          <div className="w-full flex justify-center items-center">
            <div
              className="w-[60%] 
               text-center border 
               p-2 rounded cursor-pointer 
               hover:bg-cyan-300
               hover:text-white
               "
            >
              view
            </div>
          </div>
          <div className="w-full flex justify-end items-end p-4 mb-4">
            <img
              className="cursor-pointer"
              src="/images/flatEclipse.svg"
              alt="flateclipse"
            />
          </div>
          <div className="absolute top-2 right-4">
            <Dropdown
              dropdownItems={[
                {
                  id: "1",
                  image: "/images/view.svg",
                  label: "View",
                  dataCy: "view",
                },
                {
                  id: "2",
                  image: "/images/editicon.svg",
                  label: "Edit",
                  dataCy: "edit",
                },
                {
                  id: "3",
                  image: "/images/delete.svg",
                  label: "Delete",
                  dataCy: "delete",
                },
              ]}
              emitAction={emitAction}
            />
          </div>
        </div>

        <SkeletalLoader />
      </div>
      <div>
        {/*pgination goes here..*/}
      </div>
    </div>
  );
};
