import { CircularProgressBar } from "../reusables/CircularProgressBar";


export const DashboardComponent = () => {


  return (
    <div className="w-full h-[100%] grid grid-cols-4 grid-rows-1 gap-1">
      <div className="shadow-xl rounded-lg">
        <div className="w-full p-2 font-bold">Family members</div>
        <div className="w-full flex justify-center">
          <CircularProgressBar rotate="10" size="large" color="deeppink" />
          <CircularProgressBar rotate="10" size="small" color="dodgerblue" />
          <CircularProgressBar rotate="10" size="extrasmall" color="white" />
        </div>

      </div>

      <div className="shadow-xl rounded-lg">
        <div className="w-full p-2 font-bold">Male members</div>
        <div className="w-full flex justify-center">
          <CircularProgressBar rotate="20" size="large" color="deeppink" />
          <CircularProgressBar rotate="20" size="small" color="dodgerblue" />
          <CircularProgressBar rotate="20" size="extrasmall" color="white" />
        </div>
      </div>

      <div className="shadow-xl rounded-lg">
        <div className="w-full p-2 font-bold">Female members</div>
        <div className="w-full flex justify-center">
          <CircularProgressBar rotate="30" size="large" color="deeppink" />
          <CircularProgressBar rotate="30" size="small" color="dodgerblue" />
          <CircularProgressBar rotate="30" size="extrasmall" color="white" />
        </div>
      </div>

      <div className="shadow-xl rounded-lg">
        <div className="w-full p-2 font-bold">Deceased members</div>
        <div className="w-full flex justify-center">
          <CircularProgressBar rotate="40" size="large" color="deeppink" />
          <CircularProgressBar rotate="40" size="small" color="dodgerblue" />
          <CircularProgressBar rotate="40" size="extrasmall" color="white" />
        </div>
      </div>

      {/* <div className="col-span-2 shadow-xl rounded-lg pt-10">
   
      </div>
      <div className="col-span-2 shadow-xl rounded-lg"></div> */}
    </div>
  );
};
