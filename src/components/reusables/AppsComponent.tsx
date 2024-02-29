interface Props {
  selectedApp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  show?: boolean;
}

export const AppsComponent = (props: Props) => {
  const { selectedApp } = props;
  return (
    <div
      className="
     w-[20%] h-[200px] 
     rounded-md p-2 shadow-lg 
     fixed top-20 right-28 z-10
     bg-white grid grid-cols-4 
     grid-rows-3 gap-1 overflow-auto
     "
      style={{
        position: "fixed",
        right: props.show ? "112px" : "-510px",
        transition: "right 0.3s ease",
      }}
    >
      <div
        className="w-full border cursor-pointer"
        id="app1"
        onClick={selectedApp}
      ></div>
    </div>
  );
};
