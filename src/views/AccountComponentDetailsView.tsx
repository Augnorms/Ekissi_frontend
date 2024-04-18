import { useJwt } from "react-jwt";
import { DecodedToken } from "../Interfaces/usersInterface";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { SearchComp } from "../components/reusables/formcomponent/SearchComp";
import { useState } from "react";


export const AccountComponentDetailsView = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  
  //decode token for users information
  const token = localStorage.getItem("token") ?? "";
  const { decodedToken } = useJwt(token) as {
    decodedToken: DecodedToken | null;
  };

   const handlesearch = (e: React.ChangeEvent<HTMLInputElement>) => {
     const value = e.currentTarget.value;
     setSearchVal(value);
   };

  return (
    <div className="w-full">
      <HeaderComponent
        logo="/images/Ekissi2.PNG"
        label="Ekissi Family Leanage"
        loginoutlabel={true}
        username={decodedToken?.fullname}
        homeicon
        loginUserimage={decodedToken?.image}
      />

      <div className="w-full h-[90vh] p-2 b-slate-300">
        <div className="w-full h-[100%] shadow-lg rounded-md border border-cyan-200 overflow-auto">
          <div className="w-full p-2 flex justify-center mb-2">
            <div className="w-[50%] shadow-xl rounded">
              <SearchComp
                placeholder="Enter your search here"
                classStyle="ring-2 ring-cyan-500 p-2 rounded-xl border"
                handlesearch={handlesearch}
                value={searchVal}
              />
            </div>
          </div>

          

        </div>
      </div>
    </div>
  );
}
