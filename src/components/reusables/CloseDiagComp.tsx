interface Props{
  styles?:string;
  onClick?:()=>void
}

export const CloseDiagComp = (props:Props) => {
  const { styles, onClick } = props;

  return (
    <div className={`p-2 mb-3 cursor-pointer ${styles}`}>
      <img src="/images/closeicon.svg" alt="close" onClick={onClick} />
    </div>
  );
}
