import { useState, useEffect } from "react";
import Button from "../reusables/formcomponent/Button";
import { FilesUploads } from "../reusables/formcomponent/FilesUploads";

export const ManageGalleryComponent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [updateCounter, setUpdateCounter] = useState(0);

  // Trigger a re-render
  useEffect(() => {}, [updateCounter]);

  return (
    <div className="p-10">
      <div className="w-full p-2 text-center font-bold underline text-xl">
        Manage gallery page
      </div>

      <div>
        <FilesUploads
          style="h-[300px]"
          fileInput="fileinputone"
          fileData={files}
          setUpdateCounter={setUpdateCounter}
          setFiles={setFiles}
        />
      </div>
      <div className="w-full flex justify-end mt-4 gap-1">
        <Button
          buttonLabel="upload"
          className="border w-fit p-2 
                rounded text-white bg-cyan-400"
        />
        {/* <Button
          buttonLabel="update"
          className="border w-fit p-2 
                rounded text-white bg-cyan-700"
        /> */}
      </div>
    </div>
  );
}
