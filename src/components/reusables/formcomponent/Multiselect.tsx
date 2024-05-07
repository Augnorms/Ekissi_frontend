import { useEffect, useLayoutEffect, useState } from "react";
import { Inputs } from "./Inputs";

interface Props {
  data: { id: number | string; label: string }[] | undefined;
  onSelect?: (
    selectedOptions: { id: number | string; label: string }[],
  ) => void;
  placeholder?: string;
  style?: string;
  dropdownstyle?: string;
  clear?: boolean;
  required?: boolean;
  label?: string;
  updateOptions?:
    | { id: number | string; label: string }[]
    | { id: number; name: string }[]; //handle updates
}

export const Multiselect = (prop: Props) => {
  let {
    data,
    onSelect,
    clear,
    placeholder,
    dropdownstyle,
    style,
    required,
    label,
  } = prop;

  const [openClose, setOpenClose] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<
    { id: number | string; label: string }[]
  >([]);

  //use to handle close or open on the arrow
  const handleOpenClose = () => {
    setOpenClose(!openClose);
    setSelectedOptions([]);
  };

  const handleCheckboxChange = (option: {
    id: number | string;
    label: string;
  }) => {
    const isSelected = selectedOptions.some(
      (selected) => selected.id === option.id,
    );

    if (isSelected) {
      // If the option is already selected, remove it from the list
      const updatedOptions = selectedOptions.filter(
        (selected) => selected.id !== option.id,
      );
      setSelectedOptions(updatedOptions);
    } else {
      // If the option is not selected, add it to the list
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    // Call the onSelect callback with the updated selected options
    if (onSelect) {
      onSelect(selectedOptions);
    }
  }, [selectedOptions]);

  //handle clear
  useEffect(() => {
    if (clear === true) {
      setSelectedOptions([]);
      setOpenClose(!openClose);
    }
  }, [clear]);

  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    if (id === "search") {
      setSearch(value);
    }
  };

  const [filteredData, setFilteredData] = useState<
    { id: number | string; label: string }[]
  | undefined>([]);

  useEffect(() => {
    const filtered = data?.filter((name) => {
      const firstPart = name.label.toLowerCase().slice(0, search.length);
      return firstPart === search.toLowerCase();
    });
    
    setFilteredData(filtered);
  }, [search, data]);

  //this part is to handle updates
useLayoutEffect(() => {
  if (prop.updateOptions?.length && prop.updateOptions?.length > 0) {
    setSelectedOptions(
      prop.updateOptions
        ? prop.updateOptions.map((option) => {
            if ("label" in option) {
              return { id: option.id, label: option.label };
            } else {
              return { id: option.id, label: option.name };
            }
          })
        : [],
    );
    setOpenClose(true);
  }
}, [prop.updateOptions]);

  return (
    <>
      <div className="flex justify-between mb-1">
        <label className="font-bold">{label}</label>

        {required && <label className="text-red-400">Required</label>}
      </div>
      <div className={`w-full border p-1 rounded-md flex gap-2 ${style}`}>
        <div className="w-[90%] pl-2 p-1" onClick={handleOpenClose}>
          {selectedOptions.length > 0 ? (
            selectedOptions.map((selectedOption) => (
              <span
                key={selectedOption.id}
                className="mr-2 bg-slate-100 rounded-md p-1"
              >
                {selectedOption.label}
              </span>
            ))
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <div className="w-[10%]  flex justify-center items-center">
          {!openClose ? (
            <img
              src="/images/arrow-down.svg"
              alt="arrow-down"
              onClick={handleOpenClose}
              className="cursor-pointer"
            />
          ) : (
            <img
              src="/images/arrow-up.svg"
              alt="arrow-up"
              onClick={handleOpenClose}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      <div>
        {openClose && (
          <Inputs
            type="text"
            style="w-full 
              border-2
              border-cyan-300
              h-8 rounded
              text-gray-500 
              outline-cyan-300
              p-2
              placeholder:text-sm
              text-center
              "
            id="search"
            placeholder="search for members here"
            value={search}
            onChange={handleSearch}
          />
        )}
      </div>
      {openClose && (
        <div
          className={`mt-1 border h-[200px] overflow-auto p-3 rounded bg-white ${dropdownstyle}`}
        >
          {filteredData && filteredData.length > 0
            ? filteredData.map((option) => (
                <div
                  key={option.id}
                  className={`w-full flex gap-2 p-2 hover:bg-cyan-100 rounded cursor-pointer ${dropdownstyle}`}
                  onClick={() => handleCheckboxChange(option)}
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.some(
                      (selected) => selected.id === option.id,
                    )}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  {option.label}
                </div>
              ))
            : // Render original data if no filtered data is available
              data &&
              data.map((option) => (
                <div
                  key={option.id}
                  className={`w-full flex gap-2 p-2 hover:bg-cyan-100 rounded cursor-pointer ${dropdownstyle}`}
                  onClick={() => handleCheckboxChange(option)}
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.some(
                      (selected) => selected.id === option.id,
                    )}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  {option.label}
                </div>
              ))}
        </div>
      )}
    </>
  );
};
