import { Avatar } from "../reusables/Avatar";
import { AvatarList } from "../reusables/AvatarList";

interface Props {
  logo?: string;
  arrayofmediaicons?: { logo: string; initials: string }[];
}

export const FooterComponent = (prop: Props,) => {
  const { logo, arrayofmediaicons } = prop;
  return (
    <div className="w-full p-2 bg-zinc-100 sm: lg:h-[200px]">
      <div className="max-sm:flex-wrap sm:flex-wrap lg:flex">
        <div className="flex justify-center items-center lg:w-[30%] h-[160px]">
          <Avatar logo={logo} />
          <p className="ml-3">Ekissi Leanage</p>
        </div>

        <div className="flex justify-center items-center w-full lg:w-[20%] h-[160px] ">
          <div className="w-full p-2 text-center">
            <p className="font-bold">Contacts</p>
            <p className="p-1">+233 54 0675 590</p>
            <p className="p-1">+233 24 465 0182</p>
            <p className="p-1">+372 5550 9768</p>
          </div>
        </div>

        <div className="flex justify-center items-center lg:w-[20%] h-[160px] ">
          <div>
            <p className="font-bold mb-2">Social Media</p>
            <AvatarList
              avatarArray={arrayofmediaicons}
              width="40"
              height="40"
            />
          </div>
        </div>

        <div className="flex justify-center items-center lg:w-[30%] h-[160px]">
          <p className="mr-3">Ekissi Leanage</p>
          <Avatar logo={logo} />
        </div>
      </div>

      <div className="w-full text-center border-t-2 p-1">
        <p>
          Copyright @ 2024
          <span className="text-emerald-300"> Augustine Normanyo. </span>
          all right reserved
        </p>
      </div>
    </div>
  );
};
