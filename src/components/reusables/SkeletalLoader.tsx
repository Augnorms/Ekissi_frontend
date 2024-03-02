import { Avatar } from './Avatar';

export const SkeletalLoader = () => {
  return (
    <>
      <div className="w-full border rounded-md shadow-md grid grid-cols-2 grid-rows-2 animate-pulse">
        <div className="w-full flex justify-center p-2">
          <Avatar width="100" height="100" classStyle="bg-slate-300" />
        </div>
        <div className="w-full p-2 mt-3">
          <div className="w-full p-2 text-md font-bold bg-slate-300 mb-4 rounded-full">
            {/* {"Augustine Normanyo".slice(0, 16) + "..."} */}
          </div>
          <div className="w-full p-2 text-sm bg-slate-300 mb-4 rounded-full">
            {/* {"augustine@gmail.com".slice(0, 20) + "..."} */}
          </div>
          <div className="w-full p-2 text-sm bg-slate-300 mb-4 rounded-full"></div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div
            className="w-[60%] 
               text-center border 
               p-2 rounded cursor-pointer 
               bg-slate-300
               mb-4 rounded-full
               "
          ></div>
        </div>
        <div className="w-full flex justify-end items-end p-4 mb-4 rounded-full">
          <div className="w-[40px] p-1.5 rounded-full bg-slate-300"></div>
        </div>
      </div>
    </>
  );
}
