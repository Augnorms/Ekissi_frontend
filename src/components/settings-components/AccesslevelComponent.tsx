import { Inputs } from "../reusables/formcomponent/Inputs";
import { TextArea } from "../reusables/formcomponent/TextArea";
import { Checkbox } from "../reusables/formcomponent/Checkbox";
import { Multiselect } from "../reusables/formcomponent/Multiselect";
import Button from "../reusables/formcomponent/Button";

export const AccesslevelComponent = () => {
  return (
    <div className="w-full h-[83vh] bg-slate-100">
      <div className="w-full grid grid-cols-3 h-1/2 shadow-xl gap-1">
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
                fieldid="view"
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
                fieldid="manage"
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
                fieldid="view"
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
                fieldid="manage"
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
                fieldid="view"
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
                fieldid="manage"
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
                fieldid="view"
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
                fieldid="manage"
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
                fieldid="view"
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
                fieldid="manage"
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
                fieldid="view"
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
                fieldid="manage"
                labelStyle="text-cyan-500"
              />
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-2 overflow-auto">
          <div className="text-sm font-bold w-full mb-5 flex justify-between">
            <div className="underline flex items-center">Assign Members</div>
            <div>
              <Button
                buttonLabel="create"
                className="border w-full p-2 
                rounded text-white bg-cyan-400"
              />
            </div>
          </div>

          <Multiselect
            data={[
              { id: "1", label: "Aili" },
              { id: "2", label: "Ailima" },
              { id: "3", label: "Ailibaba" },
            ]}
            placeholder="Choose relationship"
            label={"Relationship"}
            style="border-2 border-cyan-300"
            dropdownstyle="border-2 border-cyan-300 mb-1"
          />
          <div className="w-full mt-2 p-2 border rounded"></div>
        </div>
      </div>
      <div className="w-full"></div>
    </div>
  );
};
