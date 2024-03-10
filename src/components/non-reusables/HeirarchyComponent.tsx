import Button from "../reusables/formcomponent/Button";
import Hierarchy from "../reusables/HeirarchyStructure";
import { BackgroundDialogue } from "../reusables/BackgroundDialogue";
import { CloseDiagComp } from "../reusables/CloseDiagComp";
import { useState } from "react";
import { Multiselect } from "../reusables/formcomponent/Multiselect";
import { Select } from "../reusables/formcomponent/Select";
import { SuccessBlock } from "../reusables/SuccessBlock";
import { ErrorBlock } from "../reusables/ErrorBlock";

export const HeirarchyComponent = () => {
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

  return (
    <div className="w-full h-[100%] p-4">
      <div className="w-full flex justify-between mb-2">
        <div className="font-bold text-lg">Members Count ({12})</div>
        {/*Success and Error Block*/}
        <SuccessBlock blockControl={false} />
        <ErrorBlock blockControl={false}/>

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

      <div className="w-full h-[90%] overflow-auto">
        <Hierarchy />
      </div>

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
            data={[
              { id: "1", name: "Aili" },
              { id: "2", name: "Ailima" },
              { id: "3", name: "Ailibaba" },
            ]}
            placeholder="Select parent"
            value={parent}
            onChange={handleParent}
          />

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
