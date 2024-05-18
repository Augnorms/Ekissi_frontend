import { CircularProgressBar } from "../reusables/CircularProgressBar";

interface Props {
  allmemcount: number;
  allmalecount: number;
  allfemalecount: number;
  selectedApp?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const DashboardComponent = (props: Props) => {
  const { allmemcount, allmalecount, allfemalecount, selectedApp } = props;

  return (
    <div className="w-full h-[100%] grid grid-cols-4 grid-rows-2 gap-1">
      <div className="shadow-xl rounded-lg">
        <div className="w-full p-2 font-bold">Family members</div>
        <div className="w-full flex justify-center">
          <CircularProgressBar
            rotate={String(allmemcount)}
            size="large"
            color="deeppink"
          />
          <CircularProgressBar
            rotate={String(allmemcount)}
            size="small"
            color="dodgerblue"
          />
          <CircularProgressBar
            rotate={String(allmemcount)}
            size="extrasmall"
            color="white"
          />
        </div>
      </div>

      <div className="shadow-xl rounded-lg">
        <div className="w-full p-2 font-bold">Male members</div>
        <div className="w-full flex justify-center">
          <CircularProgressBar
            rotate={String(allmalecount)}
            size="large"
            color="deeppink"
          />
          <CircularProgressBar
            rotate={String(allmalecount)}
            size="small"
            color="dodgerblue"
          />
          <CircularProgressBar
            rotate={String(allmalecount)}
            size="extrasmall"
            color="white"
          />
        </div>
      </div>

      <div className="shadow-xl rounded-lg">
        <div className="w-full p-2 font-bold">Female members</div>
        <div className="w-full flex justify-center">
          <CircularProgressBar
            rotate={String(allfemalecount)}
            size="large"
            color="deeppink"
          />
          <CircularProgressBar
            rotate={String(allfemalecount)}
            size="small"
            color="dodgerblue"
          />
          <CircularProgressBar
            rotate={String(allfemalecount)}
            size="extrasmall"
            color="white"
          />
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

      <div className="col-span-1 shadow-xl rounded-lg p-4 grid grid-cols-2 gap-2">
        {Array.from({ length: 3 }, (_, idx) => (
          <div
            key={idx} // Adding a key is important for React
            id={
              idx == 0
                ? "heirarchy"
                : idx == 1
                  ? "Members"
                  : idx == 2
                    ? "Accounts"
                    :  ""
            }
            className="w-full h-[150px] shadow-md rounded cursor-pointer item-center p-2 hover:bg-cyan-200 hover:text-white"
            onClick={selectedApp}
          >
            <img
              id={
                idx == 0
                  ? "heirarchy"
                  : idx == 1
                    ? "Members"
                    : idx == 2
                      ? "Accounts"
                      :  ""
              }
              src={
                idx == 0
                  ? "/images/heirarchy.svg"
                  : idx == 1
                    ? "/images/group.svg"
                    : idx == 2
                      ? "/images/Accounts.svg"
                      :  ""
              }
              alt="Members-icon"
            />
            <p className="text-xs">
              {idx == 0
                ? "Heirarchy"
                : idx == 1
                  ? "Members"
                  : idx == 2
                    ? "Accounts"
                    :  ""}
            </p>
          </div>
        ))}
      </div>

      <div className="col-span-3 shadow-xl rounded-lg p-4 grid grid-cols-5 gap-1 overflow-auto">
        {Array.from({ length: 10 }, (_idx) => (
          <div className="w-full h-[150px] shadow-md rounded animate-pulse bg-[white] bg-slate-200"></div>
        ))}
      </div>
    </div>
  );
};
