import { useState } from "react";
import { SearchComp } from "../reusables/formcomponent/SearchComp";
import { Select } from "../reusables/formcomponent/Select";
import Button from "../reusables/formcomponent/Button";


export const AccountComponent = () => {
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

  return (
    <div className="w-full h-[100%] p-4">
      <div className="w-full flex justify-between">
        <p className="font-bold text-xl">
          Family Account <span>({20})</span>
        </p>
        <Button
          buttonLabel="Create Account"
          className="border p-2 
          rounded-md text-white bg-cyan-400"
        />
      </div>

      <div className="w-full mt-4">
        <p className="font-bold text-md">Family Account Summary</p>
      </div>

      <div className="w-full h-[80px] border mt-5"></div>

      <div className="w-full mt-5 flex justify-between">
        <div className="w-1/2 flex gap-2">
          <div className="w-[30%]">
            <SearchComp
              classStyle="ring-2 ring-cyan-500 p-2 rounded-xl border"
              handlesearch={handlesearch}
              value={searchVal}
            />
          </div>

          <div className="w-[30%] -mt-2 flex gap-2">
            <p className="mt-4 ml-5">Filter</p>
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

        <div className="w-1/2 flex gap-2 justify-end">
          <Button
            logo="/public/images/export.svg"
            buttonLabel="Export Account"
            className="border p-2 rounded-md text-white bg-red-900"
          />
        </div>
      </div>

      <div className="w-full h-[500px] border mt-5 overflow-auto">
        {/*table rendering here..*/}
      </div>
    </div>
  );
}
