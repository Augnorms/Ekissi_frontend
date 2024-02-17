interface Props {
  avatarArray?: { logo: string; initials: string }[];
  width?: string;
  height?: string;
  sliceFirstIdx?: number;
  sliceSecondIdx?: number;
}

export const AvatarList = ({
  avatarArray,
  width = "10",
  height = "10",
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
            ring-1 
            hover:ml-0 transition-transform delay-700 duration-300 ease-in-out 
            ${_idx > 0 ? "-ml-3" : ""}
            cursor-pointer
          `}
          key={_idx}
        >
          <div
            className={`rounded-full flex justify-center items-center shadow-lg bg-white`}
            key={_idx}
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
          >
            {data.logo && data.logo !== "" ? (
              <img
                src={data.logo}
                className={`rounded-full`}
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                }}
                alt="User Avatar List"
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
