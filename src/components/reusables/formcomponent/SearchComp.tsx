interface Props {
  value?: string;
  handlesearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classStyle?: string;
}

export const SearchComp = (props: Props) => {
  const { value, handlesearch, classStyle } = props;
  return (
    <div className="w-full">
      <div className={`flex ${classStyle}`}>
        <img src="/images/searchIcon.svg" alt="search-icon" />
        <input
          type="text"
          className="ml-5 w-full border-l-2 pl-2 outline-none"
          value={value}
          onChange={handlesearch}
        />
      </div>
    </div>
  );
};
