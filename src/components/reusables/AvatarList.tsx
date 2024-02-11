interface Props {
  avatarArray?: { logo: string; initials: string }[];
  width?: string;
  height?: string;
  sliceFirstIdx?: number;
  sliceSecondIdx?: number;
}

export const AvatarList = ({
  avatarArray,
  width = "14",
  height = "14",
  sliceFirstIdx = 0,
  sliceSecondIdx = avatarArray?.length || 0,
}: Props) => {
  return (
    <div className="flex">
      {avatarArray?.slice(sliceFirstIdx, sliceSecondIdx)?.map((data, _idx) => (
        <div
          className={`
            items-center 
            text-center 
            rounded-full 
            ring-2 ring-gray-300 
            hover:ml-0 transition-transform delay-500 
            ${_idx > 0 ? "-ml-5" : ""}
            cursor-pointer
          `}
          key={_idx}
        >
          <div
            className={`w-${width} h-${height} rounded-full flex justify-center items-center shadow-lg bg-white`}
            key={_idx}
          >
            {data.logo && data.logo !== "" ? (
              <img
                src={data.logo}
                className={`w-${width} h-${height} rounded-full`}
                alt="User Avatar"
              />
            ) : (
              <span className="text-xl font-bold">{data.initials}</span>
            )}
          </div>
        </div>
      ))}

      {avatarArray && sliceSecondIdx < avatarArray.length && (
        <div
          className={`w-${width} h-${height} rounded-full flex justify-center items-center shadow-lg bg-slate-200`}
        >
          +{avatarArray.length - sliceSecondIdx}
        </div>
      )}
    </div>
  );
};

/*
usage:
<AvatarList
        avatarArray={images}
        width="10"
        height="10"
        sliceFirstIdx={0}
        sliceSecondIdx={3}
      />

*/
