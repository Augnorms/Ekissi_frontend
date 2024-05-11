import { useState, useEffect } from "react";
import Button from "../reusables/formcomponent/Button";
import { FilesUploads } from "../reusables/formcomponent/FilesUploads";
import { Inputs } from "../reusables/formcomponent/Inputs";
import axios from "axios";
import { ErrorBlock } from "../reusables/ErrorBlock";
import { SuccessBlock } from "../reusables/SuccessBlock";
import { BackgroundDialogue } from "../reusables/BackgroundDialogue";
import { CloseDiagComp } from "../reusables/CloseDiagComp";
import TableComponent from "../reusables/TableComponent";
import Dropdown from "../reusables/ActionComponent";
import { DeleteDialogue } from "../reusables/DeleteDialogue";

type GalleryItem = {
  id: number;
  filename: string;
  fileurl: string;
  fileoriginalname: string;
  resourcetype: string;
};

type Prop = {
  listallGallery?: GalleryItem[];
  refetch?: () => void;
};

export const ManageGalleryComponent = (props: Prop) => {
  const [fileId, setFileId] = useState<number>(0);
  const [editFiles, setEditFiles] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>("");

  const [successBlockStatus, setSuccessBlockStatus] = useState<boolean>(false);
  const [errorBlockStatus, setErrorBlockStatus] = useState<boolean>(false);
  const [blockMessage, setBlockMessage] = useState<string>("");

  // Trigger a re-render file component
  useEffect(() => {}, [updateCounter]);

  const handleFilename = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilename(value);
  };

  const handleUploads = async () => {
    const data = new FormData();

    files?.forEach((file: File) => {
      // Append file and upload preset to FormData for each file
      data.append("file", file);
      data.append("upload_preset", "ekissicloud");
      data.append("cloud_name", "dkpqdqz3i");
    });

    try {
      setIsLoading(true);
      setFiles([]);
      setFilename("");
      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        data,
      );

      const fileUrl = response.data.secure_url;
      const originalFilename = response.data.original_filename.trim();
      const resourceType = response.data?.resource_type;

      if (response && resourceType === "image") {
        const serverResponse = await axios.post(
          `${import.meta.env.VITE_ENDPOINT}/creategallery`,
          {
            filename: filename,
            fileurl: fileUrl,
            original_file_name: originalFilename,
            resource_type: resourceType,
          },
        );

        if (serverResponse && serverResponse.data?.status === true) {
          setSuccessBlockStatus(true);
          setBlockMessage(serverResponse?.data?.message);
          setTimeout(() => {
            setSuccessBlockStatus(false);
            setBlockMessage("");
          }, 3000);
          props.refetch && props.refetch();
        }
      } else if (response && resourceType === "video") {
        const serverResponse = await axios.post(
          `${import.meta.env.VITE_ENDPOINT}/creategallery`,
          {
            filename: filename,
            fileurl: fileUrl,
            original_file_name: originalFilename,
            resource_type: resourceType,
          },
        );

        if (serverResponse && serverResponse.data?.status === true) {
          setSuccessBlockStatus(true);
          setBlockMessage(serverResponse?.data?.message);
          setTimeout(() => {
            setSuccessBlockStatus(false);
            setBlockMessage("");
          }, 3000);
          props.refetch && props.refetch();
        }
      }
    } catch (error: any) {
      console.error(error);
      setErrorBlockStatus(true);
      setBlockMessage(error.message);
      setTimeout(() => {
        setErrorBlockStatus(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  //handle table here...
  const [editStat, setEditStat] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const handleClose = () => {
    setIsShow(!isShow);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropDownId, setDropDownId] = useState<number>(0);
  const handleMouseClick = (param: number) => {
    setIsDropdownOpen(true);
    setDropDownId(param);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const headers = [
    { key: "filename", label: "filename" },
    { key: "fileoriginalname", label: "fileoriginalname" },
    { key: "resourcetype", label: "resourcetype" },
    { key: "action", label: "Actions" },
  ];

  const renderCellContent = (headerKey: string, item: Record<string, any>) => {
    switch (headerKey) {
      case "filename":
        return <div className="whitespace-nowrap">{item.filename}</div>;
      case "fileoriginalname":
        return <div className="whitespace-nowrap">{item.fileoriginalname}</div>;
      case "resourcetype":
        return <div className="whitespace-nowrap">{item.resourcetype}</div>;
      case "action":
        function emitAction(_id: string | number, _label: string): void {
          if (_label === "Edit") {
            setEditStat(true);

            let filterGallery = props.listallGallery?.find(
              (data) => data.id === _id,
            );

            if (filterGallery) {
              setFileId(filterGallery?.id);
              setFilename(filterGallery?.filename);
              setEditFiles(filterGallery?.fileurl);
            }

            setIsShow(false);
          }

          if (_label === "Delete") {
            setPopupdelete(true);
            setFileId(Number(_id));
          }
        }

        return (
          <div className="whitespace-nowrap">
            <img
              src="/images/flatEclipse.svg"
              alt="eclipse"
              className="cursor-pointer"
              onClick={() => handleMouseClick(item.id)}
            />

            <div className="absolute right-[30px]">
              {isDropdownOpen && dropDownId === item.id && (
                <Dropdown
                  onMouseLeave={handleMouseLeave}
                  dropdownItems={[
                    {
                      id: item.id,
                      image: "/images/editicon.svg",
                      label: "Edit",
                      dataCy: "edit",
                    },
                    {
                      id: item.id,
                      image: "/images/delete.svg",
                      label: "Delete",
                      dataCy: "delete",
                    },
                  ]}
                  emitAction={emitAction}
                />
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  //handle update gallery here..
  const handleupdate = async () => {
    const data = new FormData();

    files?.forEach((file: File) => {
      // Append file and upload preset to FormData for each file
      data.append("file", file);
      data.append("upload_preset", "ekissicloud");
      data.append("cloud_name", "dkpqdqz3i");
    });

    try {
      setIsLoading(true);
      setFiles([]);
      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        data,
      );

      const fileUrl = response.data.secure_url;
      const originalFilename = response.data.original_filename.trim();
      const resourceType = response.data?.resource_type;

      if (response && resourceType === "image") {
        let Updateresponse = await axios.put(
          `${import.meta.env.VITE_ENDPOINT}/updategallery`,
          {
            id: fileId,
            filename: filename,
            fileurl: fileUrl,
            original_file_name: originalFilename,
            resource_type: resourceType,
          },
        );

        if (Updateresponse && Updateresponse.data?.status === true) {
          setFileId(0);
          setFilename("");
          setEditFiles("");

          setSuccessBlockStatus(true);
          setBlockMessage(Updateresponse?.data?.message);
          setTimeout(() => {
            setSuccessBlockStatus(false);
            setBlockMessage("");
          }, 3000);

          props.refetch && props.refetch();
        }
      } else if (response && resourceType === "video") {
        if (response && resourceType === "video") {
          let Updateresponse = await axios.put(
            `${import.meta.env.VITE_ENDPOINT}/updategallery`,
            {
              id: fileId,
              filename: filename,
              fileurl: fileUrl,
              original_file_name: originalFilename,
              resource_type: resourceType,
            },
          );

          if (Updateresponse && Updateresponse.data?.status === true) {
            setFileId(0);
            setFilename("");
            setEditFiles("");

            setSuccessBlockStatus(true);
            setBlockMessage(Updateresponse?.data?.message);
            setTimeout(() => {
              setSuccessBlockStatus(false);
              setBlockMessage("");
            }, 3000);

            props.refetch && props.refetch();
          }
        }
      }
    } catch (error: any) {
      console.error(error);
      setErrorBlockStatus(true);
      setBlockMessage(error.message);
      setTimeout(() => {
        setErrorBlockStatus(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  //handling delete gallery here...
  const [popupdelete, setPopupdelete] = useState<boolean>(false);

  const handleCancelDiag = () => {
    setPopupdelete(false);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      let response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}/deletegallery`,
        {
          id: fileId,
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
        setPopupdelete(false);
      }

    } catch (error: any) {
      console.error(error);
      setErrorBlockStatus(true);
      setBlockMessage(error.message);
      setTimeout(() => {
        setErrorBlockStatus(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10">
      <SuccessBlock blockControl={successBlockStatus} message={blockMessage} />
      <ErrorBlock blockControl={errorBlockStatus} message={blockMessage} />
      <DeleteDialogue
        text={`File`}
        popup={popupdelete}
        loading={isLoading}
        onCancel={handleCancelDiag}
        onDelete={handleDelete}
      />
      <div className="w-full p-2 text-center font-bold text-xl">
        <div className="underline">
          {editStat ? "Edit gallery page" : "Manage gallery page"}
        </div>
        <div className="flex justify-end">
          <Button
            buttonLabel="Table"
            className="border w-fit p-2 
                rounded text-white bg-cyan-800 text-sm"
            onClick={handleClose}
          />
        </div>
      </div>

      <div>
        <div className="mb-10">
          <Inputs
            type="text"
            style="w-full 
                      border-2
                      border-cyan-300
                      h-8 rounded-xl
                      text-gray-500 
                      outline-cyan-300
                      p-5
                      placeholder:text-sm"
            id={"filename"}
            placeholder="Enter your file name here..."
            onChange={handleFilename}
            value={filename}
          />
        </div>
        {editStat && (
          <div className="w-fit bg-slate-100 p-2 rounded-md mb-1">
            {editFiles}
          </div>
        )}
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
          buttonLabel={editStat ? "Update" : "upload"}
          className="border w-fit p-2 
                rounded text-white bg-cyan-400"
          loading={isLoading}
          onClick={editStat ? handleupdate : handleUploads}
          disabled={filename === "" || files?.length === 0}
        />
      </div>

      {/* table contenet here... */}

      <BackgroundDialogue status={isShow} backgroundColor="bg-black">
        <div className="w-[70%] h-[600px] bg-white rounded-md mt-2 overflow-auto relative">
          <CloseDiagComp styles="flex justify-end" onClick={handleClose} />
          <div className="p-10 h-[500px]">
            <TableComponent
              headers={headers}
              items={props.listallGallery || []}
              renderCellContent={renderCellContent}
            />
          </div>
        </div>
      </BackgroundDialogue>
    </div>
  );
};
