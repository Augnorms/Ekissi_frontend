interface Prop{
    logo?:string;
    label?:string;
    figure?:number;
}

export const AccountSummary = (props:Prop) => {
    const { logo, label, figure } = props;
  return (
    <div className="w-[300px] h-[100%] rounded-md shadow-lg border flex">
      <div className="w-[20%] flex justify-center items-center">
        <img src={logo} alt={logo} />
      </div>
      <div className="w-[80%]">
        <div className="w-full text-end pr-2 text-sm mt-1">{label}</div>
        <div className="w-full text-center font-bold mt-1">{figure}.00</div>
      </div>
    </div>
  );
}
