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

interface ListMembers {
  [x: string]: string | number;
  firtname: string;
  lastname: string;
  email: string;
  gender: string;
  children: number;
}

type Prop = {
  listallMembers?: ListMembers[];
};

export const AccesslevelComponent = (props:Prop) => {

  const members = props?.listallMembers?.map((data)=>{
    return {
      id: data.id.toString(),
      label: `${data.firstname} ${data.lastname}`
    }
  });

  //table content here..
 const headers = [
   { key: "accesslevelname", label: "Accesslevelname" },
   { key: "members", label: "Members" },
   { key: "action", label: "Action" },
 ];
  const renderCellContent = (headerKey: string, item: Record<string, any>) => {
     switch (headerKey) {
       case "accesslevelname":
         return <div className="whitespace-nowrap">{item.name}</div>;

       case "members":

         if (Array.isArray(item.members)) {
           return (
             <div className="whitespace-nowrap">
               <AvatarList
                 avatarArray={item.members}
                 width="35"
                 height="35"
                 sliceFirstIdx={0}
                 sliceSecondIdx={3}
               />
             </div>
           );
         } 

        break;

       case "action":
         function emitAction(_id: string | number, _label: string): void {}

         return (
           <img
             src="/images/flatEclipse.svg"
             alt="eclipse"
             className="cursor-pointer"
           />
         );
     }
  }

  const[isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = ()=>{
    setIsOpen(!isOpen);
  }

  return (
    <div className="w-full  bg-slate-100 p-5">
      <div className="w-full grid grid-cols-3 h-[80vh] shadow-xl gap-1">
        <div className="w-full bg-white overflow-auto">
          <div className="p-2 font-bold underline text-xl">
            Create Access Level
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
              id={"accesslevel"}
              labelOne="Access level name:"
              placeholder="Enter your access level name..."
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
            />
          </div>
        </div>

        <div className="w-full p-2 overflow-auto">
          <div className="p-2 font-bold underline text-md">
            Manage Access Level
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
                fieldid="view-access"
                labelStyle="text-cyan-500"
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
                fieldid="manage-access"
                labelStyle="text-cyan-500"
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
                fieldid="view-verify"
                labelStyle="text-cyan-500"
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
                fieldid="manage-verify"
                labelStyle="text-cyan-500"
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
                fieldid="view-member"
                labelStyle="text-cyan-500"
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
                fieldid="manage-member"
                labelStyle="text-cyan-500"
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
                fieldid="view-about"
                labelStyle="text-cyan-500"
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
                fieldid="manage-about"
                labelStyle="text-cyan-500"
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
                fieldid="view-gallery"
                labelStyle="text-cyan-500"
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
                fieldid="manage-gallery"
                labelStyle="text-cyan-500"
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
                fieldid="view-account"
                labelStyle="text-cyan-500"
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
                fieldid="manage-account"
                labelStyle="text-cyan-500"
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
                fieldid="view-bio"
                labelStyle="text-cyan-500"
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
                fieldid="manage-bio"
                labelStyle="text-cyan-500"
              />
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-2 overflow-auto">
          <div className="text-sm font-bold w-full mb-5 flex justify-between">
            <div className="underline flex items-center">Assign Members</div>
            <div className="flex gap-2">
              <Button
                buttonLabel="table"
                className="border w-full p-2 
                rounded text-white bg-cyan-800"
                onClick={handleClose}
              />

              <Button
                buttonLabel="create"
                className="border w-full p-2 
                rounded text-white bg-cyan-400"
              />
            </div>
          </div>

          <Multiselect
            data={members}
            placeholder="Select Members"
            label={"Members"}
            style="border-2 border-cyan-300"
            dropdownstyle="border-2 border-cyan-300 mb-1"
          />
        </div>
      </div>
      <BackgroundDialogue status={isOpen} backgroundColor="bg-black">
        <div className="w-[70%] h-[600px] bg-white p-2 rounded overflow-auto">
          <CloseDiagComp
            styles="flex justify-end -mt-2"
            onClick={handleClose}
          />

          <TableComponent
            headers={headers}
            items={[
              {
                id: 1,
                name: "new access",
                members: [
                  { id: "1", logo: "", initials: "Augustine Normanyo" },
                  { id: "2", logo: "", initials: "Judith Quaye" },
                ],
              },
            ]}
            renderCellContent={renderCellContent}
          />
        </div>
      </BackgroundDialogue>
    </div>
  );
};
