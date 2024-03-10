import { useEffect, useState } from "react";

interface Props {
  data: { id: number | string; label: string }[];
  onSelect?: (
    selectedOptions: { id: number | string; label: string }[],
  ) => void;
  placeholder?: string;
  style?: string;
  dropdownstyle?:string;
  clear?:boolean;
  required?:boolean;
  label?:string;
}

export const Multiselect = (prop: Props) => {
  const { data, onSelect, clear, placeholder, dropdownstyle, style, required, label } =
    prop;

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
useEffect(()=>{
    if (clear === true) {
    setSelectedOptions([]);
    setOpenClose(!openClose);
    }
},[clear])

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
      {openClose && (
        <div
          className={`mt-1 border h-[200px] overflow-auto p-3 rounded bg-white ${dropdownstyle}`}
        >
          {data.map((option) => (
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
