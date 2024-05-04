import { CircularProgressBar } from "../reusables/CircularProgressBar";

interface Props{
  allmemcount:number;
  allmalecount:number;
  allfemalecount:number;
}

export const DashboardComponent = (props:Props) => {
  const { allmemcount, allmalecount, allfemalecount } = props;

  return (
    <div className="w-full h-[100%] grid grid-cols-4 grid-rows-1 gap-1">
      <div className="shadow-xl rounded-lg">
        <div className="w-full p-2 font-bold">Family members</div>
        <div className="w-full flex justify-center">
          <CircularProgressBar
            rotate={String(allmemcount)}
            size="large"
            color="deeppink"
          />
          <CircularProgressBar rotate={String(allmemcount)} size="small" color="dodgerblue" />
          <CircularProgressBar rotate={String(allmemcount)} size="extrasmall" color="white" />
        </div>
      </div>

      <div className="shadow-xl rounded-lg">
        <div className="w-full p-2 font-bold">Male members</div>
        <div className="w-full flex justify-center">
          <CircularProgressBar rotate={String(allmalecount)} size="large" color="deeppink" />
          <CircularProgressBar rotate={String(allmalecount)} size="small" color="dodgerblue" />
          <CircularProgressBar rotate={String(allmalecount)} size="extrasmall" color="white" />
        </div>
      </div>

      <div className="shadow-xl rounded-lg">
        <div className="w-full p-2 font-bold">Female members</div>
        <div className="w-full flex justify-center">
          <CircularProgressBar rotate={String(allfemalecount)} size="large" color="deeppink" />
          <CircularProgressBar rotate={String(allfemalecount)} size="small" color="dodgerblue" />
          <CircularProgressBar rotate={String(allfemalecount)} size="extrasmall" color="white" />
        </div>
      </div>

      <div className="shadow-xl rounded-lg">
        <div className="w-full p-2 font-bold">Deceased members</div>
        <div className="w-full flex justify-center">
          <CircularProgressBar rotate="0" size="large" color="deeppink" />
          <CircularProgressBar rotate="0" size="small" color="dodgerblue" />
          <CircularProgressBar rotate="0" size="extrasmall" color="white" />
        </div>
      </div>

      {/* <div className="col-span-2 shadow-xl rounded-lg pt-10">
   
      </div>
      <div className="col-span-2 shadow-xl rounded-lg"></div> */}
    </div>
  );
};
