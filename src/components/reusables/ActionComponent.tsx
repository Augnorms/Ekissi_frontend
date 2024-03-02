import React from "react";

interface DropdownProps {
  dropdownItems: Array<{
    id: number | string;
    image: string;
    label: string;
    dataCy: string;
  }>;
  emitAction: (id: number | string, label: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ dropdownItems, emitAction }) => {
  return (
    <div className="dropdown-content p-2">
      <p className="p-4 P100 N600 text-center">ACTIONS</p>

      {dropdownItems.map((item, index) => (
        <a
          href="javascript:void(0);"
          className="flex p-[10px] text-center rounded"
          key={index}
          data-cy={item.dataCy}
          onClick={() => emitAction(item.id, item.label)}
        >
          <img src={item.image} alt={item.image}/>
          <p className="w-full">{item.label}</p>
        </a>
      ))}
    </div>
  );
};

export default Dropdown;