import Button from "../reusables/formcomponent/Button";
import {Hierarchy} from "../reusables/HeirarchyStructure";
import { BackgroundDialogue } from "../reusables/BackgroundDialogue";
import { CloseDiagComp } from "../reusables/CloseDiagComp";
import {  useState } from "react";
import { Select } from "../reusables/formcomponent/Select";
import { SuccessBlock } from "../reusables/SuccessBlock";
import { ErrorBlock } from "../reusables/ErrorBlock";
import axios from "axios";

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

type heirarchy = {
  id:number;
  label:string;
  children:[]
};

type Prop = {
  listallMembers?: ListMembers[];
  listheirarchy?: heirarchy[];
  refetch?: () => void;
  refetchHeirarchy?:()=>void;
};

export const HeirarchyComponent = (props:Prop) => {
  const [isclose, setIsClose] = useState<boolean>(false);
  const [parent, setParent] = useState<string>("");
  const [child, setChild] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successBlockStatus, setSuccessBlockStatus] = useState<boolean>(false);
  const [errorBlockStatus, setErrorBlockStatus] = useState<boolean>(false);
   const [blockMessage, setBlockMessage] = useState<string>("");

  const handleCloseDialogue = () => {
    setIsClose(false);
  };

  const handleOpenDialogue = () => {
    setIsClose(true);
  };

  //parent select function
  const handleParent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParent(event.currentTarget.value);
  };

  const handleChildren = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChild(event.currentTarget.value);
  };

   //populating the select field with data 
   const parents: Option[] =
     props?.listallMembers?.map((data) => ({
       id: data.id.toString(),
       name: `${data.firstname} ${data.lastname}`,
     })) || []; 

   const handlecreation = async()=>{
      try{
        setIsLoading(true);

        const response = await axios.post(
          `${import.meta.env.VITE_ENDPOINT}/createrelation`,
          {
            parent_id: parent,
            child_id: child,
          },
        );

        if (response && response?.data?.status === true) {
          setSuccessBlockStatus(true);
          setBlockMessage(response?.data?.message);
          close();
          setTimeout(() => {
            setSuccessBlockStatus(false);
            props.refetchHeirarchy && props.refetchHeirarchy();
            setBlockMessage("");
          }, 3000);
          handleclear();
        }

      }catch(error:any){
        console.error(error);
        setErrorBlockStatus(true);
        setBlockMessage(error.message);
        setTimeout(() => {
          setErrorBlockStatus(false);
        }, 3000);
      }finally{
       setIsLoading(false);
      }
   };

   const handleclear = ()=>{
     setParent("");
     setChild("");
     setIsClose(false);
   }

  return (
    <div className="w-full h-[100%] p-4">
      <div className="w-full flex justify-between mb-2">
        <div className="font-bold text-lg">
          Members Count ({props?.listallMembers?.length})
        </div>
        {/*Success and Error Block*/}
        <SuccessBlock
          blockControl={successBlockStatus}
          message={blockMessage}
        />
        <ErrorBlock blockControl={errorBlockStatus} message={blockMessage} />

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
        <Hierarchy listheirarchy={props.listheirarchy} />
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

          <Select
            labelOne="Child"
            style="
                  w-full rounded-md
                  p-3 border-2 border-cyan-300
                  dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-[#F2BEAB] 
                  dark:focus:border-cyan-300 mb-4
                  "
            data={parents}
            placeholder="Select child"
            value={child}
            onChange={handleChildren}
          />

          <Button
            buttonLabel="Create Relationship"
            className="w-full border p-2 
             rounded-md text-white bg-cyan-400 mt-4"
            onClick={handlecreation}
            loading={isLoading}
            disabled={parent === "" || child === ""}
          />
        </div>
      </BackgroundDialogue>
    </div>
  );
}
