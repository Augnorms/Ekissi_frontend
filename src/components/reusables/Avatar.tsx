
interface AvatarProps {
  logo?: string;
  initials?: string;
  handlechange?:()=>void;
}

export const Avatar = (props: AvatarProps) => {
  return (
    <div className="w-14 h-14 rounded-full flex justify-center items-center shadow-lg">
      {props.logo && props.logo !== 'null' ? (
        <img
          src={props.logo}
          className="w-10 h-10 rounded-full"
          alt="User Avatar"
          onClick={props.handlechange}
        />
      ) : (
        <span className="text-xl font-bold">{props.initials}</span>
      )}
    </div>
  );
};
