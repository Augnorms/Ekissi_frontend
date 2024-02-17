interface Props {
  imgIdx?: number;
  handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const CarouselComp = (props:Props) => {
     const {imgIdx, handleClick} = props
  return (
    <div className="w-full flex justify-center gap-2">
      <div
        className="w-[100px] border p-2 rounded-tl-[8rem] rounded-br-[8rem] cursor-pointer"
        id={"0"}
        onClick={handleClick}
        style={{
          backgroundColor: imgIdx == 0 ? "#008000" : "",
        }}
      ></div>
      <div
        className="w-[100px] border p-2 rounded-tl-[8rem] rounded-br-[8rem] cursor-pointer"
        id={"1"}
        onClick={handleClick}
        style={{
          backgroundColor: imgIdx == 1 ? "#008000" : "",
        }}
      ></div>
      <div
        className="w-[100px] border p-2 rounded-tl-[8rem] rounded-br-[8rem] cursor-pointer"
        id={"2"}
        onClick={handleClick}
        style={{
          backgroundColor: imgIdx == 2 ? "#008000" : "",
        }}
      ></div>
      <div
        className="w-[100px] border p-2 rounded-tl-[8rem] rounded-br-[8rem] cursor-pointer"
        id={"3"}
        onClick={handleClick}
        style={{
          backgroundColor: imgIdx == 3 ? "#008000" : "",
        }}
      ></div>
      <div
        className="w-[100px] border p-2 rounded-tl-[8rem] rounded-br-[8rem] cursor-pointer"
        id={"4"}
        onClick={handleClick}
        style={{
          backgroundColor: imgIdx == 4 ? "#008000" : "",
        }}
      ></div>
    </div>
  );
};
