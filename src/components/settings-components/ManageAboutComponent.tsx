import { useEffect, useState } from "react";
import Button from "../reusables/formcomponent/Button";
import { TextArea } from "../reusables/formcomponent/TextArea"
import { SuccessBlock } from "../reusables/SuccessBlock";
import { ErrorBlock } from "../reusables/ErrorBlock";
import axios from "axios";

interface Props{
  queryContent:string;
  refetch:()=>void;
  queryid:number;
}

export const ManageAboutComponent = (props:Props) => {

const [textContent, setTextContent] = useState<string>("");
const [isLoading, setIsLoading] = useState<boolean>(false);
const [updateLoading, setUploadLoading] = useState<boolean>(false);
const [successBlockStatus, setSuccessBlockStatus] = useState<boolean>(false);
const [errorBlockStatus, setErrorBlockStatus] = useState<boolean>(false);
const [blockMessage, setBlockMessage] = useState<string>("");

const handleContent: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
  if(e.target.id === 'history'){
    setTextContent(e.target.value);
  }
};

useEffect(() => {
  if (props.queryContent) {
    setTextContent(props.queryContent);
  }
}, [props.queryContent]);

const createAboutcontent = async()=>{
  try{
    setIsLoading(true);

    const response = await axios.post(
      `${import.meta.env.VITE_ENDPOINT}/createaboutcontent`,
      {
        aboutcontent: textContent,
      },
    );

    if (response && response?.data?.code === 200) {
      setSuccessBlockStatus(true);
      setBlockMessage(response?.data?.message);
      setTimeout(() => {
        setSuccessBlockStatus(false);
        setBlockMessage("");
        props.refetch && props.refetch();
      }, 3000);
    }

  }catch(error:any){
     console.error(error);
     setErrorBlockStatus(true);
     setBlockMessage(error.message);
     setTimeout(() => {
       setErrorBlockStatus(false);
     }, 3000);

  }finally{
   setIsLoading(false)
  }
}

//update mutation here
const handleUpdatecontent = async()=>{
   try {
     setUploadLoading(true);

     const response = await axios.put(
       `${import.meta.env.VITE_ENDPOINT}/updatedaboutpagecontent`,
       {
         id: props.queryid,
         aboutcontent: textContent,
       },
     );

     if (response && response?.data?.code === 200) {
       setSuccessBlockStatus(true);
       setBlockMessage(response?.data?.message);
       setTimeout(() => {
         setSuccessBlockStatus(false);
         setBlockMessage("");
         props.refetch && props.refetch();
       }, 3000);
     }
   } catch (error: any) {
     console.error(error);
     setErrorBlockStatus(true);
     setBlockMessage(error.message);
     setTimeout(() => {
       setErrorBlockStatus(false);
     }, 3000);
   } finally {
     setUploadLoading(false);
   }
}

  return (
    <div className="p-10">
      <SuccessBlock blockControl={successBlockStatus} message={blockMessage} />
      <ErrorBlock blockControl={errorBlockStatus} message={blockMessage} />
      <div className="w-full p-2 text-center font-bold underline text-xl">
        Manage about page
      </div>

      <div>
        <TextArea
          style="w-full h-[500px]
              border-2
              border-cyan-300
              rounded-xl
              text-gray-500 
              outline-cyan-300
              p-5
              placeholder:text-sm
              "
          placeholder="Enter family history here"
          id="history"
          label="Family history:"
          value={textContent}
          onChange={handleContent}
        />
      </div>
      <div className="w-full flex justify-end mt-4 gap-1">
        {props.queryContent === "" ? (
          <Button
            buttonLabel="create"
            className="border w-fit p-2 
                rounded text-white bg-cyan-400"
            loading={isLoading}
            disabled={textContent === ""}
            onClick={createAboutcontent}
          />
        ) : (
          <Button
            buttonLabel="update"
            className="border w-fit p-2 
                rounded text-white bg-cyan-700"
            disabled={textContent === ""}
            loading={updateLoading}
            onClick={handleUpdatecontent}
          />
        )}
      </div>
    </div>
  );
}
