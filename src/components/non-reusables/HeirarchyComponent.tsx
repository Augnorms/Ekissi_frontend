import Button from "../reusables/formcomponent/Button";
import Hierarchy from "../reusables/HeirarchyStructure";
import { BackgroundDialogue } from "../reusables/BackgroundDialogue";
import { CloseDiagComp } from "../reusables/CloseDiagComp";
import { useState } from "react";
import { Multiselect } from "../reusables/formcomponent/Multiselect";
import { Select } from "../reusables/formcomponent/Select";
import { SuccessBlock } from "../reusables/SuccessBlock";
import { ErrorBlock } from "../reusables/ErrorBlock";

interface ListMembers {
  [x: string]: string | number;
  firtname: string;
  lastname: string;
  email: string;
  gender: string;
  children: number;
}

type Option = {
  id: string;
  name: string;
};

type Prop = {
  listallMembers?: ListMembers[];
  refetch?: () => void;
};

export const HeirarchyComponent = (props:Prop) => {
  const [isclose, setIsClose] = useState<boolean>(false);
  const [parent, setParent] = useState<string>("");
  const [_relation, setRelation] = useState<number|string[]>([]);

  const handleCloseDialogue = () => {
    setIsClose(false);
  };

  const handleOpenDialogue = () => {
    setIsClose(true);
  };

  //parent select function
  const handleParent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParent(event.currentTarget.value);
    console.log(event.currentTarget.value);
  };

  // relation select function
  const handleRelation = (
    options: { id: number | string; label: string }[],
  ) => {
    
    // Extracting ids from options
    const ids = options.map((rel_id)=>rel_id.id)

    setRelation(ids as number | string[]);
  };

    const members = props?.listallMembers?.map((data) => {
      return {
        id: data.id.toString(),
        label: `${data.firstname} ${data.lastname}`,
      };
    });

   //populating the select field with data 
   const parents: Option[] =
     props?.listallMembers?.map((data) => ({
       id: data.id.toString(),
       name: `${data.firstname} ${data.lastname}`,
     })) || [];

  return (
    <div className="w-full h-[100%] p-4">
      <div className="w-full flex justify-between mb-2">
        <div className="font-bold text-lg">Members Count ({props?.listallMembers?.length})</div>
        {/*Success and Error Block*/}
        <SuccessBlock blockControl={false} />
        <ErrorBlock blockControl={false} />

        <div>
          <Button
            buttonLabel="Create Relationship"
            className="border p-2 
             rounded-md text-white bg-cyan-400"
            onClick={handleOpenDialogue}
          />
        </div>
      </div>

      <hr />
      {/* Hierarchy */}
      <div className="w-full h-[90%] overflow-auto">
        <Hierarchy />
      </div>

      {/*creating a relationship */}
      <BackgroundDialogue status={isclose} backgroundColor="bg-black">
        <div className="w-[30%] bg-white p-2 rounded">
          <CloseDiagComp
            styles="flex justify-end p-0"
            onClick={handleCloseDialogue}
          />

          <Select
            labelOne="Parent"
            style="
                  w-full rounded-md
                  p-3 border-2 border-cyan-300
                  dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-[#F2BEAB] 
                  dark:focus:border-cyan-300 mb-4
                  "
            data={parents}
            placeholder="Select parent"
            value={parent}
            onChange={handleParent}
          />

          <Multiselect
            data={members}
            placeholder="Choose relationship"
            label={"Relationship"}
            style="border-2 border-cyan-300"
            dropdownstyle="border-2 border-cyan-300 mb-1"
            onSelect={handleRelation}
          />

          <Button
            buttonLabel="Create Relationship"
            className="w-full border p-2 
             rounded-md text-white bg-cyan-400 mt-4"
            onClick={handleOpenDialogue}
            loading={false}
          />
        </div>
      </BackgroundDialogue>
    </div>
  );
}
