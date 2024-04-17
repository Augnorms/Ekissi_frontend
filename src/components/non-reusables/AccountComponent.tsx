import { useState } from "react";
import { SearchComp } from "../reusables/formcomponent/SearchComp";
// import { Select } from "../reusables/formcomponent/Select";
import Button from "../reusables/formcomponent/Button";
import { AccountSummary } from "../reusables/AccountSummary";
import { BackgroundDialogue } from "../reusables/BackgroundDialogue";
import { CloseDiagComp } from "../reusables/CloseDiagComp";
import { Inputs } from "../reusables/formcomponent/Inputs";
import { ErrorBlock } from "../reusables/ErrorBlock";
import { SuccessBlock } from "../reusables/SuccessBlock";
import axios from "axios";
import { Select } from "../reusables/formcomponent/Select";


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

export const AccountComponent = (prop:Prop) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [successBlockStatus, setSuccessBlockStatus] = useState<boolean>(false);
  const [errorBlockStatus, setErrorBlockStatus] = useState<boolean>(false);
  const [blockMessage, setBlockMessage] = useState<string>("");
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [name, setName] = useState<string>("");
  // const [selected, setSelected] = useState<string>("");

  const handlesearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchVal(value);
  };

  // const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = event.target.value;
  //   setSelected(value);
  // };

  const parents: Option[] =
    prop?.listallMembers?.map((data) => ({
      id: data.id.toString(),
      name: `${data.firstname} ${data.lastname}`,
    })) || [];

  const handleSelectMember = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedMember(value);
    const findmember = prop.listallMembers?.find((mem)=>mem.id === Number(value));
    setName(`${findmember?.firstname} ${findmember?.lastname}`);
    
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setAmount(value);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setDate(value);
  };

  const handleIsopen = () => {
    setOpenDialog(!openDialog);
  };

  //create accout here
  const handleaccountCreattion = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(import.meta.env.VITE_CREATE_ACCOUNT, {
        memberid: selectedMember,
        date: date,
        name: name,
        amount: amount,
      });

      if (response && response?.data?.status === true) {
        setSuccessBlockStatus(true);
        setBlockMessage(response?.data?.message);
        close();
        setTimeout(() => {
          setSuccessBlockStatus(false);
          setBlockMessage("");
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
      setIsLoading(false);
    }
  };

  const close = () => {
    setOpenDialog(false);
    setSelectedMember("");
    setDate("");
    setAmount("");
  };

  return (
    <div className="w-full h-[100%] p-4 overflow-auto">
      <SuccessBlock blockControl={successBlockStatus} message={blockMessage} />
      <ErrorBlock blockControl={errorBlockStatus} message={blockMessage} />
      <div className="w-full flex justify-between">
        <p className="font-bold text-xl">
          Family Account <span>({20})</span>
        </p>
        <Button
          buttonLabel="Create Account"
          className="border p-2 
          rounded-md text-white bg-cyan-400"
          onClick={handleIsopen}
        />
      </div>

      <div className="w-full mt-4 text-end">
        <p className="font-bold text-md">Family Account Summary</p>
      </div>

      <div className="w-full h-[80px] mt-5">
        <AccountSummary
          logo={"/images/moneyone.svg"}
          figure={10}
          label="Amount"
        />
      </div>

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
            {/* <p className="mt-4 ml-5">Filter</p>
            <Select
              placeholder="Select your status"
              style="w-full ring-2 ring-cyan-500 p-1.5 rounded-xl border"
              data={[
                { id: "1", name: "alive" },
                { id: "2", name: "deceased" },
              ]}
              onChange={handleSelect}
              value={selected}
            /> */}
          </div>
        </div>

        <div className="w-1/2 flex gap-2 justify-end">
          <Button
            logo="/images/export.svg"
            buttonLabel="Export Account"
            className="border p-2 rounded-md text-white bg-red-900"
          />
        </div>
      </div>

      <div className="w-full h-[500px] border mt-5 overflow-auto">
        {/*table rendering here..*/}
      </div>

      {/* form to create account */}
      <div>
        <BackgroundDialogue status={openDialog} backgroundColor="bg-black">
          <div className="max-sm:w-[90%] md:w-[70%] xl:w-[30%] bg-white p-4 rounded">
            <CloseDiagComp styles="flex justify-end" onClick={handleIsopen} />

            <div className="w-full p-1 text-center">
              <p className="font-semibold text-xl">Create Account</p>
            </div>

            <div className="w-full flex mb-3">
              <Select
                placeholder="Select your status"
                style="w-full ring-2 ring-cyan-300 p-1.5 rounded-xl border"
                labelOne="Member"
                data={parents}
                value={selectedMember}
                onChange={handleSelectMember}
              />
            </div>

            <div className="w-full flex mb-3">
              <Inputs
                type="number"
                style="w-full 
                border-2
                border-cyan-300
                h-8 rounded-xl
                text-gray-500 
                outline-cyan-300
                p-5
                placeholder:text-sm
              "
                id={"amount"}
                labelOne="Amount:"
                placeholder="Enter your amount..."
                value={amount}
                onChange={handleChangeAmount}
              />
            </div>

            <div className="w-full flex mb-3">
              <Inputs
                type="date"
                style="w-full 
                border-2
                border-cyan-300
                h-8 rounded-xl
                text-gray-500 
                outline-cyan-300
                p-5
                placeholder:text-sm
              "
                id={"date"}
                labelOne="Date:"
                placeholder="Enter your date..."
                value={date}
                onChange={handleChangeDate}
              />
            </div>

            <div className="py-4">
              <Button
                buttonLabel="Create"
                className="border w-full p-2 
                 rounded-xl text-white bg-cyan-400"
                loading={isloading}
                onClick={handleaccountCreattion}
              />
            </div>
          </div>
        </BackgroundDialogue>
      </div>
    </div>
  );
};
