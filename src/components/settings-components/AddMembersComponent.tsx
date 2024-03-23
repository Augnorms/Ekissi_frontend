import {useState } from "react";
import { Inputs } from "../reusables/formcomponent/Inputs";
import Button from "../reusables/formcomponent/Button";
import { Select } from "../reusables/formcomponent/Select";
import { BackgroundDialogue } from "../reusables/BackgroundDialogue";
import { CloseDiagComp } from "../reusables/CloseDiagComp";
import TableComponent from "../reusables/TableComponent";
import Dropdown from "../reusables/ActionComponent";
import axios from "axios";

interface transformData {
  nameofcompany: string;
  startdate: string;
  enddate: string;
  position: string;
}

interface ListMembers{
  firtname:string;
  lastname:string;
  email:string;
  gender:string;
  children:number;
}

type Prop = {
  listallMembers?: ListMembers[];
};

export const AddMembersComponent = (props:Prop) => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPasword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [placeOfBirth, setPlaceOfBirth] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [selectedOccupation, setSelectedOccupation] = useState<transformData[]>(
    [],
  );
  const [nationality, setNationality] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [mothersName, setMothersName] = useState<string>("");
  const [fathersName, setFathersName] = useState<string>("");
  const [maritalStatus, setMaritalStatus] = useState<string>("");
  const [numberOfChildren, setNumberOfChildren] = useState<number>(0);
  const [primaryEducation, setPrimaryEducation] = useState<string>("");
  const [secondaryEducation, setSecondaryEducation] = useState<string>("");
  const [tertiaryEducation, setTertiaryEducation] = useState<string>("");
  const [hometown, setHometown] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const id = event.currentTarget.id;

    if (id === "firstname") {
      setFirstname(value);
    } else if (id === "lastname") {
      setLastname(value);
    } else if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPasword(value);
    } else if (id === "gender") {
      setGender(value);
    } else if (id === "dateofbirth") {
      setDateOfBirth(value);
    } else if (id === "placeofbirth") {
      setPlaceOfBirth(value);
    } else if (id === "occupation") {
      setOccupation(value);
    } else if (id === "nationality") {
      setNationality(value);
    } else if (id === "phonenumber") {
      setPhoneNumber(value);
    } else if (id === "mothersname") {
      setMothersName(value);
    } else if (id === "fathersname") {
      setFathersName(value);
    } else if (id === "maritalstatus") {
      setMaritalStatus(value);
    } else if (id === "numberofchildren") {
      setNumberOfChildren(parseInt(value));
    } else if (id === "primaryeducation") {
      setPrimaryEducation(value);
    } else if (id === "secondaryeducation") {
      setSecondaryEducation(value);
    } else if (id === "tertiaryeducation") {
      setTertiaryEducation(value);
    } else if (id === "hometown") {
      setHometown(value);
    }
  };

  const handleOccupations = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOccupation(event.currentTarget.value);
  };

  const onClick = () => {
    setOccupation("");
  };

  const [inputs, setInputs] = useState([
    {
      id: "companyname",
      label: "Companyname:",
      type: "text",
      placeholder: "Enter your companyname...",
      value: "",
    },
    {
      id: "startdate",
      label: "Startdate:",
      type: "date",
      placeholder: "Select start date...",
      value: "",
    },
    {
      id: "enddate",
      label: "Enddate:",
      type: "date",
      placeholder: "Select end date...",
      value: "",
    },
    {
      id: "position",
      label: "Position:",
      type: "text",
      placeholder: "Enter position here...",
      value: "",
    },
  ]);

  //handles creating a copy of the input tags
  const handleAddFieldCopy = () => {
    setInputs((prevInputs) => [
      ...prevInputs,
      {
        id: `companyname`,
        label: "Companyname:",
        type: "text",
        placeholder: "Enter your companyname...",
        value: "",
      },
      {
        id: `startdate`,
        label: "Startdate:",
        type: "date",
        placeholder: "Select start date...",
        value: "",
      },
      {
        id: `enddate`,
        label: "Enddate:",
        type: "date",
        placeholder: "Select end date...",
        value: "",
      },
      {
        id: `position`,
        label: "Position:",
        type: "text",
        placeholder: "Enter position here...",
        value: "",
      },
    ]);
  };

  //handles the change for every inputs
  const handleCopyChange = (
    e: { target: { value: string } },
    index: number,
  ) => {
    const newInputs = [...inputs];
    newInputs[index].value = e.target.value;
    setInputs(newInputs);
  };

  const handleSlice = () => {
    const chunks = [];
    for (let i = 0; i < inputs.length; i += 4) {
      const chunk = inputs.slice(i, i + 4);
      chunks.push(chunk);
    }

    const transformedData = chunks.map((chunk) => {
      return {
        nameofcompany: chunk[0].value,
        startdate: chunk[1].value,
        enddate: chunk[2].value,
        position: chunk[3].value,
      };
    });
    setSelectedOccupation(transformedData);
    onClick();
    setInputs([]);
  };

  //table codes down here
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const headers = [
    { key: "Firstname", label: "Firstname" },
    { key: "Lastname", label: "Lastname" },
    { key: "Email", label: "Email" },
    { key: "Gender", label: "Gender" },
    { key: "Hometown", label: "Hometown" },
    { key: "action", label: "Actions" },
  ];

  const renderCellContent = (headerKey: string, item: Record<string, any>) => {
    switch (headerKey) {
      case "Firstname":
        return <div className="whitespace-nowrap">{item.firstname}</div>;

      case "Lastname":
        return <div className="whitespace-nowrap">{item.lastname}</div>;

      case "Email":
        return <div className="whitespace-nowrap">{item.email}</div>;

      case "Gender":
        return <div className="whitespace-nowrap">{item.gender}</div>;

      case "Hometown":
        return <div className="whitespace-nowrap">{item.hometown}</div>;

      case "action":
        function emitAction(_id: string | number, _label: string): void {
       
          throw new Error("Function not implemented.");
        }

        return (
          <div className="whitespace-nowrap">
            <img
              src="/images/flatEclipse.svg"
              alt="eclipse"
              className="cursor-pointer"
              onMouseEnter={handleMouseEnter}
            />

            {isDropdownOpen && (
              <Dropdown
                onMouseLeave={handleMouseLeave}
                dropdownItems={[
                  {
                    id: "1",
                    image: "/images/view.svg",
                    label: "View",
                    dataCy: "view",
                  },
                  {
                    id: "1",
                    image: "/images/editicon.svg",
                    label: "Edit",
                    dataCy: "edit",
                  },
                  {
                    id: "1",
                    image: "/images/delete.svg",
                    label: "Delete",
                    dataCy: "delete",
                  },
                ]}
                emitAction={emitAction}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-full shadow-md p-2 mt-1 bg-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-2">
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
          id={"firstname"}
          labelOne="Firstname:"
          placeholder="Enter your username..."
          onChange={handleChange}
          value={firstname}
        />

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
          id={"lastname"}
          labelOne="Lastname:"
          placeholder="Enter your lastname..."
          onChange={handleChange}
          value={lastname}
        />

        <Inputs
          type="email"
          style="w-full 
           border-2
           border-cyan-300
           h-8 rounded-xl
           text-gray-500 
           outline-cyan-300
           p-5
           placeholder:text-sm
          "
          id={"email"}
          labelOne="Email:"
          placeholder="Enter your email..."
          onChange={handleChange}
          value={email}
        />

        <Inputs
          type="password"
          style="w-full 
           border-2
           border-cyan-300
           h-8 rounded-xl
           text-gray-500 
           outline-cyan-300
           p-5
           placeholder:text-sm
          "
          id={"password"}
          labelOne="Password:"
          placeholder="Enter your password..."
          onChange={handleChange}
          value={password}
        />

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
          id={"gender"}
          labelOne="Gender:"
          placeholder="Enter your gender..."
          onChange={handleChange}
          value={gender}
        />
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
          id={"dateofbirth"}
          labelOne="Date of Birth:"
          placeholder="Enter your date of birth..."
          onChange={handleChange}
          value={dateOfBirth}
        />
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
          id={"placeofbirth"}
          labelOne="Place of Birth:"
          placeholder="Enter your place of birth..."
          onChange={handleChange}
          value={placeOfBirth}
        />

        <Select
          labelOne="Occupation"
          style="
                  w-full rounded-xl
                  p-2 border-2 border-cyan-300
                  dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-[#F2BEAB] 
                  dark:focus:border-cyan-300 mb-4
                  "
          data={[{ id: "1", name: "select occupations" }]}
          placeholder={"Select parent"}
          value={occupation}
          onChange={handleOccupations}
        />

        <BackgroundDialogue
          status={occupation == "1" ? true : false}
          backgroundColor="bg-black"
        >
          <div className="w-[60%] bg-white p-2 rounded-md">
            <div>
              <CloseDiagComp styles="flex justify-end" onClick={onClick} />
            </div>
            <div className="w-[100%] flex justify-end">
              <Button
                buttonLabel="Add fields"
                className="w-[10%] border p-2 
                rounded-xl text-white bg-emerald-400"
                onClick={handleAddFieldCopy}
              />
            </div>
            <div className="flex gap-2">
              <div className="pb-4 grid grid-cols-4 gap-2">
                {inputs.map((input, index) => (
                  <Inputs
                    key={index}
                    type={input.type}
                    style="w-full border-2 border-cyan-300 h-8 rounded-xl 
                    text-gray-500 outline-cyan-300 p-5 placeholder:text-sm"
                    id={input.id}
                    labelOne={input.label}
                    placeholder={input.placeholder}
                    onChange={(e) => handleCopyChange(e, index)}
                    value={input.value}
                  />
                ))}
              </div>
            </div>
            <div className="p-2 flex justify-end">
              <Button
                buttonLabel="Ok"
                className="w-[10%] border p-2 
                rounded-xl text-white bg-cyan-400"
                onClick={handleSlice}
              />
            </div>
          </div>
        </BackgroundDialogue>

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
          id={"nationality"}
          labelOne="Nationality:"
          placeholder="Enter your nationality..."
          onChange={handleChange}
          value={nationality}
        />
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
          id={"phonenumber"}
          labelOne="Phone Number:"
          placeholder="Enter your phone number..."
          onChange={handleChange}
          value={phoneNumber}
        />
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
          id={"mothersname"}
          labelOne="Mother's Name:"
          placeholder="Enter your mother's name..."
          onChange={handleChange}
          value={mothersName}
        />
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
          id={"fathersname"}
          labelOne="Father's Name:"
          placeholder="Enter your father's name..."
          onChange={handleChange}
          value={fathersName}
        />
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
          id={"maritalstatus"}
          labelOne="Marital Status:"
          placeholder="Enter your marital status..."
          onChange={handleChange}
          value={maritalStatus}
        />
        <Inputs
          type="number"
          style="w-full 
          border-2
          border-cyan-300
          h-8 rounded-xl
          text-gray-500 
          outline-cyan-300
          p-5
          placeholder:text-sm"
          id={"numberofchildren"}
          labelOne="Number of Children:"
          placeholder="Enter number of children..."
          onChange={handleChange}
          value={numberOfChildren.toString()}
        />
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
          id={"primaryeducation"}
          labelOne="Primary Education:"
          placeholder="Enter your primary education..."
          onChange={handleChange}
          value={primaryEducation}
        />
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
          id={"secondaryeducation"}
          labelOne="Secondary Education:"
          placeholder="Enter your secondary education..."
          onChange={handleChange}
          value={secondaryEducation}
        />
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
          id={"tertiaryeducation"}
          labelOne="Tertiary Education:"
          placeholder="Enter your tertiary education..."
          onChange={handleChange}
          value={tertiaryEducation}
        />
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
          id={"hometown"}
          labelOne="Hometown:"
          placeholder="Enter your hometown..."
          onChange={handleChange}
          value={hometown}
        />
        <div className="flex justify-start items-end">
          <Button
            buttonLabel="Submit"
            className="w-[50%] border p-2 
             rounded-xl text-white bg-cyan-400"
            loading={false}
          />
        </div>
      </div>

      <div className="h-[34vh] mt-2 overflow-auto">
        <TableComponent
          headers={headers}
          items={props.listallMembers || []}
          renderCellContent={renderCellContent}
        />
      </div>
    </>
  );
};
