interface Props {
  logStatus?: boolean;
  handleChangeLogout?: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleChangeDigital?: (e: React.MouseEvent<HTMLDivElement>) => void;
  loggedUserId?: string;
  show?: boolean;
  onMouseclick?: () => void;
}

export const LogoutDialogue = (props: Props) => {
    
  return (
    <div
      className="
              w-[15rem] mt-3 p-2 text-center 
              shadow-md 
              cursor-pointer
              fixed 
              top-20
              z-10
            "
      style={{
        position: "fixed",
        right: props.show ? "0" : "-310px",
        transition: "right 0.3s ease",
      }}
      onClick={props.onMouseclick}
    >
      <div
        className="p-2 mb-2 hover:bg-cyan-300 hover:text-white"
        id={props.logStatus ? "logout" : "login"}
        onClick={props.handleChangeLogout}
      >
        {props.logStatus ? "Logout" : "Login"}
      </div>

      <div
        id={props.loggedUserId}
        onClick={props.handleChangeDigital}
        className="p-2 hover:bg-cyan-300 hover:text-white"
      >
        {"Digital Profile"}
      </div>
    </div>
  );
};
