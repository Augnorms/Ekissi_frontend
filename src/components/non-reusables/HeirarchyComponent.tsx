import Button from "../reusables/formcomponent/Button";
import Hierarchy from "../reusables/HeirarchyStructure";


export const HeirarchyComponent = () => {


  return (
    <div className="w-full h-[100%] p-4">
      <div className="w-full flex justify-between mb-2">
        <div className="font-bold text-lg">Members Count ({12})</div>
        <div>
          <Button
            buttonLabel="Create Relationship"
            className="border p-2 
          rounded-md text-white bg-cyan-400"
          />
        </div>
      </div>
      <hr />
      <div className="w-full h-[90%] overflow-auto">
        <Hierarchy />
      </div>
    </div>
  );
}
